import type { MetadataRoute } from 'next'

const BASE = 'https://davidsonslens.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, priority: 1.0, changeFrequency: 'monthly' },
    { url: `${BASE}/photo`, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${BASE}/photo/portraits`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE}/photo/music`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE}/photo/dogs`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE}/photo/business`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE}/video`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE}/creative-services`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE}/contact`, priority: 0.7, changeFrequency: 'yearly' },
  ]

  return staticRoutes
}
