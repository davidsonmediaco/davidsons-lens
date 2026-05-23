import type { Metadata } from 'next'
import GallerySubPage from '@/components/GallerySubPage'

export const metadata: Metadata = {
  title: 'Business',
  description:
    'Small business photography and video in Bernardsville, NJ. Building trust and pulling customers in through high quality visuals. Serving businesses across northern New Jersey.',
}

const images: { src: string; alt: string }[] = []

export default function BusinessPage() {
  return (
    <GallerySubPage
      category="Business"
      description={`First impressions happen before a customer ever walks through your door. The photos and videos representing your business tell people whether you take pride in what you do before they've had a chance to find out for themselves.

High quality visuals build trust. They pull people in. They turn someone scrolling past into someone who stops, looks, and decides they want to come in.

Whether it's your products, your space, or the people behind the counter that make your place what it is, I'm here to capture it in a way that makes people feel like they already know you before they've ever met you.

Based in Bernardsville, NJ working with small businesses and brands across Somerset County, Morris County, and northern New Jersey.`}
      aboutBlurb="Small business photography and video in Bernardsville, NJ. Building trust and pulling customers in through high quality visuals. Serving businesses across northern New Jersey."
      images={images}
    />
  )
}
