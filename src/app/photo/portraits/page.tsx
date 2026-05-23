import type { Metadata } from 'next'
import GallerySubPage from '@/components/GallerySubPage'

export const metadata: Metadata = {
  title: 'Portraits',
  description:
    'Professional portrait photography in Bernardsville, NJ. Serving musicians, creatives, and individuals across Somerset County and northern New Jersey.',
}

const images: { src: string; alt: string }[] = [
  // Add images as: { src: '/assets/portraits/filename.jpg', alt: 'Portrait description, Bernardsville New Jersey' }
]

export default function PortraitsPage() {
  return (
    <GallerySubPage
      category="Portraits"
      description={`My goal with every portrait session is simple. I want you to leave feeling more confident than when you showed up. Not just in the photos we made, but in yourself.

A big part of that is making sure you're comfortable in front of the camera from the start, and that the location actually means something. Sometimes I'll suggest a spot based on what the shoot calls for. Sometimes you'll know exactly where you want to be. Either way we figure it out together.

Based in Bernardsville, NJ serving musicians, creatives, and individuals across Somerset County, Morris County, and northern New Jersey.`}
      aboutBlurb="Professional portrait photography in Bernardsville, NJ. Serving musicians, creatives, and individuals across Somerset County, Morris County, and northern New Jersey."
      images={images}
    />
  )
}
