import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'
import ScrollReveal from '@/components/ScrollReveal'
import PageTransition from '@/components/PageTransition'
import { getAllPosts } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Photography tips, behind-the-scenes stories, and creative insights from Davidsons Lens in Bernardsville, NJ.',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <PageTransition>
      <div className="pt-[72px] bg-[#0D0D0D] min-h-screen">
        <div className="max-w-4xl mx-auto px-6 pt-16 pb-24">
          <ScrollReveal>
            <h1
              className="text-5xl md:text-7xl text-white mb-6"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Blog
            </h1>
            <div className="w-12 h-px bg-[#C9A84C] mb-10" />
            <p
              className="text-[#F5F5F5] text-lg leading-relaxed mb-16 max-w-xl"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Behind the lens. Behind the scenes. Notes on craft, process, and what it takes to make
              something worth keeping.
            </p>
          </ScrollReveal>

          {posts.length === 0 ? (
            <ScrollReveal>
              <p className="text-[#A0A0A0]" style={{ fontFamily: 'var(--font-body)' }}>
                Posts coming soon.
              </p>
            </ScrollReveal>
          ) : (
            <div className="space-y-0 divide-y divide-white/5">
              {posts.map((post, i) => (
                <ScrollReveal key={post.slug} delay={i * 0.08}>
                  <Link href={`/blog/${post.slug}`} className="group block py-10">
                    <div className="flex items-start justify-between gap-8">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3">
                          <span
                            className="text-xs tracking-[0.2em] uppercase text-[#C9A84C]"
                            style={{ fontFamily: 'var(--font-body)' }}
                          >
                            {post.category}
                          </span>
                          <span
                            className="text-xs text-[#606060]"
                            style={{ fontFamily: 'var(--font-body)' }}
                          >
                            {new Date(post.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </span>
                        </div>
                        <h2
                          className="text-2xl md:text-3xl text-white mb-3 group-hover:text-[#C9A84C] transition-colors duration-300"
                          style={{ fontFamily: 'var(--font-display)' }}
                        >
                          {post.title}
                        </h2>
                        <p
                          className="text-[#F5F5F5] leading-relaxed max-w-2xl"
                          style={{ fontFamily: 'var(--font-body)' }}
                        >
                          {post.excerpt}
                        </p>
                      </div>
                      <span
                        className="hidden md:block text-[#C9A84C] text-sm tracking-[0.15em] uppercase shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        Read →
                      </span>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>

        <Footer />
      </div>
    </PageTransition>
  )
}
