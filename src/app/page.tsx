import type { Metadata } from 'next'
import HomeHeader from '@/components/HomeHeader'
import HeroGallery from '@/components/HeroGallery'
import SelectedWork from '@/components/SelectedWork'
import CTAButton from '@/components/CTAButton'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Davidsons Lens | Photo, Video & Creative Media — Bernardsville, NJ',
  description:
    'Photographer and videographer in Bernardsville, NJ. Portraits, dog photography, music, and small-business photo and video across northern New Jersey.',
}

// Homepage hero rotation — the brand's strongest work, in hierarchy order.
// `position` tunes the object-cover focal point. The hero box is tall on phones
// (~2:3, so the horizontal value matters) and wide on desktop (~2.2:1, so the
// vertical value matters); check both when changing a photo. Default is center.
// The portfolio below the hero is edited in src/lib/selected-work.ts.
const heroImages: { src: string; alt: string; position?: string }[] = [
  {
    src: '/assets/portraits/water-portrait-bernardsville-nj.jpg',
    alt: 'Cinematic waterside portrait photography — Davidsons Lens, Bernardsville NJ',
    position: 'center 30%',
  },
  {
    src: '/assets/music/cinematic-live-music-photography-nj.jpg',
    alt: 'Cinematic live music photography — Davidsons Lens, New Jersey',
    position: '30% 40%',
  },
  {
    src: '/assets/dogs/dramatic-labrador-portrait-nj.jpg',
    alt: 'Dramatic Labrador portrait — dog photography, Davidsons Lens, New Jersey',
    position: '75% 22%',
  },
  {
    src: '/assets/business/sobol-acai-bowls-spread-nj.jpg',
    alt: 'SoBol acai bowls — food and brand photography, Davidsons Lens, New Jersey',
    position: 'center 40%',
  },
]

export default function HomePage() {
  return (
    <>
      {/* Opening: compact header, one positioning line, then the photograph — together
          about 76-80% of the visible screen (svh = with mobile browser bars showing), so
          the portfolio starts just below. min-h + flex-1 let short screens or enlarged
          text grow instead of clipping. */}
      <div className="flex flex-col min-h-[76svh] md:min-h-[80svh] bg-[#0D0D0D]">
        <HomeHeader />
        <p
          className="w-full max-w-[1400px] mx-auto px-4 md:px-8 pb-3 md:pb-4 text-sm md:text-base text-[#F5F5F5]"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Photography &amp; film. Northern New Jersey.
        </p>
        {/* Full-bleed on phones; aligned with the portfolio grid on wider screens. */}
        <div className="flex flex-1 min-h-[240px] w-full max-w-[1400px] mx-auto md:px-8">
          <div className="relative flex-1">
            <HeroGallery images={heroImages} interval={8000} />
          </div>
        </div>
      </div>
      <SelectedWork />

      {/* Introduction — text only until a verified portrait of James is available. */}
      <section aria-labelledby="intro-heading" className="bg-[#0D0D0D]">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 pt-20 md:pt-32 grid gap-5 md:grid-cols-12 md:gap-8">
          <h2
            id="intro-heading"
            className="md:col-span-5 text-2xl md:text-3xl leading-snug text-white"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            The person behind the camera
          </h2>
          <p
            className="md:col-span-7 max-w-xl text-base md:text-lg leading-relaxed text-[#F5F5F5]"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            I’m James, the photographer behind Davidsons Lens. Every shoot is different. Who you
            are, what you need, and what you have in mind help shape how I approach it. We’ll talk
            through the details and figure out what works for you. Helping you feel comfortable on
            camera is a big part of that.
          </p>
        </div>
      </section>

      {/* The homepage's one contact invitation (the hero keeps only the nav's Contact link). */}
      <section aria-labelledby="contact-invite-heading" className="bg-[#0D0D0D]">
        <div className="max-w-2xl mx-auto px-6 pt-20 md:pt-32 pb-20 md:pb-28 text-center">
          <h2
            id="contact-invite-heading"
            className="text-2xl md:text-4xl leading-snug text-white"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Let’s talk about the details of your shoot.
          </h2>
          <p
            className="mt-4 text-base md:text-lg text-[#F5F5F5]"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Click below and tell me what you have in mind.
          </p>
          <div className="mt-8 md:mt-10">
            {/* Tighter on phones so the longer label stays on one line from 375px; balanced if it wraps. */}
            <CTAButton
              href="/contact"
              label="Tell me about your shoot"
              className="max-sm:px-6 max-sm:tracking-[0.15em] max-sm:text-balance"
            />
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
