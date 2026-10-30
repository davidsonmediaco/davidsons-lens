'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { navLinks } from '@/components/Navigation'

// Homepage-only header: a compact wordmark (the page's H1) with plain text links on
// desktop and a "Menu" disclosure on phones. Other pages keep <Navigation />, which
// renders nothing on "/".

const linkClass =
  'text-xs tracking-[0.2em] uppercase text-[#F5F5F5] hover:text-[#C9A84C] focus-visible:text-[#C9A84C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C9A84C] transition-colors duration-300'

export default function HomeHeader() {
  const [open, setOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // While the menu is open: Escape closes it and returns focus to the button;
  // a tap or click outside the header closes it.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setOpen(false)
      buttonRef.current?.focus()
    }
    const onPointer = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [open])

  return (
    <header
      ref={headerRef}
      className="relative z-30 bg-[#0D0D0D]"
      style={{ fontFamily: 'var(--font-body)' }}
      // Tabbing past the last menu link closes the menu.
      onBlur={e => {
        if (open && !e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false)
      }}
    >
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 h-14 md:h-[72px] flex items-center justify-between gap-4">
        <h1
          className="whitespace-nowrap text-[17px] md:text-xl uppercase tracking-[0.12em] text-white"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Davidsons Lens
        </h1>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className={linkClass}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          ref={buttonRef}
          type="button"
          aria-expanded={open}
          aria-controls="home-menu"
          onClick={() => setOpen(o => !o)}
          className={`md:hidden -mr-2 px-2 py-2 ${linkClass} ${open ? 'text-[#C9A84C]' : ''}`}
        >
          Menu
        </button>
      </div>

      <nav
        id="home-menu"
        aria-label="Main"
        hidden={!open}
        className="md:hidden absolute inset-x-0 top-full bg-[#0D0D0D] border-t border-white/10"
      >
        <ul className="px-4 py-2">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className={`block py-3.5 ${linkClass} text-sm`} onClick={() => setOpen(false)}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
