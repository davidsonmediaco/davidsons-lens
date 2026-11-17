import type { MetadataRoute } from 'next'
import { execFileSync } from 'node:child_process'

const BASE = 'https://davidsonslens.com'

// "Last updated" date for a page = the date of the last git commit that touched the files
// its content comes from. Read once at build time (the sitemap is generated during
// `npm run build`, which runs inside the git checkout, locally and on the server), so the
// dates stay accurate without anyone maintaining them by hand. If git is not available the
// date is simply left out, which is valid.
function lastChanged(...files: string[]): Date | undefined {
  try {
    const iso = execFileSync('git', ['log', '-1', '--format=%cI', '--', ...files], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim()
    return iso ? new Date(iso) : undefined
  } catch {
    return undefined
  }
}

const gallery = (name: string) =>
  lastChanged(`src/app/photo/${name}/page.tsx`, 'src/components/GallerySubPage.tsx')

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE,
      priority: 1.0,
      changeFrequency: 'monthly',
      lastModified: lastChanged(
        'src/app/page.tsx',
        'src/lib/selected-work.ts',
        'src/components/HomeHeader.tsx',
        'src/components/SelectedWork.tsx',
      ),
    },
    {
      url: `${BASE}/photo`,
      priority: 0.9,
      changeFrequency: 'monthly',
      lastModified: lastChanged('src/app/photo/page.tsx', 'src/lib/categories.ts'),
    },
    { url: `${BASE}/photo/portraits`, priority: 0.8, changeFrequency: 'monthly', lastModified: gallery('portraits') },
    { url: `${BASE}/photo/music`, priority: 0.8, changeFrequency: 'monthly', lastModified: gallery('music') },
    { url: `${BASE}/photo/dogs`, priority: 0.8, changeFrequency: 'monthly', lastModified: gallery('dogs') },
    { url: `${BASE}/photo/business`, priority: 0.8, changeFrequency: 'monthly', lastModified: gallery('business') },
    {
      url: `${BASE}/video`,
      priority: 0.8,
      changeFrequency: 'monthly',
      lastModified: lastChanged('src/app/video/page.tsx'),
    },
    {
      url: `${BASE}/creative-services`,
      priority: 0.8,
      changeFrequency: 'monthly',
      lastModified: lastChanged('src/app/creative-services/page.tsx'),
    },
    {
      url: `${BASE}/about`,
      priority: 0.7,
      changeFrequency: 'yearly',
      lastModified: lastChanged('src/app/about/page.tsx'),
    },
    {
      url: `${BASE}/contact`,
      priority: 0.7,
      changeFrequency: 'yearly',
      lastModified: lastChanged('src/app/contact/page.tsx', 'src/components/ContactForm.tsx'),
    },
  ]

  return staticRoutes
}
