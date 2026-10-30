import type { Metadata } from 'next'
import HomepageClient from '@/components/HomepageClient'
import SelectedWork from '@/components/SelectedWork'
import CTAButton from '@/components/CTAButton'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Davidsons Lens | Photo, Video & Creative Media — Bernardsville, NJ',
  description:
    'Photographer and videographer in Bernardsville, NJ. Portraits, dog photography, music, and small-business photo and video across northern New Jersey.',
}

// Homepage hero rotation — the brand's strongest work, in hierarchy order.
// `position` tunes the object-cover focal point so the subject survives the
// tall mobile crop (and the wide desktop crop). Default is center.
// The portfolio below the hero is edited in src/lib/selected-work.ts.
const heroImages: { src: string; alt: string; position?: string }[] = [
  {
    src: '/assets/portraits/water-portrait-bernardsville-nj.jpg',
    alt: 'Cinematic waterside portrait photography — Davidsons Lens, Bernardsville NJ',
    position: 'center 35%',
  },
  {
    src: '/assets/music/cinematic-live-music-photography-nj.jpg',
    alt: 'Cinematic live music photography — Davidsons Lens, New Jersey',
    position: '30% center',
  },
  {
    src: '/assets/dogs/dramatic-labrador-portrait-nj.jpg',
    alt: 'Dramatic Labrador portrait — dog photography, Davidsons Lens, New Jersey',
    position: 'center 40%',
  },
  {
    src: '/assets/business/sobol-acai-bowls-spread-nj.jpg',
    alt: 'SoBol acai bowls — food and brand photography, Davidsons Lens, New Jersey',
    position: 'center',
  },
]

export default function HomePage() {
  return (
    <>
      <HomepageClient images={heroImages} />
      <SelectedWork />
      <div className="bg-[#0D0D0D] flex justify-center px-6 py-16 md:py-24">
        <CTAButton href="/contact" label="Let's Work Together" />
      </div>
      <Footer />
    </>
  )
}
