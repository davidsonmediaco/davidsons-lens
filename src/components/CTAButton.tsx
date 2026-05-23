import Link from 'next/link'

interface CTAButtonProps {
  href?: string
  label?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
  className?: string
}

export default function CTAButton({
  href = '/contact',
  label = "Let's Work Together",
  onClick,
  type,
  disabled,
  className = '',
}: CTAButtonProps) {
  const base =
    'inline-block px-10 py-4 border border-[#C9A84C] text-[#C9A84C] text-sm tracking-[0.25em] uppercase font-body transition-all duration-300 hover:bg-[#C9A84C] hover:text-[#0D0D0D] disabled:opacity-50 disabled:cursor-not-allowed'

  if (type) {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`${base} ${className}`}
        style={{ fontFamily: 'var(--font-body)' }}
      >
        {label}
      </button>
    )
  }

  return (
    <Link
      href={href}
      className={`${base} ${className}`}
      style={{ fontFamily: 'var(--font-body)' }}
    >
      {label}
    </Link>
  )
}
