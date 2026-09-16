import { Navigate, useParams } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import { SEO } from '@/components/ui/SEO'
import { VerifiedBadge, Pill } from '@/components/ui/Badge'
import { ShortlistButton } from '@/components/ShortlistButton'
import { PortfolioGrid } from '@/components/PortfolioGrid'
import { LinkButton } from '@/components/ui/Button'
import { EDITORS } from '@/data/editors'
import { formatCurrency } from '@/lib/filters'

export default function EditorProfile() {
  const { id } = useParams()
  const editor = EDITORS.find((e) => e.id === id)

  if (!editor) return <Navigate to="/editors" replace />

  return (
    <>
      <SEO
        title={`${editor.name} — Video Editor in ${editor.location} | Adsify`}
        description={editor.bio}
      />

      <section className="container-content pt-12 pb-10">
        <div className="flex flex-col sm:flex-row gap-6 sm:items-center">
          <img src={editor.avatarUrl} alt="" className="w-24 h-24 rounded-full object-cover" />
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-semibold">{editor.name}</h1>
              {editor.verified && <VerifiedBadge />}
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-sm text-ink-soft">
              <MapPin size={14} />
              {editor.location}
              <span className="mx-1 text-line">·</span>
              {editor.experienceYears} years experience
            </div>
          </div>
          <ShortlistButton id={editor.id} name={editor.name} size="md" />
        </div>
      </section>

      <section className="container-content grid lg:grid-cols-[1fr_320px] gap-12 pb-24">
        <div className="space-y-14">
          <div>
            <h2 className="text-lg font-semibold mb-3">About</h2>
            <p className="text-ink-soft leading-relaxed max-w-2xl">{editor.bio}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Specializations & Software</h2>
            <div className="flex flex-wrap gap-2 mb-3">
              {editor.specializations.map((s) => <Pill key={s}>{s}</Pill>)}
            </div>
            <div className="flex flex-wrap gap-2">
              {editor.software.map((s) => <Pill key={s}>{s}</Pill>)}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Portfolio</h2>
            <PortfolioGrid items={editor.portfolio} />
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Services</h2>
            <div className="flex flex-wrap gap-2">
              {editor.services.map((s) => <Pill key={s}>{s}</Pill>)}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Sample Projects</h2>
            <ul className="space-y-3">
              {editor.sampleProjects.map((p) => (
                <li key={p.brand} className="hairline rounded-md bg-white p-4">
                  <p className="font-medium text-sm">{p.brand}</p>
                  <p className="text-sm text-ink-soft mt-1">{p.summary}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside>
          <div className="sticky top-24 hairline rounded-md bg-white p-6">
            <p className="text-sm text-ink-soft">Starting from</p>
            <p className="text-2xl font-display font-semibold mt-1">{formatCurrency(editor.startingPrice)}</p>
            <h3 className="mt-5 text-lg font-semibold">Work with {editor.name.split(' ')[0]}</h3>
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
