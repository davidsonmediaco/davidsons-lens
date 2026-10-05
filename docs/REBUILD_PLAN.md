# Davidsons Lens — Conversion Audit & Rebuild Plan

Audit date: 2026-10-05. Method: full read of the source, live-site checks (timings, headers, HTML,
console), desktop/mobile review, and a contact sheet of the dog photos.
**Limit:** there is no behavioural data (see finding A1), so everything below is UX/code review,
not measured drop-off.

## Part 1 — Owner observations vs. audit

| # | Owner observation | Verdict | Evidence |
|---|---|---|---|
| 1 | Landing page asks too much; remove the wall | **Confirmed** | Homepage is one no-scroll screen with 8 clickable choices (4 boxed nav buttons, 1 CTA, 3 social icons). "Contact" and "Let's Work Together" go to the same URL. Nothing says what the business does, for whom, or where. Only a wordmark. |
| 2a | Remove behind-the-scenes | **Confirmed, easy** | 6 images, 1 gallery page, 1 `/photo` tile. |
| 2b | Remove basketball | **Confirmed, bigger than it sounds** | All 12 images in `/photo/sports` are NJ Cyclones basketball. Removing them removes the whole Sports section, plus 1 of 5 hero slides and a `/photo` tile. Sports copy mentions baseball but there are no baseball photos. |
| 2c | Make dogs a focus | **Supported, with a gap** | The dog photos are the strongest emotional work on the site (owner nose-to-nose with a puppy is the best conversion image). But the set is thin: 9 images, 7 are Labradors, 2 brindle, 1 image is duplicated (hero + grid), the winter brindle is visibly noisy. Needs more breed/setting variety and more owner-with-dog frames. |
| 3 | One-page homepage with click-through | **Confirmed; grid > slider** | The current homepage has ~23 KB of HTML and almost no readable text, which is thin for SEO as well as for visitors. A grid shows all categories at once; a slider hides everything but one frame. |
| 4 | Creative Services page is weak | **Confirmed** | See A5. |
| 5 | Remove placeholder blog | **Confirmed** | 1 sample post (dated 2025-04-15) with an Unsplash stock cover. It is the only reason Unsplash is in `remotePatterns` and the CSP `img-src`. |

## Part 2 — Additional findings (ranked by likely conversion impact)

**A1. Conversion is unmeasurable.** No Google Analytics (`NEXT_PUBLIC_GA_ID` unset; no gtag in live
HTML). Cloudflare's auto-injected Web Analytics beacon is blocked by our own CSP on every page load
(console error). Form submissions fire no event. We cannot see where visitors drop off. Fix first.

**A2. No reason to trust or choose James.** There is no About section, no photo of James, no
testimonials, no named-client proof (SoBol, Barrister Coffee, San Remo appear only in filenames),
no process ("what happens after I click Contact"), no FAQ.

**A3. No pricing or packages for Photo or Video.** The only prices on the site are the two
consulting sessions ($150 / $50). Visitors can't gauge fit, so many won't ask.

**A4. Single conversion path is weak.** Contact is a plain form. No persistent "Book" button in the
header (interior pages show 4 equal text links; mobile is hamburger-only). The service dropdown
offers Photo / Video / Social Media Management / Consulting / Other, with no Portraits, Dogs, or
Business. Email appears only in the error message. Success message promises "soon" with no
timeframe. No tracking on submit.

**A5. Creative Services page.** (a) It only covers social media management + consulting; Photo and
Video, the actual core business, are absent. (b) Copy is self-focused and fragmentary ("About the
quality of what you're paying for. About the success of your business.") with no outcomes, proof,
process, or "who this is for". (c) The 8-item bullet list repeats the paragraphs above it.
(d) "Custom Packages" has no starting price while consulting does. (e) "Creative Services" as a nav
label tells a visitor nothing. (f) The site-wide meta description claims "web design", which isn't
offered.

**A6. Gallery pages.** No lightbox (can't open a photo large). Long intro copy sits between the hero
and the photos. The masonry sets a fixed 800x600 on every image, so portrait/landscape mixes shift
layout as they load (likely CLS). The only CTA is after the whole gallery. Portfolio depth is thin:
Portraits 7, Music 9, Business 12, Pets 9.

**A7. The best work is dimmed.** The hero overlays a flat 55% black on every slide so the text is
readable. The result is dark and muddy rather than "eye-catching".

**A8. SEO housekeeping the rebuild must handle.** Homepage H1 is the brand name only; no
LocalBusiness structured data; layout meta/keywords still say "athletes" and "sports photographer";
removed pages (`/photo/sports`, `/photo/behind-the-scenes`, `/blog`, `/blog/*`) are in the sitemap
and probably indexed, so they need 301 redirects rather than 404s.

**What is NOT the problem:** speed. Server TTFB is 70–390 ms; hero images are 57–310 KB at desktop
size (11–95 KB mobile). Security headers, contact protections, and image pipeline are sound.

**Operational note:** maintenance mode has been ON since 2026-10-03. Short 503s are safe for
search; multi-day outages are not.

## Part 3 — Rebuild plan

### Phase 0 — Measure + decide (small)
- Install analytics (GA4 or Plausible). Update CSP accordingly (or disable the Cloudflare beacon).
- Events: `cta_click` (by location), `form_start`, `form_submit`, `gallery_open`.
- Pull Search Console (top pages/queries, which URLs are indexed) and Cloudflare analytics so we
  know traffic volume and source before changing anything.
- Collect the asset/decision list at the end of this doc.

### Phase 1 — Removals (small, do first, low risk)
- Delete Sports, Behind the Scenes, Blog: pages, tiles, hero slide, nav/footer links, sitemap
  entries, `content/blog`, `src/lib/blog.ts`, Unsplash `remotePatterns` + CSP `img-src` entry.
- 301s: `/photo/sports`, `/photo/behind-the-scenes`, `/blog`, `/blog/*` → `/photo` (or `/`).
- Move image folders to `_originals`-style cold storage rather than shipping them.
- Rewrite layout/page metadata and keywords to drop athletes/sports/web design.

### Phase 2 — One-page homepage (medium, the core of the rebuild)
Slim sticky header (logo left, Photo / Video / Services, **Book a Shoot** button always visible).
Then, scrolling:
1. **Hero:** one strong full-bleed image (single image, or 3-frame crossfade), a real headline
   with value prop + location, one primary CTA ("Book a Shoot"), one quiet secondary ("See the
   work" scrolls down). Lighten the overlay (gradient behind text only, not flat 55%).
2. **Portfolio grid:** Dogs as the large lead tile, then Portraits, Music, Business. Each links to
   its gallery.
3. **Dogs feature band:** short personal story (why dogs), 3 photos, "Book a dog session".
   Nonprofit goal appears only as a future-tense line until it is real (see Phase 3).
4. **Video band:** featured music video thumbnail/embed → `/video`.
5. **Services strip:** Photo / Video / Social, 1 line each + starting price → `/services`.
6. **Proof:** testimonials and client names (with permission).
7. **About James:** photo + 3 sentences.
8. **Contact band:** email + IG + short form or link to form.
9. Footer.

`/photo` stays as the full portfolio hub (it's indexed); the homepage grid is the primary path.

### Phase 3 — Dogs as a flagship (medium; depends on photos)
- Decide naming: **"Dogs"** targets the real search intent ("dog photographer NJ") better than
  "Pets". If chosen: `/photo/dogs` with 301 from `/photo/pets`.
- Target 18–24 curated images with breed/setting/size variety and owner-with-dog frames; drop the
  noisy winter frame; fix the duplicate hero.
- Dedicated offer: session description, what's included, starting price, 3-step process, FAQ
  ("my dog won't sit still", locations, timing, prints), local SEO copy for Somerset/Morris County.
- Nonprofit: no claim goes live until the mechanism is real (named rescue, % or $ per session,
  how it's reported). Until then: a "why I shoot dogs" story only.

### Phase 4 — Services rewrite (medium; copy-led)
Rename "Creative Services" → **Services**. Structure: Photo · Video · Social. Each gets: who it's
for, what you get, starting price, how it works (3 steps), one proof point, CTA. I draft copy,
you edit voice. Keep consulting pricing. Cut the redundant bullet lists.

### Phase 5 — Gallery pages (small–medium)
Lightbox with keyboard/swipe, true aspect ratios (no layout shift), trim intro copy to ~2
sentences above the grid, CTA after the first screen of photos and again at the end, remove
duplicate images, grow each gallery to ~15+.

### Phase 6 — Contact (small)
Service options → Dogs / Portraits / Music / Business / Video / Social / Other. Optional date +
location fields. Show email and Instagram DM as alternates. State response time. Fire the
conversion event. **Keep** rate limit, honeypot (`company`), length caps, escaping.

### Phase 7 — SEO + trust plumbing (small)
JSON-LD `LocalBusiness` / `Photographer`; homepage H1 with value prop + "Bernardsville, NJ"; update
sitemap and metadata; verify redirects; resubmit sitemap in Search Console.

### Phase 8 — QA and launch
Build locally. Deploy behind the existing maintenance gate and review with the preview cookie
before flipping it off. Verify: `npm run build`, mobile crops of every hero/tile image, all
redirects (curl), Lighthouse mobile, form delivery, analytics events firing.

**Sequencing:** 0 → 1 → 2 → 4 → 3 → 5 → 6 → 7 → 8. Phases 0–1 can ship independently ahead of the
rest. Phase 3 is gated on you supplying dog photos; everything else isn't.

## Part 4 — Decisions / inputs needed
1. Sports gone entirely (no baseball photos exist), or keep a baseball-only page if you have images?
2. Rename Pets → **Dogs** (with 301), and do you photograph cats/other animals at all?
3. More dog photos (drive E "dogs" folder has more?), plus any owner-with-dog shots.
4. Pricing: starting prices for Photo (by category), Video, Social packages. Or "starting at"?
5. Testimonials and permission to name SoBol / Barrister Coffee / San Remo as clients.
6. A portrait of you + 2–3 sentence bio (real name James Davidson on the site?).
7. Analytics choice (GA4 vs. Plausible) and the ID; real Pinterest handle (or drop Pinterest).
8. Nonprofit: aspirational story only for now, or is there a rescue/charity named already?
9. Turn maintenance OFF now (old site returns) while we rebuild locally? Recommended.
