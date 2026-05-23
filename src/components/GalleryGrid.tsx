'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

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
  const inner = (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: (index % 6) * 0.07 }}
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
    </motion.div>
  )

  if (img.href) {
    return <Link href={img.href}>{inner}</Link>
  }
  return inner
}
