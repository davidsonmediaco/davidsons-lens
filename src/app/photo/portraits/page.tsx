import type { Metadata } from 'next'
import GallerySubPage from '@/components/GallerySubPage'

export const metadata: Metadata = {
  title: 'Portraits',
  description:
    'Professional portrait photography in Bernardsville, NJ. Serving musicians, creatives, and individuals across Somerset County and northern New Jersey.',
}

const heroImage = {
  src: '/assets/portraits/water-portrait-bernardsville-nj.jpg',
  alt: 'Cinematic waterside portrait photography in Bernardsville, NJ — Davidsons Lens',
}

const images: { src: string; alt: string }[] = [
  { src: '/assets/portraits/outdoor-headshot-portrait-nj.jpg', alt: 'Outdoor mens headshot portrait in New Jersey — Davidsons Lens' },
  { src: '/assets/portraits/denim-headshot-portrait-nj.jpg', alt: 'Denim headshot portrait session in New Jersey — Davidsons Lens' },
  { src: '/assets/portraits/water-portrait-bernardsville-nj.jpg', alt: 'Cinematic waterside portrait in Bernardsville, NJ — Davidsons Lens' },
  { src: '/assets/portraits/seated-portrait-session-nj.jpg', alt: 'Seated outdoor portrait session in New Jersey — Davidsons Lens' },
  { src: '/assets/portraits/studio-headshot-portrait-nj.jpg', alt: 'Studio-style headshot portrait in New Jersey — Davidsons Lens' },
  { src: '/assets/portraits/creative-portrait-nj.webp', alt: 'Creative portrait photography in New Jersey — Davidsons Lens' },
  { src: '/assets/portraits/environmental-portrait-nj.jpg', alt: 'Environmental portrait with guitar in New Jersey — Davidsons Lens' },
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
