import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'
import GalleryGrid from '@/components/GalleryGrid'
import CTAButton from '@/components/CTAButton'
import ScrollReveal from '@/components/ScrollReveal'
import PageTransition from '@/components/PageTransition'

interface GallerySubPageProps {
  category: string
  heroImage?: { src: string; alt: string }
  description: string
  aboutBlurb: string
  images: { src: string; alt: string }[]
}

export default function GallerySubPage({
  category,
  heroImage,
  description,
  aboutBlurb,
  images,
}: GallerySubPageProps) {
  return (
    <PageTransition>
      {/* Hero image */}
      <div className="relative w-full h-[55vh] md:h-[70vh] mt-[72px]">
        {heroImage ? (
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-b from-[#1A1A1A] to-[#0D0D0D]" />
        )}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-end pb-12 px-6 md:px-16">
          <h1
            className="text-5xl md:text-7xl text-white tracking-wide"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {category}
          </h1>
        </div>
      </div>

      <div className="bg-[#0D0D0D]">
        {/* Description */}
        <ScrollReveal>
          <div className="max-w-3xl mx-auto px-6 py-16 md:py-20">
            <div className="w-12 h-px bg-[#C9A84C] mb-8" />
            <p
              className="text-[#F5F5F5] text-lg md:text-xl leading-relaxed whitespace-pre-line"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {description}
            </p>
          </div>
        </ScrollReveal>

        {/* Gallery */}
        <ScrollReveal delay={0.1}>
          <div className="px-4 md:px-8 pb-16">
            <GalleryGrid images={images} masonry />
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal delay={0.2}>
          <div className="flex justify-center py-16">
            <CTAButton />
          </div>
        </ScrollReveal>

        {/* About blurb */}
        <ScrollReveal delay={0.1}>
          <div className="max-w-2xl mx-auto px-6 py-12 border-t border-white/5 text-center">
            <p
              className="text-[#A0A0A0] text-sm leading-relaxed"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {aboutBlurb}
            </p>
          </div>
        </ScrollReveal>

        <Footer />
      </div>
    </PageTransition>
  )
}
