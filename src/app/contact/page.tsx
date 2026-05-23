import type { Metadata } from 'next'
import Footer from '@/components/Footer'
import ScrollReveal from '@/components/ScrollReveal'
import PageTransition from '@/components/PageTransition'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    "Get in touch with Davidsons Lens. Photography, video, social media, and creative services in Bernardsville, NJ. Let's work together.",
}

export default function ContactPage() {
  return (
    <PageTransition>
      <div className="pt-[72px] bg-[#0D0D0D] min-h-screen">
        <div className="max-w-3xl mx-auto px-6 pt-16 pb-24">
          <ScrollReveal>
            <h1
              className="text-5xl md:text-7xl text-white mb-6"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Contact
            </h1>
            <div className="w-12 h-px bg-[#C9A84C] mb-10" />
            <p
              className="text-[#F5F5F5] text-lg leading-relaxed mb-14 max-w-xl"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Whatever you&apos;ve got in mind, let&apos;s build it. This is about you, your vision,
              your story. I&apos;m here to bring it to life and push it further than you imagined it
              originally. Have a location in mind? Let&apos;s hear it. Want me to find the perfect
              spot? I&apos;ve got you. Have a concept half formed and need help finalizing it?
              That&apos;s fine too. We&apos;ll figure it out together. I want to hear your ideas. All
              of them. Fill out the form and let&apos;s get to work.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <ContactForm />
          </ScrollReveal>
        </div>

        <Footer />
      </div>
    </PageTransition>
  )
}
