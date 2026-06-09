import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'

const BASE = 'https://davidsonslens.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, priority: 1.0, changeFrequency: 'monthly' },
    { url: `${BASE}/photo`, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${BASE}/photo/portraits`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE}/photo/music`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE}/photo/sports`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE}/photo/pets`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE}/photo/business`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE}/photo/behind-the-scenes`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE}/video`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE}/creative-services`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE}/contact`, priority: 0.7, changeFrequency: 'yearly' },
    { url: `${BASE}/blog`, priority: 0.7, changeFrequency: 'weekly' },
  ]

  const postRoutes: MetadataRoute.Sitemap = posts.map(post => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : undefined,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...postRoutes]
}
