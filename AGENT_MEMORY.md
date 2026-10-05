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

## 2026-10-05 — Conversion audit + rebuild plan

- Owner reports the site isn't converting. Audit + phased rebuild plan written to
  `docs/REBUILD_PLAN.md`. Owner's directives: drop the landing "wall" for a one-page homepage with
  a portfolio grid; remove Behind the Scenes, the blog, and all basketball imagery; make dogs a
  flagship; rewrite Creative Services.
- **Pitfall:** all 12 `public/assets/sports/` images are NJ Cyclones basketball, so removing
  basketball removes the entire Sports section (hero slide, `/photo` tile, sitemap, copy).
- **Pitfall:** removed URLs (`/photo/sports`, `/photo/behind-the-scenes`, `/blog`, `/blog/*`) are
  indexed and in the sitemap — they need 301s, not 404s.
- **Finding:** no analytics are installed (`NEXT_PUBLIC_GA_ID` unset); the Cloudflare Web Analytics
  beacon is blocked by our CSP on every page. Conversion cannot currently be measured.
- **Finding:** speed is not the problem (TTFB 70-390 ms; hero images 57-310 KB desktop).
- A hidden Browser pane pauses rAF, so framer-motion hero content stays at opacity 0 in screenshots
  taken then — an artifact of the pane, not a site bug.
- Maintenance mode was still ON on 2026-10-05 (since 2026-10-03). Recommend turning it off during a
  local rebuild and gating only the final cutover.

## 2026-10-05 (later) — Maintenance OFF + Phase 1 removals (local, NOT deployed)

- **Maintenance mode turned OFF** on the server (`sudo rm -f /var/www/maintenance/.enabled`) at the
  owner's request. Verified with no cookie: every page 200, homepage `index, follow`,
  `cf-cache-status: DYNAMIC` (Cloudflare not caching the maintenance page), sitemap + robots normal.
  SSH worked from the current IP. Plan: rebuild locally; re-enable maintenance only briefly at cutover.
- **Owner decisions:** Sports removed entirely for now ("bringing it back soon"); Pets renamed
  to **Dogs**; wants Google-review testimonials; will use his Instagram profile photo for About;
  has plenty of dog photos but few with owners (a dog-owner shoot is booked for November 2026);
  struggling to name starting prices.
- **Phase 1 done locally** (`npm run build` passes, 13 routes): sports, behind-the-scenes, blog
  pages/images/content/`src/lib/blog.ts` moved to gitignored `archive/removed-2026-10-05/`
  (`archive` also excluded in `tsconfig.json` — otherwise tsc type-checks the parked pages).
  `public/assets/pets` -> `public/assets/dogs`, `src/app/photo/pets` -> `dogs`.
  `next.config.ts` now has permanent redirects (Next emits **308**, which Google treats like 301):
  `/photo/pets`->`/photo/dogs`, `/assets/pets/*`->`/assets/dogs/*`, `/photo/sports` and
  `/photo/behind-the-scenes`->`/photo`, `/blog` and `/blog/*`->`/`. Unsplash removed from
  `remotePatterns` and the CSP `img-src`. Sitemap, footer, homepage hero (4 slides), `/photo`
  (4 tiles, lg:grid-cols-4) and site metadata/keywords updated (no athletes/sports/web design).
- **Pitfall:** after deleting routes, `npm run build` fails type-check on stale
  `.next/dev/types/validator.ts`; `rm -rf .next` fixes it (cache, not code).
- **Pitfall:** a long multi-line bash heredoc containing quotes/backticks failed to parse in this
  harness and wrote nothing; use the Write tool (or a node script) for file content.
- Remaining dog copy still says generic things; full Dogs rewrite is Phase 3. `marked` and
  `gray-matter` deps are now unused until the blog returns.
