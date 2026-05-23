'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { href: '/photo', label: 'Photo' },
  { href: '/video', label: 'Video' },
  { href: '/creative-services', label: 'Creative Services' },
  { href: '/contact', label: 'Contact' },
]

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on route change
  useEffect(() => { setMenuOpen(false) }, [pathname])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isHome
            ? scrolled
              ? 'bg-[#0D0D0D]/90 backdrop-blur-sm'
              : 'bg-transparent'
            : 'bg-[#0D0D0D]/95 backdrop-blur-sm border-b border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-display text-xl md:text-2xl text-white tracking-widest uppercase hover:text-[#C9A84C] transition-colors duration-300"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Davidsons Lens
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`font-body text-sm tracking-[0.2em] uppercase transition-colors duration-300 ${
                  pathname.startsWith(href)
                    ? 'text-[#C9A84C]'
                    : 'text-[#F5F5F5] hover:text-[#C9A84C]'
                }`}
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="md:hidden flex flex-col gap-[5px] p-2 z-50 relative"
          >
            <span
              className={`block w-6 h-px bg-[#F5F5F5] transition-all duration-300 ${
                menuOpen ? 'rotate-45 translate-y-[6px]' : ''
              }`}
            />
            <span
              className={`block w-6 h-px bg-[#F5F5F5] transition-all duration-300 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-px bg-[#F5F5F5] transition-all duration-300 ${
                menuOpen ? '-rotate-45 -translate-y-[6px]' : ''
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#0D0D0D] flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-10">
              {navLinks.map(({ href, label }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                >
                  <Link
                    href={href}
                    className="font-display text-4xl text-white hover:text-[#C9A84C] transition-colors duration-300 tracking-wide"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
