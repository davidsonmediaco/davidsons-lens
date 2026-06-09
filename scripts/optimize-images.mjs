// Reusable image optimizer + metadata embedder for Davidsons Lens.
//
// Usage:
//   node scripts/optimize-images.mjs [targetDir] [--force]
//   (targetDir defaults to public/assets)
//
// Per image (.jpg/.jpeg/.png/.webp):
//   - Backs up the untouched original to public/assets/_originals/<relativePath>
//     (first time only — safe to re-run)
//   - Auto-rotates per EXIF, caps the long edge at MAX_EDGE px
//   - Re-encodes: JPEG -> mozjpeg q82 progressive, WebP -> q82, PNG -> palette
//   - Embeds SEO metadata (EXIF): ImageDescription derived from the filename,
//     Artist + Copyright = Davidsons Lens
//   - Always reads from the pristine backup, so re-encoding never stacks loss
//
// --force reprocesses files even if already optimized (re-reads the backup).
// Use it after changing metadata/encode settings. Originals are never destroyed.

import { readdir, stat, mkdir, copyFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const ROOT = process.cwd()
const args = process.argv.slice(2)
const FORCE = args.includes('--force')
const TARGET = path.resolve(ROOT, args.find((a) => !a.startsWith('--')) ?? 'public/assets')
const BACKUP_ROOT = path.resolve(ROOT, 'public/assets/_originals')
const MAX_EDGE = 2400
const EXT = new Set(['.jpg', '.jpeg', '.png', '.webp'])

const ARTIST = 'Davidsons Lens'
const COPYRIGHT = '(c) Davidsons Lens - davidsonslens.com'

const fmtKB = (b) => `${(b / 1024).toFixed(0)} KB`

// Turn a SEO filename into a human, ASCII-safe EXIF description.
// e.g. "nj-cyclones-basketball-game-02" -> "NJ Cyclones Basketball Game - Davidsons Lens"
function describe(file) {
  const base = path.basename(file, path.extname(file))
  const words = base
    .replace(/-\d+$/, '') // drop trailing index like -02
    .split('-')
    .filter(Boolean)
    .map((w) => {
      const lower = w.toLowerCase()
      if (lower === 'nj') return 'NJ'
      if (lower === 'sobol') return 'SoBol'
      return w.charAt(0).toUpperCase() + w.slice(1)
    })
  return `${words.join(' ')} - ${ARTIST}`
}

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (full === BACKUP_ROOT) continue
      yield* walk(full)
    } else {
      yield full
    }
  }
}

async function run() {
  if (!existsSync(TARGET)) {
    console.error(`Target not found: ${TARGET}`)
    process.exit(1)
  }
  console.log(`Optimizing under: ${path.relative(ROOT, TARGET)}${FORCE ? '  (--force)' : ''}\n`)

  let processed = 0
  let savedBytes = 0

  for await (const file of walk(TARGET)) {
    const ext = path.extname(file).toLowerCase()
    if (!EXT.has(ext)) continue

    const rel = path.relative(path.resolve(ROOT, 'public/assets'), file)
    const backup = path.join(BACKUP_ROOT, rel)
    const hasBackup = existsSync(backup)

    if (hasBackup && !FORCE) continue // already optimized

    const before = (await stat(file)).size

    if (!hasBackup) {
      await mkdir(path.dirname(backup), { recursive: true })
      await copyFile(file, backup) // preserve pristine original
    }

    const description = describe(file)
    const exif = {
      IFD0: {
        ImageDescription: description,
        Artist: ARTIST,
        Copyright: COPYRIGHT,
      },
    }

    const pipeline = sharp(backup) // always read the pristine copy
      .rotate()
      .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true })
      .withExif(exif)

    if (ext === '.png') {
      pipeline.png({ compressionLevel: 9, palette: true })
    } else if (ext === '.webp') {
      pipeline.webp({ quality: 82 })
    } else {
      pipeline.jpeg({ quality: 82, mozjpeg: true, progressive: true })
    }

    await pipeline.toFile(file + '.tmp')
    const { rename } = await import('node:fs/promises')
    await rename(file + '.tmp', file)

    const after = (await stat(file)).size
    processed++
    savedBytes += before - after
    const pct = before > 0 ? Math.round((1 - after / before) * 100) : 0
    console.log(`  ${rel}\n    ${fmtKB(before)} -> ${fmtKB(after)}  (-${pct}%)  exif: "${description}"`)
  }

  console.log(
    `\nDone. ${processed} image(s) processed, ${(savedBytes / 1024 / 1024).toFixed(1)} MB saved.` +
      (processed === 0 ? ' (Nothing to do.)' : '')
  )
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
