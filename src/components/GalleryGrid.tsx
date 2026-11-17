'use client'

import { useRef, type CSSProperties } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useReveal } from '@/components/useReveal'

interface GalleryImage {
  src: string
  alt: string
  href?: string
  span?: 'wide' | 'tall' | 'normal'
}

interface GalleryGridProps {
  images: GalleryImage[]
  masonry?: boolean
}

export default function GalleryGrid({ images, masonry = false }: GalleryGridProps) {
  if (images.length === 0) {
    return (
      <div className="text-center py-20 text-[#A0A0A0]">
        <p className="text-lg">Gallery coming soon.</p>
      </div>
    )
  }

  if (masonry) {
    return (
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 space-y-3">
        {images.map((img, i) => (
          <GalleryItem key={i} img={img} index={i} masonry />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {images.map((img, i) => (
        <GalleryItem key={i} img={img} index={i} />
      ))}
    </div>
  )
}

function GalleryItem({
  img,
  index,
  masonry,
}: {
  img: GalleryImage
  index: number
  masonry?: boolean
}) {
  // Each photo fades up as it scrolls into view; it is visible in the HTML (see useReveal).
  const ref = useRef<HTMLDivElement>(null)
  useReveal(ref, 40)

  const inner = (
    <div
      ref={ref}
      style={
        {
          '--reveal-delay': `${(index % 6) * 0.07}s`,
          '--reveal-y': '16px',
          '--reveal-duration': '0.6s',
        } as CSSProperties
      }
      className={`relative overflow-hidden bg-[#1A1A1A] group ${masonry ? 'break-inside-avoid mb-3' : 'aspect-[4/3]'}`}
    >
      <Image
        src={img.src}
        alt={img.alt}
        fill={!masonry}
        width={masonry ? 800 : undefined}
        height={masonry ? 600 : undefined}
        className={`${masonry ? 'w-full h-auto' : 'object-cover'} transition-all duration-500 group-hover:scale-105 group-hover:brightness-90`}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
    </div>
  )

  if (img.href) {
    return <Link href={img.href}>{inner}</Link>
  }
  return inner
}
