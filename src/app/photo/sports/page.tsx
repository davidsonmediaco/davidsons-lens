import type { Metadata } from 'next'
import GallerySubPage from '@/components/GallerySubPage'

export const metadata: Metadata = {
  title: 'Sports',
  description:
    'Sports photography in Bernardsville, NJ specializing in baseball and basketball. Capturing emotion, focus, and the story behind every play for teams and organizations across northern New Jersey.',
}

const heroImage = {
  src: '/assets/sports/nj-cyclones-basketball-game-02.jpg',
  alt: 'NJ Cyclones youth basketball player driving to the basket — Davidsons Lens',
}

const images: { src: string; alt: string }[] = [
  { src: '/assets/sports/nj-cyclones-basketball-game-02.jpg', alt: 'NJ Cyclones player driving to the basket — Davidsons Lens' },
  { src: '/assets/sports/nj-cyclones-basketball-game-01.jpg', alt: 'NJ Cyclones youth basketball game action — Davidsons Lens' },
  { src: '/assets/sports/nj-cyclones-basketball-game-03.jpg', alt: 'NJ Cyclones basketball game moment — Davidsons Lens' },
  { src: '/assets/sports/nj-cyclones-basketball-game-04.jpg', alt: 'NJ Cyclones youth basketball action — Davidsons Lens' },
  { src: '/assets/sports/nj-cyclones-basketball-game-05.jpg', alt: 'NJ Cyclones basketball player in focus — Davidsons Lens' },
  { src: '/assets/sports/nj-cyclones-basketball-game-06.jpg', alt: 'NJ Cyclones youth basketball game — Davidsons Lens' },
  { src: '/assets/sports/nj-cyclones-basketball-game-07.jpg', alt: 'NJ Cyclones basketball action shot — Davidsons Lens' },
  { src: '/assets/sports/nj-cyclones-basketball-clinic-01.jpg', alt: 'Youth basketball training clinic — Davidsons Lens' },
  { src: '/assets/sports/nj-cyclones-basketball-clinic-02.jpg', alt: 'Basketball clinic drills — Davidsons Lens' },
  { src: '/assets/sports/nj-cyclones-basketball-clinic-03.jpg', alt: 'Youth basketball skills training — Davidsons Lens' },
  { src: '/assets/sports/nj-cyclones-basketball-clinic-04.jpg', alt: 'Basketball clinic session — Davidsons Lens' },
  { src: '/assets/sports/nj-cyclones-basketball-clinic-05.jpg', alt: 'Youth basketball training in Bernardsville NJ — Davidsons Lens' },
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
