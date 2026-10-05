// Portfolio categories shared by the homepage grid and the /photo index.
// Order matters: Dogs leads because it is the owner's flagship subject.
// `position` tunes the object-cover focal point so the subject survives both
// the wide desktop crop and the tall mobile crop.

export interface PhotoCategory {
  href: string
  label: string
  description: string
  image: string
  alt: string
  position: string
}

export const categories: PhotoCategory[] = [
  {
    href: '/photo/dogs',
    label: 'Dogs',
    description: 'Big personalities, real moments',
    image: '/assets/dogs/happy-yellow-lab-portrait-nj.jpg',
    alt: 'Happy yellow Labrador portrait — dog photography, Davidsons Lens, New Jersey',
    position: 'center 40%',
  },
  {
    href: '/photo/portraits',
    label: 'Portraits',
    description: 'People, musicians, creatives',
    image: '/assets/portraits/water-portrait-bernardsville-nj.jpg',
    alt: 'Cinematic waterside portrait — Davidsons Lens, Bernardsville NJ',
    position: 'center 35%',
  },
  {
    href: '/photo/music',
    label: 'Music',
    description: 'Artists, live performance, press',
    image: '/assets/music/cinematic-live-music-photography-nj.jpg',
    alt: 'Cinematic live music photography — Davidsons Lens, New Jersey',
    position: '30% center',
  },
  {
    href: '/photo/business',
    label: 'Business',
    description: 'Brands, spaces, products',
    image: '/assets/business/sobol-acai-bowls-spread-nj.jpg',
    alt: 'SoBol acai bowls — food and brand photography, Davidsons Lens, New Jersey',
    position: 'center',
  },
]
