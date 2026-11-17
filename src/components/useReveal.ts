'use client'

import { useEffect, type RefObject } from 'react'

// Scroll reveal that never hides content in the page's HTML.
//
// The block is rendered visible, so it shows at first paint and is readable by search
// engines and by visitors whose JavaScript is slow or off. Once the script runs, only
// blocks that are still BELOW the screen are hidden, then faded in as they scroll into
// view (styles: `[data-reveal]` in globals.css). Anything already on screen is left alone.
//
// The earlier version (framer-motion `initial={{ opacity: 0 }}`) shipped every block at
// opacity 0 and waited for JavaScript to show it, which delayed the first visible content
// on every interior page.
export function useReveal(ref: RefObject<HTMLElement | null>, margin = 60) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // Any part already on screen (or above it, after a back/forward scroll restore): leave it
    // visible, so nothing a visitor can see ever blinks out when the script starts.
    if (el.getBoundingClientRect().top < window.innerHeight) return

    el.dataset.reveal = 'waiting'
    const observer = new IntersectionObserver(
      entries => {
        if (!entries.some(entry => entry.isIntersecting)) return
        el.dataset.reveal = 'shown'
        observer.disconnect()
      },
      { rootMargin: `0px 0px -${margin}px 0px` },
    )
    observer.observe(el)

    return () => {
      observer.disconnect()
      delete el.dataset.reveal
    }
  }, [ref, margin])
}
