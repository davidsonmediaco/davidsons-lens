import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'
import GalleryGrid from '@/components/GalleryGrid'
import ScrollReveal from '@/components/ScrollReveal'
import PageTransition from '@/components/PageTransition'

export const metadata: Metadata = {
  title: 'Photo',
  description:
    'Photography portfolio by Davidsons Lens — portraits, music, sports, pets, and business photography across northern New Jersey.',
}

const categories = [
  { href: '/photo/portraits', label: 'Portraits', description: 'People, musicians, creatives' },
  { href: '/photo/music', label: 'Music', description: 'Artists, live performance, press' },
  { href: '/photo/sports', label: 'Sports', description: 'Baseball, basketball, teams' },
  { href: '/photo/pets', label: 'Pets', description: 'Dogs, cats, the real personality' },
  { href: '/photo/business', label: 'Business', description: 'Brands, spaces, products' },
]

const highlightImages: { src: string; alt: string; href: string }[] = [
  { src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80', alt: 'Portrait', href: '/photo/portraits' },
  { src: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80', alt: 'Music', href: '/photo/music' },
  { src: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80', alt: 'Sports', href: '/photo/sports' },
  { src: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=800&q=80', alt: 'Pets', href: '/photo/pets' },
  { src: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=800&q=80', alt: 'Business', href: '/photo/business' },
  { src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80', alt: 'Portrait session', href: '/photo/portraits' },
]

export default function PhotoPage() {
  return (
    <PageTransition>
      <div className="pt-[72px] bg-[#0D0D0D] min-h-screen">
        {/* Header */}
        <ScrollReveal>
          <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
            <h1
              className="text-5xl md:text-7xl text-white mb-4"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Photo
            </h1>
            <div className="w-12 h-px bg-[#C9A84C] mb-8" />
            <p
              className="text-[#A0A0A0] text-lg max-w-xl"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              A full range of photography services across northern New Jersey.
            </p>
          </div>
        </ScrollReveal>

        {/* Sub-navigation */}
        <ScrollReveal delay={0.1}>
          <nav className="max-w-7xl mx-auto px-6 pb-16">
            <div className="flex flex-wrap gap-3">
              {categories.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="px-6 py-2.5 border border-white/10 text-xs tracking-[0.2em] uppercase text-[#F5F5F5] hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all duration-300"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </nav>
        </ScrollReveal>

        {/* Category cards */}
        <ScrollReveal delay={0.15}>
          <div className="max-w-7xl mx-auto px-6 pb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
              {categories.map(({ href, label, description }) => (
                <Link
                  key={href}
                  href={href}
                  className="bg-[#0D0D0D] p-8 group hover:bg-[#1A1A1A] transition-colors duration-300"
                >
                  <h2
                    className="text-2xl text-white group-hover:text-[#C9A84C] transition-colors duration-300 mb-3"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {label}
                  </h2>
                  <p
                    className="text-sm text-[#A0A0A0]"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {description}
                  </p>
                  <span className="block mt-6 text-xs tracking-[0.2em] uppercase text-[#C9A84C] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View Gallery →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Highlight gallery */}
        {highlightImages.length > 0 && (
          <ScrollReveal delay={0.2}>
            <div className="max-w-7xl mx-auto px-6 pb-20">
              <h2
                className="text-2xl text-white mb-8"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Highlights
              </h2>
              <GalleryGrid images={highlightImages} masonry />
            </div>
          </ScrollReveal>
        )}

        <Footer />
      </div>
    </PageTransition>
  )
}
