'use client'

import { useRef, type CSSProperties } from 'react'
import { useReveal } from '@/components/useReveal'

interface ScrollRevealProps {
  children: React.ReactNode
  delay?: number
  className?: string
  direction?: 'up' | 'fade'
}

// Fades a block in as it scrolls into view. The block is visible in the HTML; see useReveal.
export default function ScrollReveal({
  children,
  delay = 0,
  className = '',
  direction = 'up',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  useReveal(ref)

  return (
    <div
      ref={ref}
      className={className}
      style={
        {
          '--reveal-delay': `${delay}s`,
          '--reveal-y': direction === 'up' ? '32px' : '0px',
        } as CSSProperties
      }
    >
      {children}
    </div>
  )
}
