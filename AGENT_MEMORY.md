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

## 2026-10-29 (later) — Homepage positioning line, intro, single contact invitation (deployed 0ed9bac)

- Owner-supplied copy, used verbatim (do not reword without approval): hero positioning line under the
  wordmark; "The person behind the camera" intro after Selected Work; bottom invitation "Let’s talk about
  the details of your shoot." / "Click below and tell me what you have in mind." / button "Tell me about
  your shoot" -> /contact. The hero "Let's Work Together" button was removed; the homepage now has exactly
  one contact invitation (plus the nav/footer Contact links). Other pages' CTAs unchanged.
- No verified photo of James exists in the repo (no about/profile image; the Instagram profile photo is
  still owed). Intro is text-only by design; never assume a person in the portfolio is James.
- Hero copy legibility: existing `bg-black/55` overlay + soft text-shadow (no box). Measured with sharp
  over the paragraph's crop region of all 4 hero photos at 375x812 and 1440x900: even the single brightest
  pixel gives >= 4.6:1 for #F5F5F5 text; medians 9-18:1. No extra darkening needed.
- Fit: hero = one viewport at 375x812 (161px above the cue) and 375x667 (89px); at 320x568 it grows to
  612px via min-h (no clipping). No horizontal overflow. Button label fits on one line from 375px via
  `max-sm:px-6 max-sm:tracking-[0.15em]` (balanced wrap at 320).
- **Pitfall:** after `resize_window` in a hidden Browser pane, `getComputedStyle` can return stale media-query
  results (desktop showed the phone padding). Reload the page before measuring breakpoint-dependent styles.
- Checks: tsc clean, build 18/18, lint = same 2 pre-existing findings. Live: copy present, old wording 0,
  1 h1, order hero -> Selected Work -> intro -> invitation -> footer, cue scrolls to #selected-work (top 0),
  button lands on /contact, no console errors, all main routes 200.

## 2026-10-29 (night) — Homepage header + hero redesign (deployed 9cbc48d)

- Owner brief superseded the earlier "preserve the hero" requirement. Homepage now: `HomeHeader` (homepage-only;
  wordmark is the page H1; desktop text links; phone "Menu" disclosure with aria-expanded/controls, Escape ->
  focus back to button, outside click / tab-away closes) -> positioning line "Photography & film. Northern
  New Jersey." -> `HeroGallery` with no overlay and nothing on the photo -> Selected Work -> intro (now ends
  "Helping you feel comfortable on camera is a big part of that.") -> invitation -> footer.
  `HomepageClient.tsx` deleted. `Navigation` exports `navLinks` and still renders nothing on "/".
- Opening = `min-h-[76svh] md:min-h-[80svh]` flex column with the hero as `flex-1 min-h-[240px]` (grows on
  short screens instead of clipping). Measured: 76% at 320/375 phones, 80% tablet/desktop; first portfolio
  photo visible above the fold at 375x812 (83px), 768x1024 (97px), 1440x900 (72px); at 320x568 the
  Selected Work heading + links are visible but the photo starts 8px below.
- HeroGallery: overlay is now opt-in (`overlayClassName`, none by default); auto-rotation is skipped when
  `prefers-reduced-motion: reduce`.
- Hero focal points: water `center 30%`, music `30% 40%`, dog `75% 22%`, acai `center 40%`. Phones show
  only the middle ~45% of a landscape photo, so the HORIZONTAL value decides whether a face survives;
  desktop (~2.2:1) uses only the vertical value. The dog at `55%` cut an eye on phones.
- **Pitfall:** headless Chrome `--screenshot --window-size=375,...` does NOT give a 375px layout (min window
  width ~500), so narrow screenshots are wrong (Menu button pushed off-canvas). Use CDP
  `Emulation.setDeviceMetricsOverride` (scratch script driving Chrome over `--remote-debugging-port` with
  Node 22's built-in WebSocket) for real phone screenshots. Screenshots saved in `docs/screenshots/`.
- Checks: tsc clean, build 18/18, lint = same 2 pre-existing findings; no horizontal overflow at
  320/375/768/1440; live: 1 h1, old paragraph/cue/overlay gone, Instagram link only in footer, all 10 pages
  200 with interior headers intact, menu opens/closes/links (/video), 16 hero variants warmed.

## 2026-11-09 — Added Desktop `Portfolio` photos to the four galleries (local, NOT deployed or committed yet)

- Source: `C:\Users\james\Desktop\Portfolio\{Business,Dogs,Music,Portraits}` (28 JPGs; left untouched). portfolio-09 and portfolio-15 are the same frames as the existing `brindle-dog-portrait-nj` and `yellow-lab-relaxing-porch-nj`, so they were skipped; 26 added.
- Galleries now: dogs 16, portraits 16, music 15, business 16; new photos spread evenly through each `images` list. Homepage Selected Work unchanged.
- EXIF descriptions now come from `scripts/image-descriptions.json` (keyed by path under `public/assets`, ASCII only), falling back to the filename. Add new photos there so a `--force` re-run keeps real descriptions.
- **Pitfall (fixed):** the pets -> dogs rename left the gitignored backups in `_originals/pets`, so the optimizer saw all dog photos as new and would have re-compressed them. Renamed the backup folder to `_originals/dogs`. Any future section rename must move its `_originals` folder too.
- Location labels: the six Music studio photos and portfolio-02 / portfolio-30 have no `-nj` / "New Jersey", because their camera time zones don't match NJ and nothing in the images confirms the place. Owner to confirm.
- Breeds (French bulldog, doodle) are read from the photos, not confirmed by the owner. No people are named.
- Verified: 26/26 EXIF, no GPS, long edge <= 2400, 9.6 MB total; tsc clean, build 18/18, lint = same 2 pre-existing findings; all gallery images load with alt text, no overflow, no console errors (emulated Chrome, 1440 and 375).

## 2026-11-09 (later) — Owner confirmed shoot details for the new photos (still NOT deployed or committed)

- Supersedes the location note above: the boxing-ring portrait was shot in NJ (now `-nj`). The six Music studio photos are from Bunker Studios, Brooklyn, a session for jazz composer Chris Hajian; names, alt text and EXIF say so. Which person in the frames is Hajian is unconfirmed, so captions credit the session and never identify an individual. The stone-wall portrait (portfolio-30) still has no location.

## 2026-11-09 (deploy) — New gallery photos live

- Studio name corrected by the owner to "The Bunker Studio" (Brooklyn); this replaces "Bunker Studios" in the note above. The stone-wall portrait is confirmed NJ (now `-nj`). Keep the exact spot out of public copy: it is near the owner's home.

## 2026-11-09 — Homepage photos re-curated, one portrait removed (local, NOT deployed at time of writing)

- Owner disliked `man-framing-face-with-hands-dusk-portrait-nj.jpg`: removed from `/photo/portraits`, `scripts/image-descriptions.json`, `public/assets` and `_originals` (source remains in Desktop `Portfolio`). Do not re-add it. Portraits gallery is now 15 photos.
- Owner asked Claude to choose better homepage photos and change the hierarchy. Hero order now: water portrait (`center 30%`), brindle French bulldog (`55% 35%`), Bunker grand piano session (`60% 35%`), San Remo espresso detail (`80% 45%`).
- Selected Work is still 16 photos in `src/lib/selected-work.ts`, none repeating the hero, in a 3/1/3/1/3/2/3 row rhythm: warm close-ups, bearded portrait full width, Bunker session trio, Barrister roaster offset, bright trio, low-light pair, friendly closing trio.
- Pitfall: the Barrister roaster photo looks noticeably grainy at hero size (face also turned down); use it at 3/4 width or smaller.
- Verified locally: desktop 1440 and phone 375, 20 homepage images, 0 broken, 0 missing alt, no sideways overflow, 0 console errors; tsc, eslint on changed files and `npm run build` pass. When deploying, warm the new hero/Selected Work image variants.

## 2026-11-10 — Homepage: rounded hero block, Selected Work bar, grid cut to 8 (local, NOT deployed at time of writing)

- Owner asked to confirm the goal first, then sent a reference screenshot (a "Folioblox" portfolio template): photo fills a rounded-bottom hero with the nav on top of it, and a lighter band with rounded bottom corners tucks underneath. Built to that reference. This supersedes the 2026-10-29 "nothing on the photo" rule for the header and positioning line only.
- Owner's answers: order = hero block -> Selected Work bar -> grid; rounding on the header block and the bar ONLY (photos, buttons, other pages stay sharp); Claude picks the 8; the bar scrolls with the page (not sticky).
- Implementation: `page.tsx` hero block `relative z-10 overflow-hidden rounded-b-[28px] md:rounded-b-[48px]` with `HeroGallery` filling it and a top gradient overlay; `HomeHeader` is transparent with a text shadow; `SelectedWork.tsx` bar uses `-mt-7 md:-mt-12` + matching top padding to sit under the hero's corners (radius and margin must stay in step).
- Selected Work is now 8 photos, rows 3/1/3/1: amber brindle dog, woman's eyes, puppy bond | bearded portrait full width | denim portrait, Bunker drummer (B&W), Labradors on the beach | Barrister roaster offset right. Piano hero position changed to `60% 22%` so the standing man's head clears the nav.
- Verified locally at 1440, 768, 375 and 320 wide: 12 images, 0 broken, 0 missing alt, no sideways overflow, 0 console errors, one H1; phone menu opens over the photo, Escape closes it and returns focus; tsc, eslint and `npm run build` pass.
- Still uncommitted together with the 2026-11-09 changes (portrait removal, new hero set). Owner said more design changes follow before moving on.

## 2026-11-10 (later) — Gold header, transparent phone dropdown, stronger top fade (local, NOT deployed)

- Owner request: header title, links and positioning line in gold (`#C9A84C`); phone dropdown transparent when open; black gradient over the top half of the hero photos. Owner first said "around 15%", then "so the menu, title and links are legible": 15% left gold unreadable on the sand, wood and tile photos, so the fade is `from-black/80 via-black/60 via-[18%] to-black/0 to-50%` plus a tight dark text shadow. Owner saw it in the preview and approved ("great").
- Pitfall: `globals.css` sets `h1-h4 { color: #fff }` unlayered, which beats Tailwind `text-*` classes; the gold wordmark needs an inline `color`.
- The positioning line moved from `page.tsx` into `HomeHeader.tsx` so the phone dropdown opens below it instead of on top of it. Desktop keeps inline links (a desktop dropdown was a misread and was reverted).
- Verified at 1440/768/375/320: 12 images, 0 broken, no overflow, 0 console errors, one H1, phone menu opens/closes with Escape returning focus; tsc and eslint clean.

## 2026-11-10 (photo removals) — four Business photos removed at owner's request (local, NOT deployed)

- Removed from the site, `public/assets/business` and `_originals/business`: `sobol-acai-bowl-fruit-topping-nj`, `sobol-acai-bowl-close-up-nj`, `sobol-acai-bowl-branding-nj`, `barrister-coffee-roast-close-up-nj`. Do not re-add. Business gallery is now 12 photos. The web-size copies remain in git history (commit a79c770 and earlier); the full-size `_originals` copies were deleted with them.
- Selected Work closer (8th photo) is now `barrister-coffee-house-brand-photography-basking-ridge-nj.jpg` (barista from behind at the espresso machine), still offset right at 3/4 width.
- Owner workflow: they name files to remove or swap; deleting a file from the folder alone would leave a broken image, so pages, descriptions JSON and files are changed together.

## 2026-11-10 (evening) — Gold text tried and reverted; hero photo swap; pre-deploy audit

- Gold text is OUT. The owner approved a gold header, then asked for all site text in gold, then on seeing it said "the gold is distracting. Lets revert to the old way, keep the black gradient". All text is back to the original colors (white headings, `#F5F5F5` body, `#A0A0A0` secondary); the 2026-11-10 "(later)" entry's gold header no longer applies. Kept from that round: the black fade on the hero, the text shadow, the transparent phone dropdown, and the positioning line living in `HomeHeader.tsx`.
- Hero slide 4 is now `sobol-acai-bowls-spread-nj.jpg` (`center 40%`) instead of the San Remo espresso detail, at the owner's request. Hero order: water portrait, French bulldog, Bunker piano session, SoBol spread.
- Pre-deploy audit method (reusable): serve the production build locally (`next start -p 3100`) and drive headless Chrome over CDP through all 10 pages at 320, 390, 768, 1440 and 1920 wide, plus the homepage at 375, 414, 844x390, 1024, 1280 and 2560. Checks: broken images, missing alt, sideways overflow, clipped text, H1 count, console errors, failed requests, header/bar geometry, phone menu open/Escape.
- Note: the local production build loads Google Analytics (a `NEXT_PUBLIC_GA_ID` exists in the local env), so local audits can log failed analytics image requests. Those are not site bugs.

## 2026-11-10 (night) — Deployed f027b86; /photo card copy rewritten (local, NOT deployed)

- Deployed `f027b86` (rounded hero block, Selected Work bar, 8-photo grid, five photos removed, hero slide 4 = SoBol spread, white text). Server: pulled, built in place, PM2 online; 60/60 homepage image variants warmed; 10 routes 200, `/photo/pets` 308, removed photo URLs 404. Live audit at 11 screen sizes: 0 problems.
- `/photo` cards: owner-supplied copy, verbatim, in `src/lib/categories.ts` as `audience` + `description` (two lines per card). Dogs: "For dog owners. / Personality led portraits." Portraits: "For individuals. / Headshots and personal portraits." Music: "For bands and artists. / Live, studio, and press." Business: "For food and drink businesses. / Cafes, bakeries, and product." Owner wrote the last label as "Businesses"; the card title was left as "Business" to match the nav, homepage bar and gallery page (asked the owner).
- Pitfall: after `git checkout -- src/app/globals.css` the dev server kept serving the old CSS from Turbopack's persistent cache, even across a restart. Fix: stop the preview, delete LOCAL `.next/dev`, start again. (The never-delete-`.next` rule is for the production server only.)

## 2026-11-11 — Three family portraits added; Selected Work panel wraps the grid (local, NOT deployed)

- New photos from Desktop `portfolio-31/32/33.jpg` (family session in an autumn park), added to `/photo/portraits` (now 18 photos) with EXIF descriptions: `man-hugging-young-boy-autumn-park-family-portrait-nj`, `woman-coral-dress-hugging-boy-autumn-park-family-portrait-nj`, `family-of-five-beneath-tree-autumn-park-portrait-nj`. Captions describe what is visible and do not state family relationships. There is no separate Family gallery yet.
- Selected Work is now 9 photos in 4 full-width rows (3 / 1 / 3 / 2): the last row pairs the Barrister espresso-bar photo with the family-of-five photo (owner asked for #33 at the bottom).
- Owner feedback: the lighter-black bar did not read as belonging to the photos, so the `#1A1A1A` panel now contains the heading, links and the whole grid. Owner also said "Make the grid consistent. There should be no gaps": offset / 3/4-width rows are banned; `size`/`align` on a row should not be used.
- Still pending deploy from the previous round: the `/photo` card copy.

## 2026-11-11 (later) — Pasted brief: hub reorder + gallery reorder done locally; its homepage task NOT applied

- The owner pasted a brief written against the old live state (16-photo Selected Work, "Cloudflare Pages"). Applied locally, NOT deployed: `/photo` cards reordered to Portraits, Music, Business, Dogs; hub intro "Photography across northern New Jersey. Choose what you need."; Dogs line now "Personality-led portraits."; photos reordered inside each gallery (arrays only, nothing added, removed or renamed).
- Gallery order rules from the brief: Business = SoBol block, coffee block, bakery block (product, then space, then detail). Music = live block, then the Chris Hajian studio block in session order (drums, piano, mixing desk, control room). Portraits = headshots, then environmental (the three family portraits sit here), then musician portraits last. Dogs = grouped by dog, portraits first, moving shots last.
- NOT applied: the brief's Task 1 (a fixed list of 8 Selected Work photos, first one full width). It conflicts with the owner's own instructions from the same two days: one listed photo (`barrister-coffee-roast-close-up-nj`) was deleted at their request, another was removed from the hero, and they asked for the family photo at the bottom of a grid they had just approved. Asked the owner which should win.
- The brief's standing rules worth keeping: no em dashes in visible copy written from now on; do not change URLs; no Sports gallery until there are keepers; Business copy must not claim salons, retail or offices (food and drink only).
- Preview pitfall: two hero images hung on the dev server's image optimizer (requests never returned) until the preview was restarted; the production build and the live site were unaffected.
