import type { Metadata } from 'next'
import GallerySubPage from '@/components/GallerySubPage'

export const metadata: Metadata = {
  title: 'Business',
  description:
    'Small business photography and video in Bernardsville, NJ. Building trust and pulling customers in through high quality visuals. Serving businesses across northern New Jersey.',
}

const heroImage = {
  src: '/assets/business/san-remo-espresso-machine-detail-nj.jpg',
  alt: 'Premium coffee brand photography of a San Remo espresso machine in New Jersey — Davidsons Lens',
}

const images: { src: string; alt: string }[] = [
  { src: '/assets/business/san-remo-espresso-machine-detail-nj.jpg', alt: 'San Remo espresso machine detail — small business brand photography NJ — Davidsons Lens' },
  { src: '/assets/business/sobol-acai-bowls-spread-nj.jpg', alt: 'SoBol acai bowls spread — food and brand photography in New Jersey — Davidsons Lens' },
  { src: '/assets/business/barrister-coffee-house-brand-photography-basking-ridge-nj.jpg', alt: 'Barrister Coffee House brand photography in Basking Ridge, NJ — Davidsons Lens' },
  { src: '/assets/business/sobol-acai-bowl-dragonfruit-patio-nj.jpg', alt: 'SoBol dragonfruit acai bowl product photography in New Jersey — Davidsons Lens' },
  { src: '/assets/business/san-remo-espresso-machine-nj.jpg', alt: 'San Remo espresso machine at a New Jersey coffee house — Davidsons Lens' },
  { src: '/assets/business/sobol-blue-acai-bowl-nj.jpg', alt: 'SoBol blue majik acai bowl product photography in New Jersey — Davidsons Lens' },
  { src: '/assets/business/barrister-coffee-roasting-nj.jpg', alt: 'Coffee roasting process — small business photography NJ — Davidsons Lens' },
  { src: '/assets/business/sobol-acai-bowl-fruit-topping-nj.jpg', alt: 'SoBol acai bowl with fresh fruit toppings — food photography NJ — Davidsons Lens' },
  { src: '/assets/business/san-remo-coffee-bar-wide-nj.jpg', alt: 'Coffee bar interior brand photography in New Jersey — Davidsons Lens' },
  { src: '/assets/business/sobol-acai-bowl-branding-nj.jpg', alt: 'SoBol acai bowl with branding — small business brand photography NJ — Davidsons Lens' },
  { src: '/assets/business/barrister-coffee-roast-close-up-nj.jpg', alt: 'Close-up coffee roast product photography in New Jersey — Davidsons Lens' },
  { src: '/assets/business/sobol-acai-bowl-close-up-nj.jpg', alt: 'Close-up SoBol acai bowl with mango and kiwi — food photography NJ — Davidsons Lens' },
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
