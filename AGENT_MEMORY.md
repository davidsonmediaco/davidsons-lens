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

## 2026-10-05 (deploy) — Phase 1 live

- Deployed commit 9ced1a4 to production (pull, build, `pm2 restart davidsons-lens`). Verified: all pages 200, old URLs 308 to the right targets, sitemap has 9 URLs, CSP img-src no longer lists Unsplash, dogs images serve through the optimizer.
- **Pitfall:** do NOT `rm -rf .next` on the server before `npm run build` — PM2 serves from `.next`, so the site is down for the whole build (about a minute or two on the 1-core box). Build in place and restart afterwards; the build replaces `.next` itself. The stale-types error seen locally only mattered after deleting routes in dev.

## 2026-10-05 (inputs) — Pricing + bio direction from owner

- **Pricing decided:** Portraits and dogs "From $250"; Video "From $750" (last project was $550); consulting stays $150 / $50. Small business is deliberately NOT priced publicly (owner gets higher numbers after talking in person; internally one-time from $500, retainers from $1,000). Business CTA = free intro call, not a price.
- Portraits are moving from unlimited deliverables to defined limits; the limits (session length, image count, locations, turnaround, travel radius, add-ons) are still to be supplied by the owner before the Services copy is written.
- Typical effort per the owner: shoot plus travel 3-5 hours, editing 1-5 hours.
- **Bio facts (owner-supplied, draft pending approval):** started shooting as a kid in New York; moved to NJ; first subject was his dog Charlie; practiced on best friend Gail, whose confidence in front of the camera led others to say the same; core promise is removing the intimidation of being on camera so people leave confident; business goal is following the owner and story behind a brand (no such client yet, so do not claim it as done); consulting covers posting consistency, content pillars, captions, hashtags, hooks, plus the psychology of following through. Nothing is published until the owner approves the wording.

## 2026-10-05 (scope limits) — Offer definitions from owner

- **Portraits/dogs, from $250:** 45-minute session, 1 location, 15 edited images, 3-5 day turnaround, travel free within 10 miles (beyond: quoted, wording is my default, unconfirmed). Add-ons deliberately not priced yet; copy says extra images/time "on request".
- **Video, from $750:** 2-hour shoot; 3-5 reels OR one long-form video cut into 3-5 reels; 3 revisions (assumed total per project, unconfirmed).
- Small business stays unpriced publicly; a free intro-call CTA was proposed but not yet confirmed.

## 2026-10-05 (Phase 2) — One-page homepage built locally, NOT deployed

- New homepage (`src/app/page.tsx`): hero (3-frame crossfade water/dog/music, headline "Photos that make you feel like yourself." — working copy, owner has not explicitly approved the headline), portfolio grid, Dogs feature, video band, pricing cards, short bio, contact band. `HomepageClient.tsx` deleted. New `/about` (long bio + owner-requested close-out + Contact button), added to sitemap and footer. Shared `src/lib/categories.ts` drives homepage grid and `/photo`. Header now shows on the homepage with a persistent **Book a Shoot** button (mobile: compact "Book"). `HeroGallery` gained an `overlayClassName` prop (hero uses a bottom gradient instead of a flat 55%).
- **Owner approved the bio** (including naming Charlie and Gail) and asked for a close-out on the long version: "Let me help you feel more confident on camera. Click the contact button and let us get to work." The homepage heading "Hi, I am James." is my wording, not yet confirmed.
- E:\Dogs holds exactly the 9 dog photos already on the site (byte-identical to `_originals/pets`); no new dog images yet. E:\Dog Portfolio has one extra (mountain-dog.jpg), unused.
- **Correction to the audit:** GA IS configured locally (`NEXT_PUBLIC_GA_ID` in `.env.local`), but the production build has no GA ID and the CSP `connect-src` blocked analytics.google.com / www.google.com / stats.g.doubleclick.net. CSP now allows those plus the Cloudflare Web Analytics beacon (script-src static.cloudflareinsights.com, connect-src cloudflareinsights.com). GA now loads in production builds only so local previews never hit the real property. To enable GA in production the ID must be added to the SERVER `.env.local` and the site rebuilt (NEXT_PUBLIC vars are inlined at build time).
- **Pitfall:** the Turbopack dev server cached a stale Tailwind scan, so a newly added class (`md:grid-cols-4`) was not generated until `rm -rf .next` and a restart. If a class appears in the DOM but has no effect in dev, clear `.next` before debugging the code.
- **Pitfall:** screenshots in the Browser pane can come back cropped/misscaled mid-session; trust DOM measurements (`scrollWidth`, `getBoundingClientRect`) over a single odd screenshot.

- **Mobile de-cluttering pass (owner said the mobile homepage felt too crowded):** tighter section padding (py-14 vs py-28), smaller hero headline/eyebrow, header logo shrunk so logo + Book + menu fit at 375px, tile descriptions hidden except on the Dogs tile, one Dogs CTA and 2 dog thumbnails on phones, video band text anchored to the bottom with a shorter button label, shorter small-business button label, no duplicate social row (contact band) and no footer About blurb on phones. Verified by DOM measurement (no horizontal overflow at 375px, header fits, eyebrow on one line) plus screenshots.

## 2026-10-29 — Homepage "Selected Work" portfolio (branch `homepage-selected-work`, NOT deployed)

- Owner brief: make the homepage scroll straight into a mixed portfolio (reference: dannyclinch.com),
  preserving the CURRENT LIVE hero. Live was still the Phase 1 splash; local `main` (b753bad, 2 commits
  ahead of origin, never deployed) held the Oct 5 one-page homepage. Built on a branch off `main` so
  both stay available. On this branch the homepage = live splash hero (restored `HomepageClient`) +
  `SelectedWork` + CTA + footer; the Oct 5 homepage sections (dogs band, pricing cards, short bio) are
  NOT on this homepage. `/about`, CSP analytics fixes, interior-page Book button from main remain.
- Reference findings (dannyclinch.com): black page, 3 equal masonry columns at ~1200px, ~15px gutters,
  natural aspect ratios, subjects and B&W/color interleaved, no captions/overlays; single full-width
  column on phones. We deliberately did NOT copy the masonry (unclear reading order): used justified
  rows of 1-3 photos (flex-grow = aspect ratio -> equal heights, no crop) for clear L-to-R order and
  varied scale.
- Data: `src/lib/selected-work.ts` (8 rows, 16 photos: 5 dogs, 4 portraits, 4 business, 3 music; the 4
  hero photos excluded). Width/height are stored per photo (sharp is not a direct dependency, so not
  read at build time).
- Hero: `min-h-[100svh]`, cue in normal flow (cannot overlap controls), `MotionConfig reducedMotion="user"`.
  `globals.css` smooth scroll now only under `prefers-reduced-motion: no-preference`. Header hidden on
  the homepage again (hero carries the nav).
- **Pitfall:** in a trio, `basis-full sm:basis-auto sm:[flex:var(--ar)_1_0%]` let `sm:basis-auto` win
  and the lead photo took its intrinsic width; never mix a `basis-*` variant with the flex shorthand at
  the same breakpoint.
- **Pitfall:** the local dev image optimizer queues first-time encodes; scrolling fast makes photos
  look "stuck" for 30s+. Not a file problem (live optimizer served the same files in 0.5-1.0s). After
  deploying, warm the cache for homepage photos (1-core server encodes on first request).
- Verified: tsc clean, build passes (18 routes), lint shows only 2 PRE-EXISTING findings (Navigation
  setState-in-effect error, unused Link in GallerySubPage) identical on main; CLS 0 at 375px; no
  horizontal overflow; cue scrolls exactly to the section; hero fits 375x812 and 375x667 with clear
  space above the cue; gallery/contact routes 200.
- Inaccurate existing gallery alt text noticed (not changed): studio-headshot (actually outdoors),
  live-band-performance (a B&W solo guitarist), barrister-coffee-roast-close-up (a roaster at work).

## 2026-10-29 (deploy) — Selected Work homepage live

- Fast-forwarded `main` to `homepage-selected-work` (88d62de) and deployed (pull, build in place, `pm2 restart`). This also shipped the previously undeployed Oct 5 commits: `/about`, footer About link, interior-page header Book button, Dogs-first `/photo` tiles, CSP allowances for GA + Cloudflare beacon (GA still inactive: no `NEXT_PUBLIC_GA_ID` on the server).
- Verified live: all pages 200, redirects 308, homepage has Selected Work + Explore the work, no horizontal overflow at 375px, hero = one viewport. Warmed the optimizer cache for all 20 homepage photos x widths 384/640/828/1080/1920 (100 variants, 0 failures, ~28s); repeat hit 0.09s.
- **Pitfall:** in Git Bash, passing `/assets/...` as an argument to node.exe gets MSYS path-converted to `C:/Program Files/Git/assets/...`, so a warm-up script built URLs that all 400d. Encode in the shell instead: `printf %s "$s" | sed "s#/#%2F#g"`.
- **Pitfall:** when the Browser pane is not on screen it stops rendering, so native `loading="lazy"` images are never requested (0 of 16 loaded) even though markup and a manual `new Image()` load were fine. Verify lazy images from the server side (curl) or with the pane visible.
