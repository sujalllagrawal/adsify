import { Link } from 'react-router-dom'
import { ShieldCheck } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-line mt-24">
      <div className="container-content py-14 grid grid-cols-2 md:grid-cols-5 gap-8">
        <div className="col-span-2">
          <span className="font-display text-lg font-semibold">Adsify</span>
          <p className="mt-3 text-sm text-ink-soft max-w-xs leading-relaxed">
            A curated marketplace connecting brands with verified creators, editors and social media
            professionals.
          </p>
          <div className="mt-4 flex items-center gap-2 text-sm text-teal-500">
            <ShieldCheck size={16} />
            Contact details stay private, always.
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-3">Talent</h4>
          <ul className="space-y-2 text-sm text-ink-soft">
            <li><Link to="/creators" className="hover:text-ink">Creators</Link></li>
            <li><Link to="/editors" className="hover:text-ink">Video Editors</Link></li>
            <li><Link to="/social-media" className="hover:text-ink">Social Media Managers</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-3">Brands</h4>
          <ul className="space-y-2 text-sm text-ink-soft">
            <li><Link to="/submit-requirement" className="hover:text-ink">Post a Requirement</Link></li>
            <li><Link to="/shortlist" className="hover:text-ink">View Shortlist</Link></li>
            <li><Link to="/about" className="hover:text-ink">How It Works</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-3">Company</h4>
          <ul className="space-y-2 text-sm text-ink-soft">
            <li><Link to="/about" className="hover:text-ink">About Adsify</Link></li>
            <li><Link to="/join-adsify" className="hover:text-ink">Join as Talent</Link></li>
            <li><Link to="/admin" className="hover:text-ink text-xs text-brass-500 font-medium">Admin Portal</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="container-content py-5 text-xs text-ink-faint flex flex-col sm:flex-row gap-2 justify-between">
          <span>© {new Date().getFullYear()} Adsify. All rights reserved.</span>
          <span>Built for brands and talent across India.</span>
        </div>
      </div>
    </footer>
  )
}
