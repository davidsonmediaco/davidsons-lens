import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Footer from '@/components/Footer'
import PageTransition from '@/components/PageTransition'
import CTAButton from '@/components/CTAButton'
import { getPost, getAllPosts } from '@/lib/blog'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      ...(post.coverImage ? { images: [{ url: post.coverImage }] } : {}),
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const allPosts = getAllPosts()
  const related = allPosts
    .filter(p => p.slug !== slug && p.category === post.category)
    .slice(0, 3)

  return (
    <PageTransition>
      <div className="pt-[72px] bg-[#0D0D0D] min-h-screen">
        {/* Header */}
        <header className="max-w-3xl mx-auto px-6 pt-16 pb-12">
          <div className="flex items-center gap-4 mb-6">
            <span
              className="text-xs tracking-[0.2em] uppercase text-[#C9A84C]"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {post.category}
            </span>
            <span className="text-[#404040]">—</span>
            <time
              dateTime={post.date}
              className="text-xs text-[#606060]"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>

          <h1
            className="text-4xl md:text-6xl text-white mb-6 leading-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {post.title}
          </h1>

          <div className="w-12 h-px bg-[#C9A84C] mb-8" />

          <p
            className="text-[#F5F5F5] text-lg leading-relaxed"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {post.excerpt}
          </p>

          <p
            className="text-sm text-[#606060] mt-6"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            By{' '}
            <span className="text-[#A0A0A0]">James Davidson</span>
            {' · '}
            <Link href="/blog" className="hover:text-[#C9A84C] transition-colors">
              Davidsons Lens
            </Link>
          </p>
        </header>

        {/* Cover image */}
        {post.coverImage && (
          <div className="max-w-4xl mx-auto px-6 mb-16">
            <div className="w-full aspect-[16/9] overflow-hidden bg-[#1A1A1A]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Post body */}
        <article
          className="max-w-3xl mx-auto px-6 pb-16 prose-blog"
          style={{ fontFamily: 'var(--font-body)' }}
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        {/* CTA */}
        <section className="border-t border-white/5">
          <div className="max-w-3xl mx-auto px-6 py-16 text-center">
            <div className="w-12 h-px bg-[#C9A84C] mx-auto mb-8" />
            <h2
              className="text-3xl md:text-4xl text-white mb-4"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Ready to work together?
            </h2>
            <p
              className="text-[#F5F5F5] text-lg mb-8"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Let&apos;s talk.
            </p>
            <CTAButton href="/contact" label="Get in Touch" />
          </div>
        </section>

        {/* Related posts */}
        {related.length > 0 && (
          <section className="border-t border-white/5">
            <div className="max-w-4xl mx-auto px-6 py-16">
              <h3
                className="text-xs tracking-[0.25em] uppercase text-[#C9A84C] mb-10"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                More from {post.category}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map(rp => (
                  <Link key={rp.slug} href={`/blog/${rp.slug}`} className="group block">
                    <p
                      className="text-white group-hover:text-[#C9A84C] transition-colors duration-300 text-lg mb-2"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {rp.title}
                    </p>
                    <p
                      className="text-[#606060] text-sm line-clamp-2"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {rp.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <Footer />
      </div>
    </PageTransition>
  )
}
