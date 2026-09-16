import { Link } from 'react-router-dom'
import { ArrowRight, Video, Users2, Megaphone, ShieldCheck } from 'lucide-react'
import { LinkButton } from '@/components/ui/Button'
import { SEO } from '@/components/ui/SEO'
import { StatsCard } from '@/components/StatsCard'
import { CreatorCard } from '@/components/creators/CreatorCard'
import { CREATORS } from '@/data/creators'
import { EDITORS } from '@/data/editors'
import { SOCIAL_MANAGERS } from '@/data/socialManagers'

const FEATURED = CREATORS.slice(0, 6)

const STEPS = [
  {
    n: '01',
    title: 'Discover',
    body: 'Search and filter curated marketing talent by location, category and performance.',
  },
  {
    n: '02',
    title: 'Shortlist',
    body: 'Review portfolios, audience data and past work, then save the profiles you like.',
  },
  {
    n: '03',
    title: 'Connect through Adsify',
    body: 'Submit your requirement — Adsify reviews it and coordinates the introduction.',
  },
]

export default function Home() {
  return (
    <>
      <SEO
        title="Adsify — Find the Right Marketing Talent"
        description="Discover curated creators, editors and social media professionals for your next campaign. Adsify connects brands with verified marketing talent while keeping contact details private."
      />

      {/* Hero */}
      <section className="container-content pt-14 pb-16 sm:pt-20 sm:pb-24">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 items-end">
          <div>
            <p className="text-sm text-teal-500 font-medium mb-5">A curated marketing talent marketplace</p>
            <h1 className="text-[2.6rem] sm:text-6xl leading-[1.05] font-semibold tracking-tight max-w-xl">
              Find the right marketing talent.
            </h1>
            <p className="mt-6 text-lg text-ink-soft max-w-md leading-relaxed">
              Discover curated creators, editors and social media professionals for your next campaign.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <LinkButton to="/creators" size="md">
                Explore Talent <ArrowRight size={16} />
              </LinkButton>
              <LinkButton to="/submit-requirement" variant="secondary" size="md">
                Post a Requirement
              </LinkButton>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <StatsCard label="Verified creators" value={`${CREATORS.length}+`} />
            <StatsCard label="Video editors" value={`${EDITORS.length}+`} />
            <StatsCard label="Social media managers" value={`${SOCIAL_MANAGERS.length}+`} />
            <StatsCard label="Cities covered" value="4" />
          </div>
        </div>
      </section>

      {/* What are you looking for */}
      <section className="container-content pb-20">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-8">What are you looking for?</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <TalentCategoryCard
            icon={<Users2 size={20} />}
            title="Creators"
            body="Find influencers and content creators by location, niche, audience and engagement."
            cta="Explore Creators"
            to="/creators"
          />
          <TalentCategoryCard
            icon={<Video size={20} />}
            title="Video Editors"
            body="Discover editors based on style, experience and portfolio."
            cta="Find Editors"
            to="/editors"
          />
          <TalentCategoryCard
            icon={<Megaphone size={20} />}
            title="Social Media Managers"
            body="Find professionals who can manage and grow your social presence."
            cta="Find Social Media Managers"
            to="/social-media"
          />
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white border-y border-line">
        <div className="container-content py-20">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-10 max-w-md">How Adsify works</h2>
          <div className="grid sm:grid-cols-3 gap-10">
            {STEPS.map((step) => (
              <div key={step.n}>
                <span className="text-sm font-display text-teal-500">{step.n}</span>
                <h3 className="mt-3 text-lg font-medium">{step.title}</h3>
                <p className="mt-2 text-sm text-ink-soft leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured creators */}
      <section className="container-content py-20">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold">Featured Creators</h2>
          <LinkButton to="/creators" variant="ghost" size="sm" className="hidden sm:inline-flex">
            View all <ArrowRight size={14} />
          </LinkButton>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURED.map((creator) => (
            <CreatorCard key={creator.id} creator={creator} />
          ))}
        </div>
        <LinkButton to="/creators" variant="secondary" size="sm" className="mt-8 w-full sm:hidden">
          View all creators
        </LinkButton>
      </section>

      {/* Privacy */}
      <section className="container-content pb-24">
        <div className="hairline rounded-md bg-white p-8 sm:p-10 flex flex-col sm:flex-row gap-6 items-start">
          <div className="p-3 rounded-md bg-teal-50 text-teal-500 shrink-0">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h3 className="text-xl font-semibold">Your contact details stay private.</h3>
            <p className="mt-2 text-ink-soft max-w-2xl leading-relaxed">
              Brands never receive a creator's personal phone number or email directly. You submit a
              requirement, and Adsify manages the introduction — so every conversation starts on
              professional terms.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

function TalentCategoryCard({
  icon,
  title,
  body,
  cta,
  to,
}: {
  icon: React.ReactNode
  title: string
  body: string
  cta: string
  to: string
}) {
  return (
    <Link
      to={to}
      className="group block hairline rounded-md bg-white p-7 transition-shadow hover:shadow-lift"
    >
      <div className="w-10 h-10 rounded-md bg-teal-50 text-teal-500 flex items-center justify-center">
        {icon}
      </div>
      <h3 className="mt-5 text-lg font-medium">{title}</h3>
      <p className="mt-2 text-sm text-ink-soft leading-relaxed">{body}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-ink group-hover:text-teal-500 transition-colors">
        {cta} <ArrowRight size={14} />
      </span>
    </Link>
  )
}
