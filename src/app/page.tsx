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
    src: '/assets/dogs/brindle-french-bulldog-walking-toward-camera-nj.jpg',
    alt: 'Brindle French bulldog walking toward the camera with its tongue out — dog photography, Davidsons Lens, New Jersey',
    position: '55% 35%',
  },
  {
    src: '/assets/music/chris-hajian-session-grand-piano-the-bunker-studio-brooklyn.jpg',
    alt: 'Two men working together at a grand piano during a session for jazz composer Chris Hajian at The Bunker Studio, Brooklyn — Davidsons Lens',
    position: '60% 22%',
  },
  {
    src: '/assets/business/sobol-acai-bowls-spread-nj.jpg',
    alt: 'Overhead spread of SoBol acai bowls topped with fruit and coconut — food and brand photography, Davidsons Lens, New Jersey',
    position: 'center 40%',
  },
]

export default function HomePage() {
  return (
    <>
      {/* Opening: one "header section" — the photograph fills the whole block, with the
          compact header (which includes the positioning line) on top of it (a black fade over the top half of the photo,
          strong enough that the gold header text stays readable on bright photos; 15% was tried and was not). The block is about 76-80% of the visible screen
          (svh = with mobile browser bars showing) and has rounded BOTTOM corners
          (owner-requested exception to the sharp-corner rule). The Selected Work bar
          tucks underneath it, so this block must stay above it (z-10). */}
      <div className="relative z-10 flex flex-col min-h-[76svh] md:min-h-[80svh] overflow-hidden rounded-b-[28px] md:rounded-b-[48px] bg-[#0D0D0D]">
        <HeroGallery
          images={heroImages}
          interval={8000}
          overlayClassName="bg-gradient-to-b from-black/80 via-black/60 via-[18%] to-black/0 to-50%"
        />
        <HomeHeader />
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
