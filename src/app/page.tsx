import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import HeroGallery from '@/components/HeroGallery'
import CTAButton from '@/components/CTAButton'
import ScrollReveal from '@/components/ScrollReveal'
import SocialLinks from '@/components/SocialLinks'
import Footer from '@/components/Footer'
import { categories } from '@/lib/categories'

export const metadata: Metadata = {
  title: 'Davidsons Lens | Photo, Video & Creative Media — Bernardsville, NJ',
  description:
    'Photographer and videographer in Bernardsville, NJ. Portraits, dog photography, music, and small-business photo and video across northern New Jersey.',
}

// Hero rotation — kept short (3 frames) so the first impression stays focused.
const heroImages: { src: string; alt: string; position?: string }[] = [
  {
    src: '/assets/portraits/water-portrait-bernardsville-nj.jpg',
    alt: 'Cinematic waterside portrait photography — Davidsons Lens, Bernardsville NJ',
    position: 'center 35%',
  },
  {
    src: '/assets/dogs/happy-yellow-lab-portrait-nj.jpg',
    alt: 'Happy yellow Labrador portrait — dog photography, Davidsons Lens, New Jersey',
    position: 'center 45%',
  },
  {
    src: '/assets/music/cinematic-live-music-photography-nj.jpg',
    alt: 'Cinematic live music photography — Davidsons Lens, New Jersey',
    position: '30% center',
  },
]

const dogShots = [
  {
    src: '/assets/dogs/labradors-running-beach-nj.jpg',
    alt: 'Two Labradors running on the beach — dog photography, New Jersey',
  },
  {
    src: '/assets/dogs/pet-photography-puppy-bond-nj.jpg',
    alt: 'Owner nose-to-nose with a Labrador puppy — dog photography, New Jersey',
  },
  {
    src: '/assets/dogs/yellow-lab-puppy-portrait-nj.jpg',
    alt: 'Yellow Labrador puppy portrait outdoors — dog photography, New Jersey',
  },
]

const eyebrow = 'text-xs tracking-[0.3em] uppercase text-[#C9A84C]'
const display = { fontFamily: 'var(--font-display)' } as const
const body = { fontFamily: 'var(--font-body)' } as const

export default function HomePage() {
  return (
    <>
      {/* 1. Hero — one message, one primary action */}
      <section className="relative min-h-[100svh] w-full overflow-hidden flex items-end">
        <HeroGallery
          images={heroImages}
          interval={8000}
          overlayClassName="bg-gradient-to-t from-black/85 via-black/25 to-black/30"
        />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-36 pb-16 md:pb-24">
          <p className={`${eyebrow} mb-6`} style={body}>
            Photo &amp; Video &middot; Bernardsville, NJ
          </p>
          <h1
            className="text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05] max-w-2xl"
            style={display}
          >
            Photos that make you feel like yourself.
          </h1>
          <p
            className="text-[#F5F5F5] text-lg md:text-xl leading-relaxed max-w-xl mt-8"
            style={body}
          >
            Portraits, dogs, music, and small-business photo and video across northern New
            Jersey.
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-10">
            <CTAButton href="/contact" label="Book a Shoot" />
            <a
              href="#work"
              className="text-sm tracking-[0.25em] uppercase text-[#F5F5F5] hover:text-[#C9A84C] transition-colors duration-300 px-2 py-4 border-b border-white/30 hover:border-[#C9A84C]"
              style={body}
            >
              See the work
            </a>
          </div>
        </div>
      </section>

      {/* 2. Portfolio grid — every category visible at once */}
      <section id="work" className="bg-[#0D0D0D] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
          <ScrollReveal>
            <p className={`${eyebrow} mb-4`} style={body}>
              The Work
            </p>
            <h2 className="text-3xl md:text-5xl text-white mb-12" style={display}>
              Pick a world.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[190px] md:auto-rows-[280px]">
              {categories.map(({ href, label, description, image, alt, position }, i) => {
                const isDogs = i === 0
                const isBusiness = label === 'Business'
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`group relative overflow-hidden bg-[#1A1A1A] ${
                      isDogs ? 'col-span-2 row-span-2' : isBusiness ? 'col-span-2' : ''
                    }`}
                  >
                    <Image
                      src={image}
                      alt={alt}
                      fill
                      className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                      style={{ objectPosition: position }}
                      sizes={isDogs || isBusiness ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 50vw, 25vw'}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                      <h3
                        className={`${isDogs ? 'text-3xl md:text-5xl' : 'text-2xl md:text-3xl'} text-white transition-colors duration-300 group-hover:text-[#C9A84C]`}
                        style={display}
                      >
                        {label}
                      </h3>
                      <p className="text-sm text-[#F5F5F5] mt-1" style={body}>
                        {description}
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. Dogs feature — the flagship story */}
      <section className="bg-[#0D0D0D] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
            <ScrollReveal className="lg:col-span-2">
              <p className={`${eyebrow} mb-4`} style={body}>
                Dogs
              </p>
              <h2 className="text-3xl md:text-5xl text-white mb-6" style={display}>
                My favorite thing to photograph.
              </h2>
              <div className="w-12 h-px bg-[#C9A84C] mb-8" />
              <p
                className="text-[#F5F5F5] text-lg leading-relaxed mb-10 max-w-md"
                style={body}
              >
                Dogs are where I started. My first dog, Charlie, taught me patience, timing, and
                how to get a dog to look right down the lens. Every dog has a personality. I&apos;m
                there to catch yours.
              </p>
              <div className="flex flex-wrap gap-4">
                <CTAButton href="/photo/dogs" label="See Dog Photos" />
                <CTAButton href="/contact" label="Book a Dog Session" />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1} className="lg:col-span-3">
              <div className="grid grid-cols-3 gap-2 md:gap-3">
                {dogShots.map(({ src, alt }) => (
                  <div key={src} className="relative aspect-[3/4] overflow-hidden bg-[#1A1A1A]">
                    <Image
                      src={src}
                      alt={alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 33vw, 20vw"
                    />
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 4. Video */}
      <section className="bg-[#0D0D0D] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
          <ScrollReveal>
            <Link
              href="/video"
              className="group relative block aspect-[4/3] md:aspect-[21/9] overflow-hidden bg-[#1A1A1A]"
            >
              <Image
                src="/assets/music/guitarist-live-performance-nj.jpg"
                alt="Guitarist performing live — music video production, Davidsons Lens"
                fill
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                sizes="(max-width: 1280px) 100vw, 1200px"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/20" />
              <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-14 max-w-2xl">
                <p className={`${eyebrow} mb-4`} style={body}>
                  Video
                </p>
                <h2 className="text-3xl md:text-5xl text-white mb-4" style={display}>
                  Motion that feels real.
                </h2>
                <p className="text-[#F5F5F5] text-lg leading-relaxed mb-8" style={body}>
                  Music videos, short-form reels, and brand content built to be watched.
                </p>
                <span
                  className="inline-block self-start border border-[#C9A84C] text-[#C9A84C] px-8 py-4 text-sm tracking-[0.25em] uppercase transition-all duration-300 group-hover:bg-[#C9A84C] group-hover:text-[#0D0D0D]"
                  style={body}
                >
                  Watch the Featured Video
                </span>
              </div>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* 5. Services — what it costs and what you get */}
      <section className="bg-[#0D0D0D] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
          <ScrollReveal>
            <p className={`${eyebrow} mb-4`} style={body}>
              Services
            </p>
            <h2 className="text-3xl md:text-5xl text-white mb-12" style={display}>
              Simple to book. Clear about what you get.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ServiceCard
                title="Portraits & Dogs"
                price="From $250"
                items={[
                  '45-minute session, one location',
                  '15 edited images',
                  'Gallery in 3–5 days',
                  'Travel included within 10 miles',
                ]}
                cta="Book a Session"
                href="/contact"
              />
              <ServiceCard
                title="Video"
                price="From $750"
                items={[
                  '2-hour shoot',
                  '3–5 short-form reels, or one long-form video cut into 3–5 reels',
                  'Up to 3 rounds of revisions',
                ]}
                cta="Book Video"
                href="/contact"
              />
              <ServiceCard
                title="Small Business"
                price="Let's talk"
                items={[
                  'One-time shoots and monthly retainers',
                  'Photo, video, and social content',
                  'Built around your brand and your story',
                ]}
                cta="Start a Conversation"
                href="/contact"
              />
            </div>
          </ScrollReveal>
          <p className="text-[#F5F5F5] text-base mt-8" style={body}>
            Need help with your social media?{' '}
            <Link
              href="/creative-services"
              className="text-[#C9A84C] hover:text-[#DFC070] underline underline-offset-4 transition-colors duration-200"
            >
              See consulting and management
            </Link>
          </p>
        </div>
      </section>

      {/* 6. About — short bio (owner-approved wording); long version lives at /about */}
      <section className="bg-[#0D0D0D] border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 py-20 md:py-28">
          <ScrollReveal>
            <p className={`${eyebrow} mb-4`} style={body}>
              About
            </p>
            <h2 className="text-3xl md:text-5xl text-white mb-8" style={display}>
              Hi, I&apos;m James.
            </h2>
            <div className="text-[#F5F5F5] text-lg leading-relaxed space-y-5" style={body}>
              <p>
                I picked up a camera as a kid in New York and never really put it down. Now I&apos;m
                based in Bernardsville, NJ, photographing people, dogs, musicians, and small
                businesses.
              </p>
              <p>
                Being on camera is intimidating. My job is to take that away, so you leave feeling
                more confident than when you walked in, with photos you&apos;re proud of.
              </p>
            </div>
            <Link
              href="/about"
              className="inline-block mt-8 text-[#C9A84C] hover:text-[#DFC070] underline underline-offset-4 transition-colors duration-200 text-sm tracking-[0.2em] uppercase"
              style={body}
            >
              More about me
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* 7. Contact band */}
      <section className="bg-[#0D0D0D] border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 py-20 md:py-28 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-5xl text-white mb-6" style={display}>
              Let&apos;s make something you&apos;re proud of.
            </h2>
            <div className="w-12 h-px bg-[#C9A84C] mx-auto mb-8" />
            <div className="flex justify-center mb-8">
              <CTAButton href="/contact" label="Book a Shoot" />
            </div>
            <a
              href="mailto:davidsonmediaco@gmail.com"
              className="text-[#C9A84C] hover:text-[#DFC070] transition-colors duration-200 text-sm tracking-[0.2em] uppercase"
              style={body}
            >
              davidsonmediaco@gmail.com
            </a>
            <SocialLinks className="justify-center mt-8 text-[#F5F5F5]" />
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </>
  )
}

function ServiceCard({
  title,
  price,
  items,
  cta,
  href,
}: {
  title: string
  price: string
  items: string[]
  cta: string
  href: string
}) {
  return (
    <div className="flex flex-col border border-white/10 bg-[#1A1A1A] p-8">
      <p className={`${eyebrow} mb-3`} style={body}>
        {title}
      </p>
      <p className="text-4xl text-white mb-6" style={display}>
        {price}
      </p>
      <ul className="mb-8 flex-1" style={body}>
        {items.map(item => (
          <li
            key={item}
            className="flex gap-3 py-3 border-b border-white/5 text-[#F5F5F5] text-base"
          >
            <span className="text-[#C9A84C]" aria-hidden="true">
              &mdash;
            </span>
            {item}
          </li>
        ))}
      </ul>
      <CTAButton href={href} label={cta} className="text-center" />
    </div>
  )
}
