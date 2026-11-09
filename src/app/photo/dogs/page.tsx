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
  { src: '/assets/dogs/brindle-french-bulldog-backyard-portrait-nj.jpg', alt: 'Brindle French bulldog standing in a backyard with its tongue out — dog photography NJ — Davidsons Lens' },
  { src: '/assets/dogs/labradors-running-beach-nj.jpg', alt: 'Two Labradors running on the beach — dog photography in New Jersey — Davidsons Lens' },
  { src: '/assets/dogs/brindle-dog-close-up-indoor-portrait-nj.jpg', alt: 'Close-up of a brindle dog with a white chest, indoors on a warm wood floor — dog photography NJ — Davidsons Lens' },
  { src: '/assets/dogs/happy-yellow-lab-portrait-nj.jpg', alt: 'Happy yellow Labrador portrait outdoors — dog photography NJ — Davidsons Lens' },
  { src: '/assets/dogs/brindle-dog-winter-portrait-nj.jpg', alt: 'Brindle dog portrait in the snow — winter dog photography in New Jersey — Davidsons Lens' },
  { src: '/assets/dogs/curly-coated-doodle-patio-portrait-nj.jpg', alt: 'Smiling curly-coated red doodle on a patio — dog photography NJ — Davidsons Lens' },
  { src: '/assets/dogs/yellow-lab-puppy-portrait-nj.jpg', alt: 'Yellow Labrador puppy portrait outdoors — dog photography NJ — Davidsons Lens' },
  { src: '/assets/dogs/brindle-french-bulldog-looking-away-nj.jpg', alt: 'Brindle French bulldog on sandy ground, glancing off to the side — dog photography NJ — Davidsons Lens' },
  { src: '/assets/dogs/labrador-puppy-candid-nj.jpg', alt: 'Labrador puppy candid moment on a porch — dog photography NJ — Davidsons Lens' },
  { src: '/assets/dogs/white-dog-close-up-portrait-nj.jpg', alt: 'White dog with amber eyes walking toward the camera, tongue out — dog photography NJ — Davidsons Lens' },
  { src: '/assets/dogs/brindle-dog-portrait-nj.jpg', alt: 'Brindle dog portrait — dog photography in New Jersey — Davidsons Lens' },
  { src: '/assets/dogs/yellow-lab-relaxing-porch-nj.jpg', alt: 'Yellow Labrador relaxing on a porch — lifestyle dog photography NJ — Davidsons Lens' },
  { src: '/assets/dogs/brindle-dog-amber-background-portrait-nj.jpg', alt: 'Brindle dog with a white chest sitting against a warm amber background — dog photography NJ — Davidsons Lens' },
  { src: '/assets/dogs/dramatic-labrador-portrait-nj.jpg', alt: 'Dramatic Labrador close-up portrait — dog photography in New Jersey — Davidsons Lens' },
  { src: '/assets/dogs/brindle-french-bulldog-walking-toward-camera-nj.jpg', alt: 'Brindle French bulldog walking toward the camera with its tongue out — dog photography NJ — Davidsons Lens' },
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
