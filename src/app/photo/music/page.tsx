import type { Metadata } from 'next'
import GallerySubPage from '@/components/GallerySubPage'

export const metadata: Metadata = {
  title: 'Music',
  description:
    'Music artist photography in Bernardsville, NJ. Raw, emotional, and real press shots and live performance photography for independent musicians across northern New Jersey.',
}

const images: { src: string; alt: string }[] = []

export default function MusicPage() {
  return (
    <GallerySubPage
      category="Music"
      description={`Music is personal. It's an extension of who you are and the photos that represent you should reflect that. Not a polished version of you. The real one. The one that exists when the music takes over and everything else falls away.

Whether I'm shooting a live performance, a press session, or something in between, I'm looking for the moments that can't be staged. The raw focus mid-song. The emotion after a set. The quiet version of you before you step on stage.

These are the photos that make people stop scrolling and actually feel something. That's the point.

Based in Bernardsville, NJ working with independent artists and musicians across northern New Jersey and beyond.`}
      aboutBlurb="Music artist photography in Bernardsville, NJ. Raw, emotional, and real press shots and live performance photography for independent musicians across northern New Jersey."
      images={images}
    />
  )
}
