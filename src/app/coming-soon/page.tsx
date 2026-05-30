import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Coming Soon',
  description: 'Davidsons Lens is being rebuilt. New galleries and work coming soon.',
  robots: { index: false, follow: false },
}

export default function ComingSoonPage() {
  return (
    <main
      className="min-h-screen bg-[#0D0D0D] flex items-center justify-center px-6 py-16"
      style={{ fontFamily: 'var(--font-body)' }}
    >
      <div className="w-full max-w-xl text-center">
        {/* Wordmark */}
        <p
          className="text-xs tracking-[0.35em] uppercase text-[#C9A84C] mb-10"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Davidsons Lens
        </p>

        {/* Headline */}
        <h1
          className="text-4xl md:text-5xl text-white leading-tight mb-8"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          This site is being rebuilt.
        </h1>

        <div className="w-12 h-px bg-[#C9A84C] mx-auto mb-8" />

        {/* Body */}
        <p className="text-[#F5F5F5] text-lg leading-relaxed mb-6">
          New galleries, new work, things I&apos;ve been shooting that haven&apos;t had a home yet.
          Photos, video, all of it. I&apos;m putting it together piece by piece because I want to
          get it right.
        </p>

        <p className="text-[#A0A0A0] text-base leading-relaxed mb-12">
          It&apos;ll be live soon. Until then the work keeps going. Find me on Instagram{' '}
          <a
            href="https://instagram.com/davidsonslens"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#C9A84C] hover:text-[#DFC070] transition-colors duration-300"
          >
            @davidsonslens
          </a>
          , or reach out at{' '}
          <a
            href="mailto:davidsonmediaco@gmail.com"
            className="text-[#C9A84C] hover:text-[#DFC070] transition-colors duration-300"
          >
            davidsonmediaco@gmail.com
          </a>{' '}
          if you need something now.
        </p>

        {/* Sign-off */}
        <p
          className="text-xl text-white"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Davidsons Lens
        </p>
      </div>
    </main>
  )
}
