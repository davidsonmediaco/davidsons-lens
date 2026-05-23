import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#0D0D0D] border-t border-white/5 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <p
              className="text-xl text-white tracking-widest uppercase mb-3"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Davidsons Lens
            </p>
            <p className="text-sm text-[#A0A0A0] leading-relaxed">
              Photo | Video | Creative Services
              <br />
              Bernardsville, NJ
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs text-[#C9A84C] tracking-[0.2em] uppercase mb-4">
              Navigate
            </p>
            <nav className="flex flex-col gap-2">
              {[
                ['/photo', 'Photo'],
                ['/video', 'Video'],
                ['/creative-services', 'Creative Services'],
                ['/contact', 'Contact'],
                ['/blog', 'Blog'],
              ].map(([href, label]) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm text-[#A0A0A0] hover:text-[#C9A84C] transition-colors duration-200"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* About blurb snippet */}
          <div>
            <p className="text-xs text-[#C9A84C] tracking-[0.2em] uppercase mb-4">
              About
            </p>
            <p className="text-sm text-[#A0A0A0] leading-relaxed">
              Based in Bernardsville, NJ — serving musicians, athletes, small businesses,
              and individuals across northern New Jersey.
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#A0A0A0]">
          <p>© {new Date().getFullYear()} Davidsons Lens. All rights reserved.</p>
          <p>Bernardsville, NJ</p>
        </div>
      </div>
    </footer>
  )
}
