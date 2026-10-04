# Agent Memory — Davidsons Lens

Durable operational context. Append dated entries; do not rewrite history.

---

## 2026-10-02 — Infrastructure facts (validated)

- **Production**: single EC2 box `18.221.113.72` (us-east-2 / Ohio), Ubuntu, 1 vCPU / 1 GB RAM
  + 2 GB swap. Next.js runs under PM2 as `davidsons-lens` on :3000; nginx reverse-proxies
  :80/:443. Cloudflare sits in front (DNS + proxy). Let's Encrypt cert via certbot.
- **Deploy path**: local build/commit → push to GitHub → SSH to box → `git pull` → `npm run build`
  → `pm2 restart davidsons-lens`. SSH key: `C:\Users\james\Documents\Claude\TestWeb.pem`.
- **Recurring pitfall — SSH lockout**: the EC2 security group `sg-0d98684bae3908d62`
  (`launch-wizard-1`) pins inbound SSH (rule `sgr-0de58ca5582856ba3`) to a single `/32`.
  The user's home IP is dynamic and has rotated at least 4 times (108.35.211.146 →
  99.63.69.191 → 99.94.137.161 → 173.54.188.27), silently breaking SSH each time while the
  website stays up. **Always check SSH reachability before planning a deploy.** Ports 80/443
  are `0.0.0.0/0` and unaffected. Claude Code runs on the user's machine, so "my" egress IP
  and the user's IP are the same address.
- **SSH posture**: key-only — `passwordauthentication no`, `permitrootlogin prohibit-password`.
  Brute force is not a viable threat, which is why widening the SSH CIDR is a defensible
  option if the lockouts keep costing time.
- **nginx gotcha**: dropping a file into `/etc/nginx/conf.d/` broke `nginx -t` on this box
  (a bare `server_tokens off;` there failed validation). Put directives in the site config
  under `sites-available/` instead. Cloudflare already masks the origin `Server` header.
- **Image pipeline**: WebP only — **never re-enable AVIF**; AVIF encoding on 1 vCPU caused a
  real slow-loading incident. `scripts/optimize-images.mjs` handles resize/compress/EXIF and
  backs originals up to the gitignored `public/assets/_originals/`.
- **Secrets**: `RESEND_API_KEY` / `CONTACT_EMAIL` live only in `/home/ubuntu/davidsons-lens/.env.local`
  on the box (chmod 600, gitignored). Nothing sensitive is tracked in git.

## 2026-10-02 — Maintenance mode added

- Added static, nginx-served maintenance mode so it survives the Next app being stopped or
  rebuilt (the exact window it's needed). Returns **503 + Retry-After** so Google treats the
  outage as temporary rather than deindexing the freshly-ranked site.
- Files: `deploy/maintenance/maintenance.html`, `deploy/nginx/davidsons-lens.conf.template`
  (placeholder `__PREVIEW_SECRET__`), `deploy/maintenance-mode.sh`.
- Toggle: `sudo touch /var/www/maintenance/.enabled` (on) / `rm -f` (off). Checked per request,
  so **no nginx reload needed**.
- Preview bypass: `/preview-access?key=<secret>` sets a 7-day cookie so the owner can view the
  real site while the public sees maintenance. The real secret lives in the gitignored
  `deploy/nginx/.preview-secret`; the generated config is also gitignored.

## 2026-10-03 — Maintenance page redesign

- Rewrote the maintenance page: full-bleed Gail water portrait background
  (`water-portrait-bernardsville-nj.jpg`, object-position `center 35%` — the crop already
  validated for the homepage hero), flat black scrim at 15%, content centered on top,
  Instagram / YouTube / email buttons (52px tap targets), tightened type scale and rhythm.
- Pinterest deliberately omitted: its URL was never confirmed (still a placeholder in
  `SocialLinks.tsx`). Do not ship a Pinterest link until the real handle is supplied.
- **Pitfall solved**: during maintenance `location /` returns 503, which would also gate the
  background photo. Added an ungated exact-prefix `location ^~ /maintenance-assets/`
  (alias `/var/www/maintenance/assets/`) in BOTH server blocks so the image still loads.
- **Open legibility tradeoff**: at the requested 15% the scrim barely darkens the photo.
  Text relies on a `text-shadow` to stay readable, and on mobile the crop centers on the
  subject's brightly-lit face, which is the weakest-contrast case. Raising the scrim to
  ~35-45% would fix it; left at 15% pending the owner's call.
