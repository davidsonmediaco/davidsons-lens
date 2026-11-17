import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'
import GalleryGrid from '@/components/GalleryGrid'
import CTAButton from '@/components/CTAButton'
import ScrollReveal from '@/components/ScrollReveal'
import PageTransition from '@/components/PageTransition'
import PageTitle from '@/components/PageTitle'
import { categories } from '@/lib/categories'

const SITE = 'https://davidsonslens.com'

interface GallerySubPageProps {
  /** The gallery's address, e.g. '/photo/dogs'. Used for the breadcrumb and the cross-links. */
  path: string
  /** Short gallery name, used in the breadcrumb (e.g. "Dogs"). */
  category: string
  /** Big title over the hero photo, e.g. "Dog Photography". */
  heading: string
  /** Smaller line under it, completing the H1, e.g. "in Bernardsville and northern New Jersey". */
  subheading: string
  heroImage?: { src: string; alt: string }
  description: string
  aboutBlurb: string
  images: { src: string; alt: string }[]
}

const textLink =
  'underline decoration-[#C9A84C]/50 underline-offset-[6px] hover:text-[#C9A84C] hover:decoration-[#C9A84C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C9A84C] transition-colors duration-300'

export default function GallerySubPage({
  path,
  category,
  heading,
  subheading,
  heroImage,
  description,
  aboutBlurb,
  images,
}: GallerySubPageProps) {
  const otherGalleries = categories.filter(c => c.href !== path)

  // Breadcrumb trail for search engines; it mirrors the visible trail below the hero.
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
      { '@type': 'ListItem', position: 2, name: 'Photo', item: `${SITE}/photo` },
      { '@type': 'ListItem', position: 3, name: category, item: `${SITE}${path}` },
    ],
  }

  return (
    <PageTransition>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, '\\u003c'),
        }}
      />

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
          <PageTitle
            className="text-4xl sm:text-5xl md:text-7xl tracking-wide"
            title={heading}
            subtitle={subheading}
          />
        </div>
      </div>

      <div className="bg-[#0D0D0D]">
        {/* Breadcrumb + description */}
        <ScrollReveal>
          <div className="max-w-3xl mx-auto px-6 py-16 md:py-20">
            <nav
              aria-label="Breadcrumb"
              className="mb-8 text-xs tracking-[0.2em] uppercase"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              <ol className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <li>
                  <Link href="/" className={`inline-block py-2 -my-2 text-[#F5F5F5] ${textLink}`}>
                    Home
                  </Link>
                </li>
                <li aria-hidden="true" className="text-[#A0A0A0]">
                  /
                </li>
                <li>
                  <Link href="/photo" className={`inline-block py-2 -my-2 text-[#F5F5F5] ${textLink}`}>
                    Photo
                  </Link>
                </li>
                <li aria-hidden="true" className="text-[#A0A0A0]">
                  /
                </li>
                <li aria-current="page" className="text-[#A0A0A0]">
                  {category}
                </li>
              </ol>
            </nav>
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

        {/* Links to the other galleries, so every gallery leads to the rest. */}
        <ScrollReveal delay={0.1}>
          <nav
            aria-label="More galleries"
            className="max-w-3xl mx-auto px-6 pt-4 pb-16 text-center"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            <p className="text-xs tracking-[0.3em] uppercase text-[#C9A84C] mb-3">More galleries</p>
            <ul className="flex flex-wrap justify-center gap-x-8 md:gap-x-12">
              {otherGalleries.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={`inline-block py-3 text-xs md:text-sm tracking-[0.2em] uppercase text-[#F5F5F5] ${textLink}`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
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
