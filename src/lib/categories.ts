// Portfolio categories for the /photo index cards.
// Order is owner-specified (2026-11-11): Portraits, Music, Business, Dogs.
// `position` tunes the object-cover focal point so the subject survives both
// the wide desktop crop and the tall mobile crop.

export interface PhotoCategory {
  href: string
  label: string
  /** Who the gallery is for (owner-supplied copy; do not reword without approval). */
  audience: string
  /** What is offered (owner-supplied copy; do not reword without approval). */
  description: string
  image: string
  alt: string
  position: string
}

export const categories: PhotoCategory[] = [
  {
    href: '/photo/portraits',
    label: 'Portraits',
    audience: 'For individuals.',
    description: 'Headshots and personal portraits.',
    image: '/assets/portraits/water-portrait-bernardsville-nj.jpg',
    alt: 'Cinematic waterside portrait — Davidsons Lens, Bernardsville NJ',
    position: 'center 35%',
  },
  {
    href: '/photo/music',
    label: 'Music',
    audience: 'For bands and artists.',
    description: 'Live, studio, and press.',
    image: '/assets/music/cinematic-live-music-photography-nj.jpg',
    alt: 'Cinematic live music photography — Davidsons Lens, New Jersey',
    position: '30% center',
  },
  {
    href: '/photo/business',
    label: 'Business',
    audience: 'For food and drink businesses.',
    description: 'Cafes, bakeries, and product.',
    image: '/assets/business/sobol-acai-bowls-spread-nj.jpg',
    alt: 'SoBol acai bowls — food and brand photography, Davidsons Lens, New Jersey',
    position: 'center',
  },
  {
    href: '/photo/dogs',
    label: 'Dogs',
    audience: 'For dog owners.',
    description: 'Personality-led portraits.',
    image: '/assets/dogs/happy-yellow-lab-portrait-nj.jpg',
    alt: 'Happy yellow Labrador portrait — dog photography, Davidsons Lens, New Jersey',
    position: 'center 40%',
  },
]
