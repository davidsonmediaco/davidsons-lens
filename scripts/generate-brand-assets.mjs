// Generates branded favicon + social-share (OG) image for Davidsons Lens.
//   node scripts/generate-brand-assets.mjs
//
// Outputs:
//   public/og-image.jpg        1200x630 social share card
//   src/app/icon.png           512x512 app icon (Next auto-links)
//   src/app/apple-icon.png     180x180 apple touch icon
//   src/app/favicon.ico        multi-size .ico (if png-to-ico is available)

import sharp from 'sharp'
import { writeFile } from 'node:fs/promises'
import path from 'node:path'

const ROOT = process.cwd()
const GOLD = '#C9A84C'
const DARK = '#0D0D0D'
const LIGHT = '#F5F5F5'
const SERIF = 'Georgia, "Times New Roman", serif'

// ---------- OG image (1200 x 630) ----------
async function buildOg() {
  const W = 1200
  const H = 630
  const base = await sharp(path.join(ROOT, 'public/assets/portraits/water-portrait-bernardsville-nj.jpg'))
    .resize(W, H, { fit: 'cover', position: 'centre' })
    .toBuffer()

  const overlay = Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="black" stop-opacity="0.35"/>
          <stop offset="55%" stop-color="black" stop-opacity="0.55"/>
          <stop offset="100%" stop-color="black" stop-opacity="0.75"/>
        </linearGradient>
      </defs>
      <rect width="${W}" height="${H}" fill="url(#g)"/>
      <text x="${W / 2}" y="305" text-anchor="middle" font-family='${SERIF}' font-size="92"
            fill="${LIGHT}" letter-spacing="14" font-weight="500">DAVIDSONS LENS</text>
      <text x="${W / 2}" y="362" text-anchor="middle" font-family='${SERIF}' font-size="26"
            fill="${GOLD}" letter-spacing="9">PHOTO &#8226; VIDEO &#8226; CREATIVE MEDIA</text>
      <text x="${W / 2}" y="404" text-anchor="middle" font-family='${SERIF}' font-size="20"
            fill="${LIGHT}" fill-opacity="0.85" letter-spacing="6">Bernardsville, New Jersey</text>
    </svg>`)

  await sharp(base)
    .composite([{ input: overlay, top: 0, left: 0 }])
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(path.join(ROOT, 'public/og-image.jpg'))
  console.log('  public/og-image.jpg  (1200x630)')
}

// ---------- Favicon / app icons ----------
function iconSvg(size) {
  const r = Math.round(size * 0.2)
  const fs = Math.round(size * 0.52)
  return Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
      <rect width="${size}" height="${size}" rx="${r}" fill="${DARK}"/>
      <text x="50%" y="50%" text-anchor="middle" dominant-baseline="central"
            font-family='${SERIF}' font-size="${fs}" fill="${GOLD}"
            letter-spacing="${Math.round(size * 0.01)}" font-weight="500">DL</text>
    </svg>`)
}

async function buildIcons() {
  await sharp(iconSvg(512)).png().toFile(path.join(ROOT, 'src/app/icon.png'))
  console.log('  src/app/icon.png  (512x512)')
  await sharp(iconSvg(180)).png().toFile(path.join(ROOT, 'src/app/apple-icon.png'))
  console.log('  src/app/apple-icon.png  (180x180)')

  // favicon.ico from 16/32/48 PNGs (needs png-to-ico)
  try {
    const { default: pngToIco } = await import('png-to-ico')
    const sizes = [16, 32, 48]
    const pngs = await Promise.all(sizes.map((s) => sharp(iconSvg(s)).png().toBuffer()))
    const ico = await pngToIco(pngs)
    await writeFile(path.join(ROOT, 'src/app/favicon.ico'), ico)
    console.log('  src/app/favicon.ico  (16/32/48)')
  } catch (e) {
    console.log('  (skipped favicon.ico — png-to-ico not installed:', e.message, ')')
  }
}

console.log('Generating brand assets...')
await buildOg()
await buildIcons()
console.log('Done.')
