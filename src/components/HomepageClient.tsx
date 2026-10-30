'use client'

import Link from 'next/link'
import { motion, MotionConfig } from 'framer-motion'
import HeroGallery from '@/components/HeroGallery'
import SocialLinks from '@/components/SocialLinks'

const heroNav = [
  ['/photo', 'Photo'],
  ['/video', 'Video'],
  ['/creative-services', 'Creative Services'],
  ['/contact', 'Contact'],
] as const

interface HeroImage {
  src: string
  alt: string
  position?: string
}

export default function HomepageClient({ images }: { images: HeroImage[] }) {
  return (
    // reducedMotion="user": entrance animations are skipped for visitors who ask for less motion.
    <MotionConfig reducedMotion="user">
      {/* One screen tall. `svh` = the visible height with mobile browser bars showing, so the
          portfolio starts right after it; min-h lets very short screens grow instead of clipping. */}
      <section className="relative min-h-[100svh] w-full overflow-hidden flex flex-col">
        {/* Background gallery or gradient fallback */}
        <HeroGallery images={images} interval={8000} />

        {/* Content overlay */}
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pt-16 pb-6 text-center">
          {/* Wordmark */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl text-white tracking-[0.3em] uppercase"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Davidsons Lens
          </motion.h1>

          {/* Positioning line — secondary to the wordmark. A soft text shadow (not a box)
              keeps it readable over the brightest areas of every rotating photo. */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="mt-5 md:mt-6 max-w-xl text-[15px] md:text-lg leading-relaxed text-[#F5F5F5] [text-shadow:0_1px_14px_rgba(0,0,0,0.65)]"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Photography and video in Northern New Jersey for people, artists, and businesses.
            Helping you feel comfortable on camera, so we can create something that feels like you.
          </motion.p>

          {/* Primary navigation — directly beneath the wordmark, this is the homepage nav */}
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-3 mt-8 md:mt-10"
          >
            {heroNav.map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className="border border-[#C9A84C]/60 px-5 py-2.5 text-xs tracking-[0.2em] uppercase text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0D0D0D] transition-all duration-300"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {label}
              </Link>
            ))}
          </motion.nav>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.8 }}
            className="mt-8 md:mt-10"
          >
            <SocialLinks className="text-[#F5F5F5]" />
          </motion.div>
        </div>

        {/* Scroll cue — in normal flow below the content, so it can never overlap the
            hero controls. No animation; smooth scrolling is disabled for reduced motion
            in globals.css. */}
        <div className="relative z-10 flex justify-center pb-6 md:pb-8">
          <a
            href="#selected-work"
            className="group inline-flex flex-col items-center gap-2 px-4 py-2 text-[11px] tracking-[0.25em] uppercase text-[#F5F5F5]/80 hover:text-[#C9A84C] focus-visible:text-[#C9A84C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A84C] transition-colors duration-300"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Explore the work
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </a>
        </div>
      </section>
    </MotionConfig>
  )
}
