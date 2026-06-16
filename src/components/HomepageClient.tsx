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

        {/* Instagram */}
        <motion.a
          href="https://instagram.com/davidsonslens_"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow Davidsons Lens on Instagram"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 1.1 }}
          className="mt-10 text-[#F5F5F5] hover:text-[#C9A84C] transition-colors duration-300"
        >
          <svg
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        </motion.a>
      </div>
    </div>
  )
}
