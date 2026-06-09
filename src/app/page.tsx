import type { Metadata } from 'next'
import { motion } from 'framer-motion'
import HeroGallery from '@/components/HeroGallery'
import CTAButton from '@/components/CTAButton'
import HomepageClient from '@/components/HomepageClient'

export const metadata: Metadata = {
  title: 'Davidsons Lens | Photo, Video & Creative Media — Bernardsville, NJ',
  description:
    'Davidsons Lens is a full-service creative media company based in Bernardsville, NJ. Photography, video, social media for musicians, athletes, small businesses, and individuals across northern New Jersey.',
}

// Homepage hero rotation — the brand's strongest work, in hierarchy order.
// `position` tunes the object-cover focal point so the subject survives the
// tall mobile crop (and the wide desktop crop). Default is center.
const heroImages: { src: string; alt: string; position?: string }[] = [
  {
    src: '/assets/portraits/water-portrait-bernardsville-nj.jpg',
    alt: 'Cinematic waterside portrait photography — Davidsons Lens, Bernardsville NJ',
    position: 'center 35%',
  },
  {
    src: '/assets/music/cinematic-live-music-photography-nj.jpg',
    alt: 'Cinematic live music photography — Davidsons Lens, New Jersey',
    position: '30% center',
  },
  {
    src: '/assets/pets/dramatic-labrador-portrait-nj.jpg',
    alt: 'Dramatic Labrador portrait — pet photography, Davidsons Lens, New Jersey',
    position: 'center 40%',
  },
  {
    src: '/assets/sports/nj-cyclones-basketball-game-02.jpg',
    alt: 'NJ Cyclones youth basketball action — sports photography, Davidsons Lens',
    position: 'center 30%',
  },
  {
    src: '/assets/business/sobol-acai-bowls-spread-nj.jpg',
    alt: 'SoBol acai bowls — food and brand photography, Davidsons Lens, New Jersey',
    position: 'center',
  },
]

export default function HomePage() {
  return (
    <HomepageClient images={heroImages} />
  )
}
