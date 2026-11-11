import type { Metadata } from 'next'
import GallerySubPage from '@/components/GallerySubPage'

export const metadata: Metadata = {
  title: 'Music',
  description:
    'Music artist photography in Bernardsville, NJ. Raw, emotional, and real press shots and live performance photography for independent musicians across northern New Jersey.',
}

const heroImage = {
  src: '/assets/music/cinematic-live-music-photography-nj.jpg',
  alt: 'Cinematic live music performance photography in New Jersey — Davidsons Lens',
}

const images: { src: string; alt: string }[] = [
  { src: '/assets/music/cinematic-live-music-photography-nj.jpg', alt: 'Cinematic black-and-white live music performance in New Jersey — Davidsons Lens' },
  { src: '/assets/music/guitarist-live-performance-nj.jpg', alt: 'Guitarist performing live on stage in New Jersey — Davidsons Lens' },
  { src: '/assets/music/live-music-photography-stage-nj.jpg', alt: 'Live music photography on stage in New Jersey — Davidsons Lens' },
  { src: '/assets/music/live-band-performance-nj.jpg', alt: 'Live band performance in New Jersey — Davidsons Lens' },
  { src: '/assets/music/live-music-concert-photography-nj.jpg', alt: 'Live concert music photography in New Jersey — Davidsons Lens' },
  { src: '/assets/music/musician-on-stage-nj.jpg', alt: 'Musician on stage mid-song in New Jersey — Davidsons Lens' },
  { src: '/assets/music/live-show-photography-nj.jpg', alt: 'Live show photography in New Jersey — Davidsons Lens' },
  { src: '/assets/music/concert-photography-new-jersey.jpg', alt: 'Concert photography in New Jersey — Davidsons Lens' },
  { src: '/assets/music/live-music-performance-nj.jpg', alt: 'Live music performance photography in New Jersey — Davidsons Lens' },
  { src: '/assets/music/chris-hajian-session-drummer-laughing-the-bunker-studio-brooklyn.jpg', alt: 'Black-and-white photo of a drummer laughing behind a fully miked drum kit during a session for jazz composer Chris Hajian at The Bunker Studio, Brooklyn — Davidsons Lens' },
  { src: '/assets/music/chris-hajian-session-grand-piano-the-bunker-studio-brooklyn.jpg', alt: 'Two men working together at a grand piano during a session for jazz composer Chris Hajian at The Bunker Studio, Brooklyn — Davidsons Lens' },
  { src: '/assets/music/chris-hajian-session-pianist-headphones-the-bunker-studio-brooklyn.jpg', alt: 'Pianist in headphones playing a grand piano during a session for jazz composer Chris Hajian at The Bunker Studio, Brooklyn — Davidsons Lens' },
  { src: '/assets/music/chris-hajian-session-mixing-console-the-bunker-studio-brooklyn.jpg', alt: 'White-haired man in glasses at a large mixing console with session notes during a session for jazz composer Chris Hajian at The Bunker Studio, Brooklyn — Davidsons Lens' },
  { src: '/assets/music/chris-hajian-session-control-room-conversation-the-bunker-studio-brooklyn.jpg', alt: 'White-bearded man smiling in the control room during a session for jazz composer Chris Hajian at The Bunker Studio, Brooklyn — Davidsons Lens' },
  { src: '/assets/music/chris-hajian-session-control-room-doorway-the-bunker-studio-brooklyn.jpg', alt: 'Man seated on a sofa, seen through an open door, during a session for jazz composer Chris Hajian at The Bunker Studio, Brooklyn — Davidsons Lens' },
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
