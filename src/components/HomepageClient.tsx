'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import HeroGallery from '@/components/HeroGallery'
import CTAButton from '@/components/CTAButton'

const heroNav = [
  ['/photo', 'Photo'],
  ['/video', 'Video'],
  ['/creative-services', 'Creative Services'],
  ['/contact', 'Contact'],
] as const

interface HeroImage {
  src: string
  alt: string
}

export default function HomepageClient({ images }: { images: HeroImage[] }) {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background gallery or gradient fallback */}
      <HeroGallery images={images} interval={8000} />

      {/* Content overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
        {/* Wordmark */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl text-white tracking-[0.3em] uppercase mb-2"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Davidsons Lens
        </motion.h1>

        {/* Primary navigation — directly beneath the wordmark, this is the homepage nav */}
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 mt-6 mb-12"
        >
          {heroNav.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className="text-sm tracking-[0.2em] uppercase text-[#C9A84C] hover:text-[#DFC070] transition-colors duration-300"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {label}
            </Link>
          ))}
        </motion.nav>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9 }}
        >
          <CTAButton href="/contact" label="Let's Work Together" />
        </motion.div>
      </div>
    </div>
  )
}
