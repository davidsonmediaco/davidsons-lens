import type { Metadata } from 'next'
import GallerySubPage from '@/components/GallerySubPage'

export const metadata: Metadata = {
  title: 'Music',
  description:
    'Music artist photography in Bernardsville, NJ. Raw, emotional, and real press shots and live performance photography for independent musicians across northern New Jersey.',
}

const heroImage = {
  src: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1920&q=80',
  alt: 'Music photography by Davidsons Lens, Bernardsville NJ',
}

const images: { src: string; alt: string }[] = [
  { src: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&w=800&q=80', alt: 'Live concert photography' },
  { src: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80', alt: 'Musician portrait' },
  { src: 'https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?auto=format&fit=crop&w=800&q=80', alt: 'Music artist session' },
  { src: 'https://images.unsplash.com/photo-1501612780327-45045538702b?auto=format&fit=crop&w=800&q=80', alt: 'Live performance photography' },
  { src: 'https://images.unsplash.com/photo-1468164016595-6108e4c60c8b?auto=format&fit=crop&w=800&q=80', alt: 'Concert photography' },
  { src: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=800&q=80', alt: 'Live music photography' },
]

export default function MusicPage() {
  return (
    <GallerySubPage
      category="Music"
      heroImage={heroImage}
      description={`Music is personal. It's an extension of who you are and the photos that represent you should reflect that. Not a polished version of you. The real one. The one that exists when the music takes over and everything else falls away.

Whether I'm shooting a live performance, a press session, or something in between, I'm looking for the moments that can't be staged. The raw focus mid-song. The emotion after a set. The quiet version of you before you step on stage.

These are the photos that make people stop scrolling and actually feel something. That's the point.

Based in Bernardsville, NJ working with independent artists and musicians across northern New Jersey and beyond.`}
      aboutBlurb="Music artist photography in Bernardsville, NJ. Raw, emotional, and real press shots and live performance photography for independent musicians across northern New Jersey."
      images={images}
    />
  )
}
