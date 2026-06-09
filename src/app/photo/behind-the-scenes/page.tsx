import type { Metadata } from 'next'
import GallerySubPage from '@/components/GallerySubPage'

export const metadata: Metadata = {
  title: 'Behind the Scenes',
  description:
    'Behind the scenes with Davidsons Lens — the setups, the candid moments, and the process behind the work across northern New Jersey.',
}

const heroImage = {
  src: '/assets/behind-the-scenes/behind-the-scenes-podcast-shoot-nj-01.jpg',
  alt: 'Behind the scenes of a podcast content shoot in New Jersey — Davidsons Lens',
}

const images: { src: string; alt: string }[] = [
  { src: '/assets/behind-the-scenes/behind-the-scenes-podcast-shoot-nj-01.jpg', alt: 'Behind the scenes of a podcast shoot on set in New Jersey — Davidsons Lens' },
  { src: '/assets/behind-the-scenes/behind-the-scenes-podcast-set-nj-02.jpg', alt: 'Behind the scenes podcast set production in New Jersey — Davidsons Lens' },
  { src: '/assets/behind-the-scenes/behind-the-scenes-content-shoot-nj-03.jpg', alt: 'Behind the scenes content shoot in New Jersey — Davidsons Lens' },
  { src: '/assets/behind-the-scenes/behind-the-scenes-production-nj-04.jpg', alt: 'Behind the scenes production setup in New Jersey — Davidsons Lens' },
  { src: '/assets/behind-the-scenes/behind-the-scenes-on-set-nj-05.jpg', alt: 'Behind the scenes on set in New Jersey — Davidsons Lens' },
  { src: '/assets/behind-the-scenes/behind-the-scenes-creative-shoot-nj-06.jpg', alt: 'Behind the scenes of a creative shoot in New Jersey — Davidsons Lens' },
]

export default function BehindTheScenesPage() {
  return (
    <GallerySubPage
      category="Behind the Scenes"
      heroImage={heroImage}
      description={`Every shoot has a story before the final image ever exists. The setups, the test frames, the in-between moments where things actually come together. This is that side of the work.

I pull behind-the-scenes shots from sessions, sets, and shoots all over because the process is half the fun, and it shows you how I actually work.

Based in Bernardsville, NJ working across Somerset County, Morris County, and northern New Jersey.`}
      aboutBlurb="Behind the scenes with Davidsons Lens — the process, the setups, and the candid moments behind the work across northern New Jersey."
      images={images}
    />
  )
}
