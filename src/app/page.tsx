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
  // { src: '/assets/homepage/hero-1.jpg', alt: 'Portrait session in Bernardsville, New Jersey' },
]

export default function HomePage() {
  return (
    <HomepageClient images={heroImages} />
  )
}
