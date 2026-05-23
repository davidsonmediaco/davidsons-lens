import type { Metadata } from 'next'
import GallerySubPage from '@/components/GallerySubPage'

export const metadata: Metadata = {
  title: 'Pets',
  description:
    'Pet and dog photography in Bernardsville, NJ. Capturing the real personality behind every animal. Serving pet owners across Somerset County and northern New Jersey.',
}

const images: { src: string; alt: string }[] = []

export default function PetsPage() {
  return (
    <GallerySubPage
      category="Pets"
      description={`Every animal has a personality. The goofy ones, the dramatic ones, the ones who act like they own the room and know it. A perfectly posed photo is nice but it's not what makes your pet yours.

That's what I'm after. The real them. The way they look at you, the way they move, the moment they forget the camera is even there. That's the photo you're going to want on your wall.

Based in Bernardsville, NJ serving pet owners across Somerset County, Morris County, and northern New Jersey.`}
      aboutBlurb="Pet and dog photography in Bernardsville, NJ. Capturing the real personality behind every animal. Serving pet owners across Somerset County and northern New Jersey."
      images={images}
    />
  )
}
