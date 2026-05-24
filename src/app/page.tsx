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

// Images sourced from /assets/homepage/
// Add your images here as they are placed in public/assets/homepage/
const heroImages: { src: string; alt: string }[] = [
  {
    src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=1920&q=80',
    alt: 'Portrait photography — Davidsons Lens, Bernardsville NJ',
  },
  {
    src: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&w=1920&q=80',
    alt: 'Live music photography — Davidsons Lens, Bernardsville NJ',
  },
  {
    src: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1920&q=80',
    alt: 'Sports photography — Davidsons Lens, Bernardsville NJ',
  },
  {
    src: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1920&q=80',
    alt: 'Pet photography — Davidsons Lens, Bernardsville NJ',
  },
  {
    src: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1920&q=80',
    alt: 'Business photography — Davidsons Lens, Bernardsville NJ',
  },
]

export default function HomePage() {
  return (
    <HomepageClient images={heroImages} />
  )
}
