'use client'

import { useState } from 'react'

export default function VideoHero({ src }: { src: string }) {
  const [muted, setMuted] = useState(true)

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <video
        src={src}
        autoPlay
        loop
        muted={muted}
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/45" />

      {/* Sound toggle */}
      <button
        onClick={() => setMuted(m => !m)}
        aria-label={muted ? 'Unmute video' : 'Mute video'}
        className="absolute bottom-8 right-8 z-10 flex items-center gap-2 px-4 py-2 border border-white/30 text-white text-xs tracking-[0.15em] uppercase hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all duration-300"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        {muted ? (
          <>
            <SoundOffIcon /> Sound On
          </>
        ) : (
          <>
            <SoundOnIcon /> Mute
          </>
        )}
      </button>

      {/* Label */}
      <div className="absolute inset-0 flex items-end pb-16 px-8 pointer-events-none">
        <p
          className="text-xs tracking-[0.3em] uppercase text-[#C9A84C]"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Video Reel
        </p>
      </div>
    </div>
  )
}

function SoundOffIcon() {
  return (
    <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
      <path d="M16.5 12A4.5 4.5 0 0014 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0021 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06A8.99 8.99 0 0017.73 18L19 19.27 20.27 18 5.27 3 4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
    </svg>
  )
}

function SoundOnIcon() {
  return (
    <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
    </svg>
  )
}
