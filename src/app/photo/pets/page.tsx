import type { Metadata } from 'next'
import GallerySubPage from '@/components/GallerySubPage'

export const metadata: Metadata = {
  title: 'Pets',
  description:
    'Pet and dog photography in Bernardsville, NJ. Capturing the real personality behind every animal. Serving pet owners across Somerset County and northern New Jersey.',
}

const heroImage = {
  src: '/assets/pets/dramatic-labrador-portrait-nj.jpg',
  alt: 'Dramatic close-up Labrador portrait — pet photography in New Jersey — Davidsons Lens',
}

const images: { src: string; alt: string }[] = [
  { src: '/assets/pets/pet-photography-puppy-bond-nj.jpg', alt: 'Owner nose-to-nose with a Labrador puppy — pet photography NJ — Davidsons Lens' },
  { src: '/assets/pets/labradors-running-beach-nj.jpg', alt: 'Two Labradors running on the beach — dog photography in New Jersey — Davidsons Lens' },
  { src: '/assets/pets/happy-yellow-lab-portrait-nj.jpg', alt: 'Happy yellow Labrador portrait outdoors — pet photography NJ — Davidsons Lens' },
  { src: '/assets/pets/brindle-dog-winter-portrait-nj.jpg', alt: 'Brindle dog portrait in the snow — winter pet photography in New Jersey — Davidsons Lens' },
  { src: '/assets/pets/yellow-lab-puppy-portrait-nj.jpg', alt: 'Yellow Labrador puppy portrait outdoors — pet photography NJ — Davidsons Lens' },
  { src: '/assets/pets/labrador-puppy-candid-nj.jpg', alt: 'Labrador puppy candid moment on a porch — dog photography NJ — Davidsons Lens' },
  { src: '/assets/pets/brindle-dog-portrait-nj.jpg', alt: 'Brindle dog portrait — pet photography in New Jersey — Davidsons Lens' },
  { src: '/assets/pets/yellow-lab-relaxing-porch-nj.jpg', alt: 'Yellow Labrador relaxing on a porch — lifestyle pet photography NJ — Davidsons Lens' },
  { src: '/assets/pets/dramatic-labrador-portrait-nj.jpg', alt: 'Dramatic Labrador close-up portrait — pet photography in New Jersey — Davidsons Lens' },
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
