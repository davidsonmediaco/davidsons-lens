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

// Business details for Google (structured data on the homepage). They must match the Google
// Business Profile, which is a service-area business: only the town is public, never a street
// address (owner's privacy). Hours are left out until the profile's Wednesday/Thursday hours are
// corrected. Do not add review ratings here: Google ignores self-published review markup.
const SITE = 'https://davidsonslens.com'

export const businessJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      '@id': `${SITE}/#business`,
      name: SITE_NAME,
      url: SITE,
      description:
        'Photographer and videographer in Bernardsville, NJ. Portraits, dog photography, music, and small-business photo and video across northern New Jersey.',
      image: `${SITE}/og-image.jpg`,
      logo: `${SITE}/icon.png`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Bernardsville',
        addressRegion: 'NJ',
        addressCountry: 'US',
      },
      areaServed: [
        { '@type': 'City', name: 'Bernardsville, NJ' },
        { '@type': 'AdministrativeArea', name: 'Somerset County, NJ' },
        { '@type': 'AdministrativeArea', name: 'Morris County, NJ' },
        { '@type': 'State', name: 'New Jersey' },
      ],
      knowsAbout: [
        'Portrait photography',
        'Headshots',
        'Dog photography',
        'Music and band photography',
        'Food and small business photography',
        'Video production',
        'Social media management',
      ],
      sameAs: [
        'https://instagram.com/davidsonslens_',
        'https://www.tiktok.com/@davidsonmediaco',
        'https://www.pinterest.com/davidsonslens_/',
        'https://www.youtube.com/@davidsonslens',
        // Google Business Profile (knowledge-graph id of the verified profile)
        'https://www.google.com/search?kgmid=/g/11xfk6w1s4',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE}/#website`,
      url: SITE,
      name: SITE_NAME,
      publisher: { '@id': `${SITE}/#business` },
    },
  ],
}

/** Serialize structured data for a <script type="application/ld+json"> tag. */
export const jsonLdHtml = (data: unknown) => ({
  __html: JSON.stringify(data).replace(/</g, '\\u003c'),
})
