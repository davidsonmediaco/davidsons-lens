// A page's H1: the short visible title in the display face, then a smaller descriptive line
// in the body face. Both sit inside the <h1>, so search engines read one phrase such as
// "Dog Photography in Bernardsville and northern New Jersey", while the page keeps its big,
// simple title. `className` sets the big title's size, spacing and tracking.
interface PageTitleProps {
  title: string
  subtitle: string
  className?: string
}

export default function PageTitle({ title, subtitle, className = '' }: PageTitleProps) {
  return (
    <h1 className={`text-white ${className}`} style={{ fontFamily: 'var(--font-display)' }}>
      <span className="block">{title}</span>{' '}
      <span
        className="block mt-3 md:mt-4 text-base md:text-xl leading-snug tracking-normal text-balance text-[#F5F5F5]"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        {subtitle}
      </span>
    </h1>
  )
}
