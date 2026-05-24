import type { Metadata } from 'next'
import GallerySubPage from '@/components/GallerySubPage'

export const metadata: Metadata = {
  title: 'Sports',
  description:
    'Sports photography in Bernardsville, NJ specializing in baseball and basketball. Capturing emotion, focus, and the story behind every play for teams and organizations across northern New Jersey.',
}

const heroImage = {
  src: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1920&q=80',
  alt: 'Sports photography by Davidsons Lens, Bernardsville NJ',
}

const images: { src: string; alt: string }[] = [
  { src: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80', alt: 'Basketball photography' },
  { src: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?auto=format&fit=crop&w=800&q=80', alt: 'Baseball photography' },
  { src: 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=800&q=80', alt: 'Sports action photography' },
  { src: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?auto=format&fit=crop&w=800&q=80', alt: 'Basketball game photography' },
  { src: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80', alt: 'Sports photography' },
  { src: 'https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?auto=format&fit=crop&w=800&q=80', alt: 'Sports action shot' },
]

export default function SportsPage() {
  return (
    <GallerySubPage
      category="Sports"
      heroImage={heroImage}
      description={`Sport lives in the details most people miss. The look on a batter's face as they walk to the plate. The frustration after a bad play. The pure excitement of a good one. A teammate losing their mind in the dugout cheering someone home. The locked-in focus of a player in the middle of a game who's completely in their own world.

That's what I'm here to capture. Not just the play. The feeling behind it. The moments that remind you why you fell in love with the game in the first place.

Whether it's baseball or basketball, a rec league or a competitive program, my goal is the same. To tell your team's story in a way that makes you feel every moment all over again.

Based in Bernardsville, NJ serving teams, leagues, and organizations across northern New Jersey and beyond.`}
      aboutBlurb="Sports photography in Bernardsville, NJ specializing in baseball and basketball. Capturing emotion, focus, and the story behind every play for teams and organizations across northern New Jersey."
      images={images}
    />
  )
}
