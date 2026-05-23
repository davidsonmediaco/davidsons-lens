'use client'

import Link from 'next/link'
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

        {/* Nav links */}
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="hidden md:flex items-center gap-12 mb-14"
        >
          {[
            ['/photo', 'Photo'],
            ['/video', 'Video'],
            ['/creative-services', 'Creative Services'],
            ['/contact', 'Contact'],
          ].map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className="text-sm tracking-[0.2em] uppercase text-[#F5F5F5] hover:text-[#C9A84C] transition-colors duration-300"
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
