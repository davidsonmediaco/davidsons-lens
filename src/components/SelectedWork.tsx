import type { CSSProperties } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { selectedWork, type WorkPhoto, type WorkRow } from '@/lib/selected-work'

// Homepage portfolio: a curated, mixed sequence of photographs shown directly —
// no overlays, captions or hover effects. Each row is a "justified" row: every
// photo gets a flex-grow equal to its aspect ratio, so all photos in a row share
// one height and keep their natural shape (no cropping). Pure CSS, no client JS.

const galleries = [
  ['/photo/portraits', 'Portraits'],
  ['/photo/music', 'Music'],
  ['/photo/dogs', 'Dogs'],
  ['/photo/business', 'Business'],
] as const

const MAX_WIDTH = 1400 // px — matches max-w-[1400px] below

const ratio = (p: WorkPhoto) => p.width / p.height

// Responsive `sizes` so the browser downloads a file that fits the rendered width.
function sizesFor(mobileShare: number, desktopShare: number) {
  const m = Math.round(mobileShare * 100)
  const d = Math.round(desktopShare * 100)
  return `(max-width: 639px) ${m}vw, (max-width: ${MAX_WIDTH}px) ${d}vw, ${Math.round(desktopShare * MAX_WIDTH)}px`
}

function Photo({
  photo,
  className,
  sizes,
}: {
  photo: WorkPhoto
  className: string
  sizes: string
}) {
  return (
    <div className={`min-w-0 ${className}`} style={{ '--ar': ratio(photo) } as CSSProperties}>
      <Image
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        sizes={sizes}
        className="block w-full h-auto"
      />
    </div>
  )
}

function Row({ row }: { row: WorkRow }) {
  const { photos } = row
  const total = photos.reduce((sum, p) => sum + ratio(p), 0)

  if (photos.length === 1) {
    const wide = row.size === 'wide'
    return (
      <Photo
        photo={photos[0]}
        className={`w-full ${wide ? 'sm:w-3/4' : ''} ${row.align === 'right' ? 'sm:ml-auto' : ''}`}
        sizes={sizesFor(1, wide ? 0.75 : 1)}
      />
    )
  }

  if (photos.length === 2) {
    // Two tall photos stay side by side on phones; any other pair stacks.
    const tallPair = photos.every(p => ratio(p) < 1)
    return (
      <div className={`flex gap-3 md:gap-4 ${tallPair ? '' : 'flex-col sm:flex-row'}`}>
        {photos.map(p => (
          <Photo
            key={p.src}
            photo={p}
            className={tallPair ? '[flex:var(--ar)_1_0%]' : 'w-full sm:w-auto sm:[flex:var(--ar)_1_0%]'}
            sizes={sizesFor(tallPair ? ratio(p) / total : 1, ratio(p) / total)}
          />
        ))}
      </div>
    )
  }

  // Trio: one line on tablet/desktop; on phones the first photo leads full width
  // and the other two share the next line.
  const restTotal = total - ratio(photos[0])
  return (
    <div className="flex flex-wrap sm:flex-nowrap gap-3 md:gap-4">
      {photos.map((p, i) => (
        <Photo
          key={p.src}
          photo={p}
          className={i === 0 ? 'basis-full sm:[flex:var(--ar)_1_0%]' : '[flex:var(--ar)_1_0%]'}
          sizes={sizesFor(i === 0 ? 1 : ratio(p) / restTotal, ratio(p) / total)}
        />
      ))}
    </div>
  )
}

export default function SelectedWork() {
  return (
    <section id="selected-work" aria-labelledby="selected-work-heading" className="bg-[#0D0D0D]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 pt-16 md:pt-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8 md:mb-12">
          <h2
            id="selected-work-heading"
            className="text-3xl md:text-4xl text-white"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Selected Work
          </h2>
          <nav aria-label="Photo galleries">
            <ul className="flex flex-wrap gap-x-6 gap-y-2" style={{ fontFamily: 'var(--font-body)' }}>
              {galleries.map(([href, label]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-xs tracking-[0.2em] uppercase text-[#F5F5F5] underline decoration-[#C9A84C]/50 underline-offset-[6px] hover:text-[#C9A84C] hover:decoration-[#C9A84C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C9A84C] transition-colors duration-300"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-3 md:gap-4">
          {selectedWork.map(row => (
            <Row key={row.photos.map(p => p.src).join('|')} row={row} />
          ))}
        </div>
      </div>
    </section>
  )
}
