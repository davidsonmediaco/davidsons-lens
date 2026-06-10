import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Footer from '@/components/Footer'
import ScrollReveal from '@/components/ScrollReveal'
import PageTransition from '@/components/PageTransition'

export const metadata: Metadata = {
  title: 'Photo',
  description:
    'Photography portfolio by Davidsons Lens — portraits, music, sports, pets, business, and behind-the-scenes photography across northern New Jersey.',
}

const categories = [
  {
    href: '/photo/portraits',
    label: 'Portraits',
    description: 'People, musicians, creatives',
    image: '/assets/portraits/water-portrait-bernardsville-nj.jpg',
    position: 'center 35%',
  },
  {
    href: '/photo/music',
    label: 'Music',
    description: 'Artists, live performance, press',
    image: '/assets/music/cinematic-live-music-photography-nj.jpg',
    position: '30% center',
  },
  {
    href: '/photo/sports',
    label: 'Sports',
    description: 'Baseball, basketball, teams',
    image: '/assets/sports/nj-cyclones-basketball-game-02.jpg',
    position: 'center 25%',
  },
  {
    href: '/photo/pets',
    label: 'Pets',
    description: 'Dogs, cats, the real personality',
    image: '/assets/pets/dramatic-labrador-portrait-nj.jpg',
    position: 'center 40%',
  },
  {
    href: '/photo/business',
    label: 'Business',
    description: 'Brands, spaces, products',
    image: '/assets/business/sobol-acai-bowls-spread-nj.jpg',
    position: 'center',
  },
  {
    href: '/photo/behind-the-scenes',
    label: 'Behind the Scenes',
    description: 'On set, in the moment',
    image: '/assets/behind-the-scenes/behind-the-scenes-on-set-nj-05.jpg',
    position: 'center 30%',
  },
]

export default function PhotoPage() {
  return (
    <PageTransition>
      <div className="pt-[72px] bg-[#0D0D0D] min-h-screen">
        {/* Header */}
        <ScrollReveal>
          <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
            <h1
              className="text-5xl md:text-7xl text-white mb-4"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Photo
            </h1>
            <div className="w-12 h-px bg-[#C9A84C] mb-8" />
            <p
              className="text-[#F5F5F5] text-lg max-w-xl"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              A full range of photography services across northern New Jersey. Pick a world below.
            </p>
          </div>
        </ScrollReveal>

        {/* Category image tiles */}
        <ScrollReveal delay={0.1}>
          <div className="max-w-7xl mx-auto px-6 pb-24">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map(({ href, label, description, image, position }, i) => (
                <Link
                  key={href}
                  href={href}
                  className="group relative aspect-[4/5] overflow-hidden bg-[#1A1A1A]"
                >
                  <Image
                    src={image}
                    alt={`${label} photography — Davidsons Lens`}
                    fill
                    priority={i < 3}
                    className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                    style={{ objectPosition: position }}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Gradient for legibility + subtle darken-on-hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10 transition-opacity duration-500 group-hover:from-black/90" />
                  {/* Label block */}
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h2
                      className="text-2xl md:text-3xl text-white transition-colors duration-300 group-hover:text-[#C9A84C]"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {label}
                    </h2>
                    <p
                      className="text-sm text-[#F5F5F5] mt-1"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {description}
                    </p>
                    <span className="inline-block mt-3 text-xs tracking-[0.2em] uppercase text-[#C9A84C] opacity-0 -translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                      View Gallery →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <Footer />
      </div>
    </PageTransition>
  )
}
