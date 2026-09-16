import { useParams, Link, Navigate } from 'react-router-dom'
import { MapPin, Instagram, Youtube, Linkedin } from 'lucide-react'
import { SEO } from '@/components/ui/SEO'
import { VerifiedBadge, Pill } from '@/components/ui/Badge'
import { ShortlistButton } from '@/components/ShortlistButton'
import { PortfolioGrid } from '@/components/PortfolioGrid'
import { LinkButton } from '@/components/ui/Button'
import { CREATORS } from '@/data/creators'
import { formatFollowers } from '@/lib/filters'

const PLATFORM_ICON = { Instagram, YouTube: Youtube, LinkedIn: Linkedin } as const

export default function CreatorProfile() {
  const { id } = useParams()
  const creator = CREATORS.find((c) => c.id === id)

  if (!creator) return <Navigate to="/creators" replace />

  return (
    <>
      <SEO
        title={`${creator.name} — ${creator.category} Creator in ${creator.location} | Adsify`}
        description={creator.bio}
      />

      <section className="container-content pt-12 pb-10">
        <div className="flex flex-col sm:flex-row gap-6 sm:items-center">
          <img src={creator.avatarUrl} alt="" className="w-24 h-24 rounded-full object-cover" />
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-semibold">{creator.name}</h1>
              {creator.verified && <VerifiedBadge />}
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-sm text-ink-soft">
              <MapPin size={14} />
              {creator.location}
              <span className="mx-1 text-line">·</span>
              {creator.category}
            </div>
            <div className="mt-3 flex items-center gap-3">
              {creator.platforms.map((p) => {
                const Icon = PLATFORM_ICON[p]
                return <Icon key={p} size={17} className="text-ink-soft" />
              })}
            </div>
          </div>
          <div className="flex gap-3">
            <ShortlistButton id={creator.id} name={creator.name} size="md" />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-3 sm:w-fit sm:flex sm:gap-10 gap-4">
          <Stat label="Followers" value={formatFollowers(creator.followers)} />
          <Stat label="Engagement" value={`${creator.engagementRate}%`} />
          <Stat label="Creator Score" value={String(creator.creatorScore)} accent />
        </div>
      </section>

      <section className="container-content grid lg:grid-cols-[1fr_320px] gap-12 pb-24">
        <div className="space-y-14">
          <div>
            <h2 className="text-lg font-semibold mb-3">About</h2>
            <p className="text-ink-soft leading-relaxed max-w-2xl">{creator.bio}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Portfolio</h2>
            <PortfolioGrid items={creator.portfolio} />
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Audience</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <AudienceCard title="Gender split" stats={creator.audience.genderSplit} />
              <AudienceCard title="Age groups" stats={creator.audience.ageGroups} />
              <AudienceCard title="Top cities" stats={creator.audience.topCities} />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {creator.audience.interests.map((i) => (
                <Pill key={i}>{i}</Pill>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Services</h2>
            <div className="flex flex-wrap gap-2">
              {creator.services.map((s) => (
                <Pill key={s}>{s}</Pill>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Previous Collaborations</h2>
            <ul className="space-y-3">
              {creator.collaborations.map((c) => (
                <li key={c.brand} className="hairline rounded-md bg-white p-4">
                  <p className="font-medium text-sm">{c.brand}</p>
                  <p className="text-sm text-ink-soft mt-1">{c.summary}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside>
          <div className="sticky top-24 hairline rounded-md bg-white p-6">
            <h3 className="text-lg font-semibold">Work with {creator.name.split(' ')[0]}</h3>
            <p className="mt-2 text-sm text-ink-soft leading-relaxed">
              Tell us what you're looking for and Adsify will coordinate the introduction.
            </p>
            <LinkButton to="/submit-requirement" className="w-full mt-5">
              Send Requirement
            </LinkButton>
            <p className="mt-4 text-xs text-ink-faint leading-relaxed">
              Contact details stay private. Brands never receive direct phone or email — Adsify manages
              every introduction.
            </p>
          </div>
        </aside>
      </section>

      <section className="container-content pb-24">
        <h2 className="text-lg font-semibold mb-4">More {creator.category} creators</h2>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          {CREATORS.filter((c) => c.category === creator.category && c.id !== creator.id)
            .slice(0, 4)
            .map((c) => (
              <Link key={c.id} to={`/creators/${c.id}`} className="shrink-0 w-56 hairline rounded-md bg-white p-4 hover:shadow-lift transition-shadow">
                <img src={c.avatarUrl} alt="" className="w-12 h-12 rounded-full object-cover" />
                <p className="mt-3 font-medium text-sm">{c.name}</p>
                <p className="text-xs text-ink-soft">{c.location}</p>
              </Link>
            ))}
        </div>
      </section>
    </>
  )
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div>
      <p className={`text-xl font-display font-semibold ${accent ? 'text-teal-500' : ''}`}>{value}</p>
      <p className="text-xs text-ink-faint mt-0.5">{label}</p>
    </div>
  )
}

function AudienceCard({ title, stats }: { title: string; stats: { label: string; value: number }[] }) {
  return (
    <div className="hairline rounded-md bg-white p-4">
      <p className="text-xs font-medium text-ink-soft mb-3">{title}</p>
      <div className="space-y-2">
        {stats.map((s) => (
          <div key={s.label}>
            <div className="flex justify-between text-xs mb-1">
              <span>{s.label}</span>
              <span className="text-ink-faint">{s.value}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-line overflow-hidden">
              <div className="h-full bg-teal-500 rounded-full" style={{ width: `${s.value}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
