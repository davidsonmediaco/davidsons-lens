'use client'

import { motion } from 'framer-motion'
import HeroGallery from '@/components/HeroGallery'
import CTAButton from '@/components/CTAButton'

interface HeroImage {
  src: string
  alt: string
}

export default function HomepageClient({ images }: { images: HeroImage[] }) {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background gallery or gradient fallback */}
      <HeroGallery images={images} interval={5000} />

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

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="text-xs md:text-sm tracking-[0.35em] uppercase text-[#C9A84C] mb-14"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Photo&nbsp;&nbsp;|&nbsp;&nbsp;Video&nbsp;&nbsp;|&nbsp;&nbsp;Creative Services
        </motion.p>

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
