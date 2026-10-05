# Davidsons Lens — Agent Guide

Production marketing/portfolio site for **Davidsons Lens** (James Davidson) — a photo, video,
and creative-services business in Bernardsville, NJ. Live at **https://davidsonslens.com**
(indexed by search engines — this is a real, public, revenue-facing site, not a sandbox).

Your primary lane in this repo is **design and UI**. Infrastructure, deployment, security
hardening, and SEO plumbing are handled separately — leave them intact unless explicitly asked.

## Commands

```bash
npm run dev                                     # dev server on :3000
npm run build                                   # production build — MUST pass before any change is done
node scripts/optimize-images.mjs public/assets  # optimize/rename-safe image pipeline (see Images)
```

There is no test suite; `npm run build` (compile + TypeScript) is the verification gate.

## Stack

- **Next.js 16 (App Router) + TypeScript**, Turbopack
- **Tailwind CSS v4** — CSS-first config via `@theme` in `src/app/globals.css` (no tailwind.config)
- **framer-motion** for reveals/transitions (`ScrollReveal`, `PageTransition`)
- **next/font** Google fonts: Playfair Display → `--font-display`, Outfit → `--font-body`
- **Resend** powers the contact API (`src/app/api/contact/route.ts`)
- **marked + gray-matter** are installed for the (currently removed) blog — unused for now

## Design system (follow exactly)

**Colors**
| Token | Value | Use |
|---|---|---|
| Background | `#0D0D0D` | page background everywhere |
| Surface | `#1A1A1A` | cards, inputs |
| Primary text | `#F5F5F5` | ALL readable body copy, lists, lead paragraphs |
| Secondary text | `#A0A0A0` | ONLY labels, captions, footer, dates, meta |
| Gold accent | `#C9A84C` | CTAs, links, eyebrows, dividers, active nav |
| Gold hover | `#DFC070` | hover state on gold text links |

**Text-color rule (a past user-reported bug — do not regress):** any sentence a visitor reads
is `#F5F5F5`. `#A0A0A0` is strictly for secondary UI. Never introduce a third gray.

**Typography:** headings use `style={{ fontFamily: 'var(--font-display)' }}` (Playfair serif);
everything else `var(--font-body)` (Outfit). Nav/labels/buttons are uppercase with wide
tracking (`tracking-[0.2em]`–`[0.3em]`). Gold hairline divider: `w-12 h-px bg-[#C9A84C]`.

**Buttons:** sharp corners — **no rounded corners anywhere**. Gold outline
(`border border-[#C9A84C]`), gold text, hover fills gold with `#0D0D0D` text. Reuse
`CTAButton`. Interactive things must LOOK interactive (boxed/underlined) — plain text lists
must not look like buttons (another past user complaint; see the "What I Shoot" list pattern
on `/video`).

**Aesthetic:** dark, cinematic, premium, editorial. Generous whitespace, restrained motion
(fades/reveals, ~0.3–0.9s), no flashy effects.

**Motion:** the homepage hero (`HeroGallery`) is a stack of absolutely-positioned images
cross-dissolved with CSS opacity. Do NOT rewrite it with AnimatePresence `mode="wait"` —
that caused a black flash between slides.

## Layout map

- `/` — full-screen splash: rotating 4-image hero (8s), centered wordmark, boxed nav buttons,
  CTA, social icons. No header, no footer on this page.
- `/photo` — 4 image-tile category cards (Portraits, Music, Dogs, Business) with hover zoom +
  gradient labels. Dogs is the owner's favorite subject and a planned flagship.
- `/photo/*` — gallery sub-pages via `GallerySubPage` (wide hero, description, masonry grid).
- `/video` — featured YouTube embed (youtube-nocookie) + "What I Shoot" list.
- `/creative-services`, `/contact` (form → `/api/contact`), `/coming-soon` (unlinked). The blog was removed on
  2026-10-05 and will return after the rebuild.
- Interior pages: `Navigation` header (logo left, links right, hamburger on mobile) + `Footer`
  (nav, about, social icons).

## Images

- All photos live in `public/assets/<section>/`; `public/assets/_originals/` holds pristine
  backups and is **gitignored — never reference or ship it**.
- Filenames are SEO: kebab-case, descriptive, location keyword (e.g.
  `dramatic-labrador-portrait-nj.jpg`). Keep that convention for anything new.
- New/changed photos MUST go through `node scripts/optimize-images.mjs public/assets/<section>`
  (caps 2400px, mozjpeg q82, embeds EXIF, backs up originals) before use.
- Always use `next/image`. Crops are tuned per image with `style={{ objectPosition }}` —
  when changing hero/tile imagery, verify the subject survives the tall MOBILE crop, not just
  desktop.
- `next.config.ts` serves **WebP only. Never re-enable AVIF** — the 1-core production server
  cannot afford AVIF encoding (this caused a real slow-loading incident).

## Hard constraints — do not change without explicit request

1. **Security headers/CSP in `next.config.ts`.** If you add an external script/frame/font,
   you must extend the CSP accordingly or it will be silently blocked in production.
2. **Contact API protections** (`src/app/api/contact/route.ts`): rate limiting, honeypot,
   length caps, HTML escaping. The honeypot field name `company` must stay in sync between
   `ContactForm.tsx` and the route.
3. **SEO state:** site is live and indexable — `robots` metadata, `robots.txt`, `sitemap.ts`
   stay as-is. New pages get added to `src/app/sitemap.ts`.
4. **Perf budget:** production is a 1GB/1-core EC2 box. No heavy new dependencies; prefer
   CSS over JS animation; keep pages lean.
5. **Secrets:** never read, print, or commit `.env*` files, API keys, or `.pem` files.
   `RESEND_API_KEY` / `CONTACT_EMAIL` exist only on the server.
6. **Brand facts:** Instagram is `@davidsonslens_` (trailing underscore matters), YouTube is
   `@davidsonslens`, contact email `davidsonmediaco@gmail.com`, sender
   `hello@davidsonslens.com`. Social icons live in `SocialLinks.tsx`.

## Deploying

You do NOT deploy. Verify with `npm run build`, commit with a clear message, and stop.
Deployment (git push → SSH to EC2 → build → PM2 restart) is handled by James / Claude Code.
Never attempt SSH, PM2, nginx, certbot, or DNS operations.

## Known open items

- Pinterest icon in `SocialLinks.tsx` points to a placeholder URL (real handle TBD).
- `/video` still features a single music video (no full reel yet); `/coming-soon` is retired
  but intentionally kept.
- Sports, Behind the Scenes, and Blog were removed 2026-10-05 (files parked in the gitignored
  `archive/`). `next.config.ts` 301s their old URLs; `/photo/pets` → `/photo/dogs`. Sports is
  expected to return — drop its redirect then. See `docs/REBUILD_PLAN.md` for the active rebuild.
