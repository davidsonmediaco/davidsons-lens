import type { Metadata } from 'next'

// Per-page search and sharing tags. Every indexable page builds its metadata here so it
// gets (1) a canonical address, which tells Google the one official URL for the page no
// matter how it was reached (http, www, tracking parameters), and (2) Open Graph / Twitter
// tags that describe THAT page. A page-level `openGraph` replaces the layout's whole
// block in Next.js, so the shared fields (site name, type, image) are repeated here.

export const SITE_NAME = 'Davidsons Lens'

const DEFAULT_IMAGE = { url: '/og-image.jpg', width: 1200, height: 630, alt: SITE_NAME }

interface PageSeo {
  /** Path on the site, e.g. '/photo/dogs'. Use '/' for the homepage. */
  path: string
  /** Page title. The layout adds " | Davidsons Lens" unless `titleIsComplete` is set. */
  title: string
  /** True when `title` already includes the brand (the homepage). */
  titleIsComplete?: boolean
  description: string
  /** Sharing image; defaults to the site-wide card. Pass a gallery's hero photo. */
  image?: { src: string; alt: string }
}

export function pageMetadata({
  path,
  title,
  titleIsComplete = false,
  description,
  image,
}: PageSeo): Metadata {
  const fullTitle = titleIsComplete ? title : `${title} | ${SITE_NAME}`
  const shareImage = image ? { url: image.src, alt: image.alt } : DEFAULT_IMAGE

  return {
    title,
    description,
    // Relative paths resolve against `metadataBase` in the root layout.
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      siteName: SITE_NAME,
      url: path,
      title: fullTitle,
      description,
      images: [shareImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [shareImage.url],
    },
  }
}
