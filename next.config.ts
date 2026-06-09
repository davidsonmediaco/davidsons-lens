import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    // WebP only — AVIF encoding is far too CPU-heavy for the 1-core server
    // and was the cause of slow on-demand image optimization.
    formats: ['image/webp'],
    // Fewer breakpoints = fewer variants to encode on first request.
    deviceSizes: [640, 828, 1080, 1920],
    imageSizes: [256, 384],
    // Cache optimized variants for a year so they're encoded once, then served from cache.
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/photo-**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ]
  },
}

export default nextConfig
