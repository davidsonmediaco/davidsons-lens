import type { Metadata } from 'next'
import GallerySubPage from '@/components/GallerySubPage'

export const metadata: Metadata = {
  title: 'Dogs',
  description:
    'Dog photography in Bernardsville, NJ. Capturing the real personality behind every dog. Serving dog owners across Somerset County and northern New Jersey.',
}

const heroImage = {
  src: '/assets/dogs/dramatic-labrador-portrait-nj.jpg',
  alt: 'Dramatic close-up Labrador portrait — dog photography in New Jersey — Davidsons Lens',
}

const images: { src: string; alt: string }[] = [
  { src: '/assets/dogs/pet-photography-puppy-bond-nj.jpg', alt: 'Owner nose-to-nose with a Labrador puppy — dog photography NJ — Davidsons Lens' },
  { src: '/assets/dogs/labradors-running-beach-nj.jpg', alt: 'Two Labradors running on the beach — dog photography in New Jersey — Davidsons Lens' },
  { src: '/assets/dogs/happy-yellow-lab-portrait-nj.jpg', alt: 'Happy yellow Labrador portrait outdoors — dog photography NJ — Davidsons Lens' },
  { src: '/assets/dogs/brindle-dog-winter-portrait-nj.jpg', alt: 'Brindle dog portrait in the snow — winter dog photography in New Jersey — Davidsons Lens' },
  { src: '/assets/dogs/yellow-lab-puppy-portrait-nj.jpg', alt: 'Yellow Labrador puppy portrait outdoors — dog photography NJ — Davidsons Lens' },
  { src: '/assets/dogs/labrador-puppy-candid-nj.jpg', alt: 'Labrador puppy candid moment on a porch — dog photography NJ — Davidsons Lens' },
  { src: '/assets/dogs/brindle-dog-portrait-nj.jpg', alt: 'Brindle dog portrait — dog photography in New Jersey — Davidsons Lens' },
  { src: '/assets/dogs/yellow-lab-relaxing-porch-nj.jpg', alt: 'Yellow Labrador relaxing on a porch — lifestyle dog photography NJ — Davidsons Lens' },
  { src: '/assets/dogs/dramatic-labrador-portrait-nj.jpg', alt: 'Dramatic Labrador close-up portrait — dog photography in New Jersey — Davidsons Lens' },
]

export default function DogsPage() {
  return (
    <GallerySubPage
      category="Dogs"
      heroImage={heroImage}
      description={`Every dog has a personality. The goofy ones, the dramatic ones, the ones who act like they own the room and know it. A perfectly posed photo is nice but it's not what makes your dog yours.

That's what I'm after. The real them. The way they look at you, the way they move, the moment they forget the camera is even there. That's the photo you're going to want on your wall.

Based in Bernardsville, NJ serving dog owners across Somerset County, Morris County, and northern New Jersey.`}
      aboutBlurb="Dog photography in Bernardsville, NJ. Capturing the real personality behind every dog. Serving dog owners across Somerset County and northern New Jersey."
      images={images}
    />
  )
}
