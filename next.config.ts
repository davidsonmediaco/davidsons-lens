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
    // React needs eval() in dev only (HMR/debugging); production never does.
    const scriptEval = process.env.NODE_ENV === 'development' ? " 'unsafe-eval'" : ''
    const csp = [
      "default-src 'self'",
      // 'unsafe-inline' is required for Next.js hydration/streaming inline scripts
      // (no nonce middleware) and for Google Analytics when enabled.
      `script-src 'self' 'unsafe-inline'${scriptEval} https://www.googletagmanager.com https://www.google-analytics.com`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://images.unsplash.com",
      "font-src 'self' data:",
      "frame-src https://www.youtube-nocookie.com https://www.youtube.com",
      "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://www.googletagmanager.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      'upgrade-insecure-requests',
    ].join('; ')

    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
          },
          { key: 'Content-Security-Policy', value: csp },
        ],
      },
    ]
  },
}

export default nextConfig
