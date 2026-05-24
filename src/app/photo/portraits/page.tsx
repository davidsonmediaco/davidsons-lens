import type { Metadata } from 'next'
import GallerySubPage from '@/components/GallerySubPage'

export const metadata: Metadata = {
  title: 'Portraits',
  description:
    'Professional portrait photography in Bernardsville, NJ. Serving musicians, creatives, and individuals across Somerset County and northern New Jersey.',
}

const heroImage = {
  src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=1920&q=80',
  alt: 'Portrait photography by Davidsons Lens, Bernardsville NJ',
}

const images: { src: string; alt: string }[] = [
  { src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80', alt: 'Portrait session' },
  { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80', alt: 'Portrait session' },
  { src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80', alt: 'Portrait session' },
  { src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80', alt: 'Portrait session' },
  { src: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80', alt: 'Portrait session' },
  { src: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=800&q=80', alt: 'Portrait session' },
]

export default function PortraitsPage() {
  return (
    <GallerySubPage
      category="Portraits"
      heroImage={heroImage}
      description={`My goal with every portrait session is simple. I want you to leave feeling more confident than when you showed up. Not just in the photos we made, but in yourself.

A big part of that is making sure you're comfortable in front of the camera from the start, and that the location actually means something. Sometimes I'll suggest a spot based on what the shoot calls for. Sometimes you'll know exactly where you want to be. Either way we figure it out together.

Based in Bernardsville, NJ serving musicians, creatives, and individuals across Somerset County, Morris County, and northern New Jersey.`}
      aboutBlurb="Professional portrait photography in Bernardsville, NJ. Serving musicians, creatives, and individuals across Somerset County, Morris County, and northern New Jersey."
      images={images}
    />
  )
}
