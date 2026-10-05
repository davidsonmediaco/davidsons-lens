import type { Metadata } from 'next'
import Footer from '@/components/Footer'
import CTAButton from '@/components/CTAButton'
import ScrollReveal from '@/components/ScrollReveal'
import PageTransition from '@/components/PageTransition'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Meet the photographer behind Davidsons Lens in Bernardsville, NJ. Portraits, dogs, music, and small-business photo and video, shot to make you feel confident on camera.',
}

export default function AboutPage() {
  return (
    <PageTransition>
      <div className="pt-[72px] bg-[#0D0D0D] min-h-screen">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto px-6 pt-16 pb-24">
            <h1
              className="text-5xl md:text-7xl text-white mb-6"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              About
            </h1>
            <div className="w-12 h-px bg-[#C9A84C] mb-10" />
            <div
              className="text-[#F5F5F5] text-lg leading-relaxed space-y-6"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              <p>
                I started taking photos as a kid in New York. After I moved to New Jersey, the
                camera became how I held on to the moments I never wanted to forget: friends,
                family, the days I wanted to be able to look back on and remember exactly.
              </p>
              <p>
                My first test subject was my dog, Charlie, who got used to modeling for me pretty
                quickly. (I have a lot of photos of him staring straight into the lens.) Then I
                started practicing ideas, angles, and lighting with my best friend Gail. She told
                me she felt more confident in front of my camera, and the more people I shot, the
                more of them said the same. That&apos;s when I understood what a good photo can do.
                It can change how someone sees themselves in an instant. For some people it fixes a
                bad week. For others it&apos;s the first time they see what I see.
              </p>
              <p>
                That&apos;s what I want from every session. Being on camera is hard, and it takes
                guts to be that open in front of someone. My job is to make it easy, so you leave
                happy, proud, and a little more confident, whether the photos are for Instagram,
                your business, your family, or just you.
              </p>
              <p>
                For businesses, I want to tell the real story: the people behind the brand, the
                prep, the big moments. And I help with social media, because people have always
                come to me when they&apos;re trying to figure out how to get where they&apos;re
                going.
              </p>
              <p>
                Let me help you feel more confident on camera. Click the contact button and
                let&apos;s get to work.
              </p>
            </div>
            <div className="mt-12">
              <CTAButton href="/contact" label="Contact" />
            </div>
          </div>
        </ScrollReveal>

        <Footer />
      </div>
    </PageTransition>
  )
}
