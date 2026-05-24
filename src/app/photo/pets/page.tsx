import type { Metadata } from 'next'
import GallerySubPage from '@/components/GallerySubPage'

export const metadata: Metadata = {
  title: 'Pets',
  description:
    'Pet and dog photography in Bernardsville, NJ. Capturing the real personality behind every animal. Serving pet owners across Somerset County and northern New Jersey.',
}

const heroImage = {
  src: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1920&q=80',
  alt: 'Pet photography by Davidsons Lens, Bernardsville NJ',
}

const images: { src: string; alt: string }[] = [
  { src: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=800&q=80', alt: 'Cat portrait' },
  { src: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=800&q=80', alt: 'Dog portrait outdoors' },
  { src: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&w=800&q=80', alt: 'Puppy portrait' },
  { src: 'https://images.unsplash.com/photo-1548681528-6a5c45dbe30f?auto=format&fit=crop&w=800&q=80', alt: 'Dog close-up portrait' },
  { src: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80', alt: 'Dog portrait session' },
  { src: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?auto=format&fit=crop&w=800&q=80', alt: 'Cat portrait session' },
]

export default function PetsPage() {
  return (
    <GallerySubPage
      category="Pets"
      heroImage={heroImage}
      description={`Every animal has a personality. The goofy ones, the dramatic ones, the ones who act like they own the room and know it. A perfectly posed photo is nice but it's not what makes your pet yours.

That's what I'm after. The real them. The way they look at you, the way they move, the moment they forget the camera is even there. That's the photo you're going to want on your wall.

Based in Bernardsville, NJ serving pet owners across Somerset County, Morris County, and northern New Jersey.`}
      aboutBlurb="Pet and dog photography in Bernardsville, NJ. Capturing the real personality behind every animal. Serving pet owners across Somerset County and northern New Jersey."
      images={images}
    />
  )
}
