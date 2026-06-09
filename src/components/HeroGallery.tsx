'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface HeroGalleryProps {
  images: { src: string; alt: string; position?: string }[]
  interval?: number
}

export default function HeroGallery({ images, interval = 8000 }: HeroGalleryProps) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (images.length <= 1) return
    const timer = setInterval(() => {
      setCurrent(i => (i + 1) % images.length)
    }, interval)
    return () => clearInterval(timer)
  }, [images.length, interval])

  if (images.length === 0) {
    return <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A] to-[#0D0D0D]" />
  }

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0D0D0D]">
      {/* All frames stacked; only the current one is opaque. The layers overlap,
          so the outgoing image cross-dissolves into the incoming one with no black gap. */}
      {images.map((img, i) => (
        <div
          key={img.src}
          aria-hidden={i !== current}
          className="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            priority={i === 0}
            className="object-cover"
            style={{ objectPosition: img.position ?? 'center' }}
            sizes="100vw"
          />
        </div>
      ))}
      {/* Dark overlay for text legibility */}
      <div className="absolute inset-0 bg-black/55" />
    </div>
  )
}
