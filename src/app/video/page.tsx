import type { Metadata } from 'next'
import Footer from '@/components/Footer'
import CTAButton from '@/components/CTAButton'
import ScrollReveal from '@/components/ScrollReveal'
import PageTransition from '@/components/PageTransition'

export const metadata: Metadata = {
  title: 'Video',
  description:
    'Video production in Bernardsville, NJ. Music videos, UGC, branding content, fitness content and short form social video for musicians, businesses and creators across northern New Jersey.',
}

const YOUTUBE_CHANNEL = 'https://www.youtube.com/@davidsonslens'
const FEATURED_VIDEO_ID = 'lQYogZoeweA'

export default function VideoPage() {
  return (
    <PageTransition>
      {/* Featured music video */}
      <section className="pt-[96px] md:pt-[120px] pb-4 bg-[#0D0D0D]">
        <div className="max-w-5xl mx-auto px-6">
          <p
            className="text-xs tracking-[0.3em] uppercase text-[#C9A84C] mb-6 text-center"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Featured Music Video
          </p>
          <div className="relative aspect-video w-full overflow-hidden bg-black shadow-2xl ring-1 ring-white/10">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${FEATURED_VIDEO_ID}?rel=0`}
              title="Featured music video — Davidsons Lens"
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />
          </div>
          <div className="flex justify-center mt-8">
            <a
              href={YOUTUBE_CHANNEL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-[#C9A84C] text-[#C9A84C] px-8 py-4 text-sm tracking-[0.2em] uppercase transition-colors duration-300 hover:bg-[#C9A84C] hover:text-[#0D0D0D]"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Watch more on YouTube
            </a>
          </div>
        </div>
      </section>

      <div className="bg-[#0D0D0D]">
        {/* Copy section */}
        <ScrollReveal>
          <div className="max-w-3xl mx-auto px-6 py-20 md:py-28">
            <div className="w-12 h-px bg-[#C9A84C] mb-10" />
            <h1
              className="text-4xl md:text-5xl text-white mb-8"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Video
            </h1>
            <div
              className="text-[#F5F5F5] text-lg leading-relaxed space-y-6"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              <p>
                Video is where personality lives. A photo stops time. Video lets people in.
              </p>
              <p>
                For businesses it&apos;s the faces behind the counter, the energy of the space, the
                people that make customers want to come back. For musicians it&apos;s the visual that
                lives alongside the music and tells the story the song started. For brands and
                creators it&apos;s the content that makes someone stop scrolling and actually pay
                attention.
              </p>
              <p>
                I shoot music videos, short form social content, UGC, branding content, and fitness
                content. Full production or built for the scroll. Whatever the goal is, the approach
                is the same. Make it feel real, make it look good, and make sure it works for the
                people watching it.
              </p>
              <p>
                Based in Bernardsville, NJ working with musicians, businesses, brands, and creators
                across northern New Jersey and beyond.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Services list */}
        <ScrollReveal delay={0.1}>
          <div className="max-w-3xl mx-auto px-6 pb-16">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                'Music Videos',
                'Short Form Social',
                'UGC Content',
                'Branding Content',
                'Fitness Content',
                'Full Production',
              ].map(service => (
                <div
                  key={service}
                  className="border border-white/10 px-5 py-4 text-sm text-[#A0A0A0] tracking-wide"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {service}
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal delay={0.2}>
          <div className="flex justify-center py-16">
            <CTAButton />
          </div>
        </ScrollReveal>

        <Footer />
      </div>
    </PageTransition>
  )
}
