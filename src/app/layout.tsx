import type { Metadata } from 'next'
import { Playfair_Display, Outfit } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import GoogleAnalytics from '@/components/GoogleAnalytics'

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
})

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://davidsonslens.com'),
  title: {
    default: 'Davidsons Lens | Photo, Video & Creative Media — Bernardsville, NJ',
    template: '%s | Davidsons Lens',
  },
  description:
    'Davidsons Lens is a full-service creative media company based in Bernardsville, NJ. Photography, video, and social media for musicians, small businesses, personal brands, and individuals, including dog photography, portraits, and headshots across northern New Jersey.',
  keywords: [
    'photographer Bernardsville NJ',
    'New Jersey music photographer',
    'portrait photographer NJ',
    'small business photography NJ',
    'content creator New Jersey',
    'video production NJ',
    'social media content NJ',
    'personal brand photographer',
    'Somerset County photographer',
    'NJ creative media',
    'headshot photographer NJ',
    'dog photographer NJ',
    'dog photography New Jersey',
    'dog photographer Bernardsville',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://davidsonslens.com',
    siteName: 'Davidsons Lens',
    title: 'Davidsons Lens | Photo, Video & Creative Media — Bernardsville, NJ',
    description:
      'Full-service creative media company based in Bernardsville, NJ. Photography, video, social media for musicians, dog owners, small businesses and individuals across northern New Jersey.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Davidsons Lens' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Davidsons Lens | Photo, Video & Creative Media',
    description: 'Full-service creative media company based in Bernardsville, NJ.',
    images: ['/og-image.jpg'],
  },
  // LIVE: site is public and indexable.
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  return (
    <html lang="en" className={`${playfair.variable} ${outfit.variable}`}>
      <body className="min-h-screen bg-[#0D0D0D] text-[#F5F5F5]">
        {gaId && <GoogleAnalytics gaId={gaId} />}
        <Navigation />
        {children}
      </body>
    </html>
  )
}
