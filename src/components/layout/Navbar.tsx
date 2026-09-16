import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Heart, Menu, X } from 'lucide-react'
import { useShortlist } from '@/hooks/useShortlist'
import { ShortlistDrawer } from '@/components/ShortlistDrawer'

const NAV_LINKS = [
  { to: '/creators', label: 'Creators' },
  { to: '/editors', label: 'Editors' },
  { to: '/social-media', label: 'Social Media' },
  { to: '/about', label: 'About' },
]

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [shortlistOpen, setShortlistOpen] = useState(false)
  const { ids } = useShortlist()

  return (
    <header className="sticky top-0 z-40 bg-paper/90 backdrop-blur border-b border-line">
      <div className="container-content flex items-center h-16">
        <Link to="/" className="font-display text-xl font-semibold tracking-tight text-ink">
          Adsify
        </Link>

        <nav className="hidden md:flex items-center gap-7 ml-10">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm transition-colors ${isActive ? 'text-ink font-medium' : 'text-ink-soft hover:text-ink'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3 ml-auto">
          <button
            onClick={() => setShortlistOpen(true)}
            className="relative flex items-center gap-1.5 text-sm text-ink-soft hover:text-ink px-2 py-2"
            aria-label={`Shortlist, ${ids.length} saved`}
          >
            <Heart size={18} />
            {ids.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-teal-500 text-[10px] text-white">
                {ids.length}
              </span>
            )}
          </button>
          <Link to="/join-adsify" className="text-sm text-ink-soft hover:text-ink px-3 py-2">
            Join Adsify
          </Link>
          <Link
            to="/submit-requirement"
            className="text-sm font-medium bg-ink text-paper px-4 py-2.5 rounded hover:bg-teal-600 transition-colors"
          >
            Post a Requirement
          </Link>
        </div>

        <button
          className="md:hidden ml-auto p-2 text-ink"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-paper md:hidden">
          <div className="container-content flex items-center h-16 border-b border-line">
            <span className="font-display text-xl font-semibold">Adsify</span>
            <button className="ml-auto p-2" onClick={() => setMenuOpen(false)} aria-label="Close menu">
              <X size={22} />
            </button>
          </div>
          <nav className="container-content flex flex-col gap-1 pt-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className="py-3.5 text-lg border-b border-line text-ink"
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => {
                setMenuOpen(false)
                setShortlistOpen(true)
              }}
              className="py-3.5 text-lg border-b border-line text-left text-ink flex items-center gap-2"
            >
              <Heart size={18} /> Shortlist ({ids.length})
            </button>
            <Link
              to="/join-adsify"
              onClick={() => setMenuOpen(false)}
              className="py-3.5 text-lg border-b border-line text-ink"
            >
              Join Adsify
            </Link>
            <Link
              to="/submit-requirement"
              onClick={() => setMenuOpen(false)}
              className="mt-4 text-center py-3.5 rounded bg-ink text-paper font-medium"
            >
              Post a Requirement
            </Link>
          </nav>
        </div>
      )}

      <ShortlistDrawer open={shortlistOpen} onClose={() => setShortlistOpen(false)} />
    </header>
  )
}
