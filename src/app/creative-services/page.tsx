import type { Metadata } from 'next'
import Footer from '@/components/Footer'
import CTAButton from '@/components/CTAButton'
import ScrollReveal from '@/components/ScrollReveal'
import PageTransition from '@/components/PageTransition'

export const metadata: Metadata = {
  title: 'Creative Services',
  description:
    'Social media management, consulting, and creative services from Davidsons Lens in Bernardsville, NJ.',
}

export default function CreativeServicesPage() {
  return (
    <PageTransition>
      <div className="pt-[72px] bg-[#0D0D0D] min-h-screen">
        {/* Page header */}
        <ScrollReveal>
          <div className="max-w-4xl mx-auto px-6 pt-16 pb-12">
            <h1
              className="text-5xl md:text-7xl text-white mb-6"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Creative Services
            </h1>
            <div className="w-12 h-px bg-[#C9A84C] mb-10" />
            <p
              className="text-[#F5F5F5] text-lg leading-relaxed max-w-2xl"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              When you work with Davidsons Lens you&apos;re not just hiring someone to show up and
              take photos. You&apos;re getting someone who actually cares. About the quality of what
              you&apos;re paying for. About the success of your business. About the memory being
              created. About making sure you walk away feeling good about what we built together.
            </p>
            <p
              className="text-[#A0A0A0] text-lg leading-relaxed max-w-2xl mt-6"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              I pay attention. To the details, to the industry, to what&apos;s working and what
              isn&apos;t. I under promise and over deliver because that&apos;s the only way I know
              how to work. Whatever you need, the goal is always the same. To make something that
              means something.
            </p>
          </div>
        </ScrollReveal>

        {/* Section 1 — Social Media Management */}
        <section className="border-t border-white/5">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto px-6 py-16 md:py-20">
              <p
                className="text-xs tracking-[0.25em] uppercase text-[#C9A84C] mb-4"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                01
              </p>
              <h2
                className="text-3xl md:text-4xl text-white mb-8"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Social Media Management
              </h2>
              <div
                className="text-[#F5F5F5] text-lg leading-relaxed space-y-5 max-w-2xl mb-10"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                <p>
                  Social media isn&apos;t something you can half commit to. Inconsistency is visible
                  and your audience notices. When you hand that responsibility to Davidsons Lens you
                  get someone who treats your page like it matters because it does.
                </p>
                <p>
                  Consistent posts. Community engagement. Content creation. Strategy. Content
                  calendars. If someone reaches out to your business through DM you&apos;ll know
                  about it. If something needs attention you&apos;ll hear from me first.
                </p>
                <p>
                  Every client is different so every package is built around what you actually need.
                  Whether that&apos;s full management from top to bottom or a supporting role that
                  fills the gaps, we figure out what makes sense for your business and build from
                  there.
                </p>
                <p>Your page should be working for you every single day. That&apos;s what this is.</p>
              </div>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 mb-10">
                {[
                  'Consistent Posting',
                  'Community Engagement',
                  'Content Creation',
                  'Strategy & Planning',
                  'Content Calendars',
                  'DM Management',
                  'Analytics Reporting',
                  'Custom Packages',
                ].map(item => (
                  <li
                    key={item}
                    className="flex items-center gap-3 py-3 border-b border-white/5 text-[#D5D5D5] text-base"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    <span className="text-[#C9A84C]" aria-hidden="true">
                      &mdash;
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <CTAButton />
            </div>
          </ScrollReveal>
        </section>

        {/* Section 2 — Social Media Consulting */}
        <section className="border-t border-white/5">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto px-6 py-16 md:py-20">
              <p
                className="text-xs tracking-[0.25em] uppercase text-[#C9A84C] mb-4"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                02
              </p>
              <h2
                className="text-3xl md:text-4xl text-white mb-8"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Social Media Consulting
              </h2>
              <div
                className="text-[#F5F5F5] text-lg leading-relaxed space-y-5 max-w-2xl mb-10"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                <p>
                  Not ready to hand off your pages entirely? A consulting session gives you the
                  clarity, strategy, and direction you need to run them yourself — and run them well.
                </p>
                <p>
                  In one hour we cover your content pillars, what&apos;s working, what&apos;s not,
                  and exactly what to do about it. You walk away with a clear plan and the
                  confidence to execute it. Sessions can run longer as needed.
                </p>
              </div>

              {/* Pricing */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 max-w-xl">
                <div className="border border-[#C9A84C]/30 bg-[#1A1A1A] p-6">
                  <p
                    className="text-[#C9A84C] text-xs tracking-[0.2em] uppercase mb-2"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    Consulting Session
                  </p>
                  <p
                    className="text-4xl text-white mb-1"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    $150
                  </p>
                  <p className="text-[#A0A0A0] text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                    1 hour (runs longer as needed)
                  </p>
                </div>
                <div className="border border-white/10 bg-[#1A1A1A] p-6">
                  <p
                    className="text-[#C9A84C] text-xs tracking-[0.2em] uppercase mb-2"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    Follow-Up Check-In
                  </p>
                  <p
                    className="text-4xl text-white mb-1"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    $50
                  </p>
                  <p className="text-[#A0A0A0] text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                    30 minute call
                  </p>
                </div>
              </div>

              <p
                className="text-[#A0A0A0] text-sm mb-8 max-w-xl"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                You&apos;ll leave with content pillars, a clear strategy, and a concrete understanding
                of what&apos;s working and what needs to change.
              </p>

              <CTAButton href="/contact" label="Book a Call" />
            </div>
          </ScrollReveal>
        </section>

        <Footer />
      </div>
    </PageTransition>
  )
}
