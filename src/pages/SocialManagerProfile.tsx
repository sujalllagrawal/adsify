import { Navigate, useParams } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import { SEO } from '@/components/ui/SEO'
import { VerifiedBadge, Pill } from '@/components/ui/Badge'
import { ShortlistButton } from '@/components/ShortlistButton'
import { PortfolioGrid } from '@/components/PortfolioGrid'
import { LinkButton } from '@/components/ui/Button'
import { SOCIAL_MANAGERS } from '@/data/socialManagers'
import { formatCurrency } from '@/lib/filters'

export default function SocialManagerProfile() {
  const { id } = useParams()
  const manager = SOCIAL_MANAGERS.find((m) => m.id === id)

  if (!manager) return <Navigate to="/social-media" replace />

  return (
    <>
      <SEO
        title={`${manager.name} — Social Media Manager in ${manager.location} | Adsify`}
        description={manager.bio}
      />

      <section className="container-content pt-12 pb-10">
        <div className="flex flex-col sm:flex-row gap-6 sm:items-center">
          <img src={manager.avatarUrl} alt="" className="w-24 h-24 rounded-full object-cover" />
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-semibold">{manager.name}</h1>
              {manager.verified && <VerifiedBadge />}
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-sm text-ink-soft">
              <MapPin size={14} />
              {manager.location}
              <span className="mx-1 text-line">·</span>
              {manager.experienceYears} years experience
            </div>
          </div>
          <ShortlistButton id={manager.id} name={manager.name} size="md" />
        </div>
      </section>

      <section className="container-content grid lg:grid-cols-[1fr_320px] gap-12 pb-24">
        <div className="space-y-14">
          <div>
            <h2 className="text-lg font-semibold mb-3">About</h2>
            <p className="text-ink-soft leading-relaxed max-w-2xl">{manager.bio}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Industries & Services</h2>
            <div className="flex flex-wrap gap-2 mb-3">
              {manager.industries.map((s) => <Pill key={s}>{s}</Pill>)}
            </div>
            <div className="flex flex-wrap gap-2">
              {manager.services.map((s) => <Pill key={s}>{s}</Pill>)}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Platforms</h2>
            <div className="flex flex-wrap gap-2">
              {manager.platforms.map((s) => <Pill key={s}>{s}</Pill>)}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Portfolio</h2>
            <PortfolioGrid items={manager.portfolio} />
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Case Studies & Results</h2>
            <ul className="space-y-3">
              {manager.caseStudies.map((c) => (
                <li key={c.brand} className="hairline rounded-md bg-white p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm">{c.brand}</p>
                    <span className="text-xs font-medium text-teal-500">{c.result}</span>
                  </div>
                  <p className="text-sm text-ink-soft mt-1">{c.summary}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside>
          <div className="sticky top-24 hairline rounded-md bg-white p-6">
            <p className="text-sm text-ink-soft">Starting from / month</p>
            <p className="text-2xl font-display font-semibold mt-1">{formatCurrency(manager.monthlyStartingPrice)}</p>
            <h3 className="mt-5 text-lg font-semibold">Work with {manager.name.split(' ')[0]}</h3>
            <p className="mt-2 text-sm text-ink-soft leading-relaxed">
              Tell us what you're looking for and Adsify will coordinate the introduction.
            </p>
            <LinkButton to="/submit-requirement" className="w-full mt-5">
              Send Requirement
            </LinkButton>
            <p className="mt-4 text-xs text-ink-faint leading-relaxed">
              Contact details stay private. Brands never receive direct phone or email.
            </p>
          </div>
        </aside>
      </section>
    </>
  )
}
