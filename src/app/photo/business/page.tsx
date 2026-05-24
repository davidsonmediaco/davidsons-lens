import type { Metadata } from 'next'
import GallerySubPage from '@/components/GallerySubPage'

export const metadata: Metadata = {
  title: 'Business',
  description:
    'Small business photography and video in Bernardsville, NJ. Building trust and pulling customers in through high quality visuals. Serving businesses across northern New Jersey.',
}

const heroImage = {
  src: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1920&q=80',
  alt: 'Business photography by Davidsons Lens, Bernardsville NJ',
}

const images: { src: string; alt: string }[] = [
  { src: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80', alt: 'Business workspace photography' },
  { src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80', alt: 'Office photography' },
  { src: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80', alt: 'Business team photography' },
  { src: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80', alt: 'Small business photography' },
  { src: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=800&q=80', alt: 'Business branding photography' },
  { src: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80', alt: 'Business photography session' },
]

export default function BusinessPage() {
  return (
    <GallerySubPage
      category="Business"
      heroImage={heroImage}
      description={`First impressions happen before a customer ever walks through your door. The photos and videos representing your business tell people whether you take pride in what you do before they've had a chance to find out for themselves.

High quality visuals build trust. They pull people in. They turn someone scrolling past into someone who stops, looks, and decides they want to come in.

Whether it's your products, your space, or the people behind the counter that make your place what it is, I'm here to capture it in a way that makes people feel like they already know you before they've ever met you.

Based in Bernardsville, NJ working with small businesses and brands across Somerset County, Morris County, and northern New Jersey.`}
      aboutBlurb="Small business photography and video in Bernardsville, NJ. Building trust and pulling customers in through high quality visuals. Serving businesses across northern New Jersey."
      images={images}
    />
  )
}
