import type { Metadata } from 'next'
import GallerySubPage from '@/components/GallerySubPage'

export const metadata: Metadata = {
  title: 'Behind the Scenes',
  description:
    'Behind the scenes with Davidsons Lens — the setups, the candid moments, and the process behind the work across northern New Jersey.',
}

const heroImage = {
  src: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1920&q=80',
  alt: 'Behind the scenes on a Davidsons Lens shoot, Bernardsville NJ',
}

// Replace these with your real behind-the-scenes photos in this same shape.
const images: { src: string; alt: string }[] = [
  { src: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80', alt: 'Behind the scenes' },
  { src: 'https://images.unsplash.com/photo-1486693128850-a77436e7ba3c?auto=format&fit=crop&w=800&q=80', alt: 'On set' },
  { src: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=800&q=80', alt: 'Lighting setup' },
  { src: 'https://images.unsplash.com/photo-1500210600161-3c2b8eca5f9e?auto=format&fit=crop&w=800&q=80', alt: 'Camera at work' },
  { src: 'https://images.unsplash.com/photo-1473876637954-4b493d59fd97?auto=format&fit=crop&w=800&q=80', alt: 'In the moment' },
  { src: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=800&q=80', alt: 'Working the shot' },
]

export default function BehindTheScenesPage() {
  return (
    <GallerySubPage
      category="Behind the Scenes"
      heroImage={heroImage}
      description={`Every shoot has a story before the final image ever exists. The setups, the test frames, the in-between moments where things actually come together. This is that side of the work.

I pull behind-the-scenes shots from sessions, sets, and shoots all over because the process is half the fun, and it shows you how I actually work.

Based in Bernardsville, NJ working across Somerset County, Morris County, and northern New Jersey.`}
      aboutBlurb="Behind the scenes with Davidsons Lens — the process, the setups, and the candid moments behind the work across northern New Jersey."
      images={images}
    />
  )
}
