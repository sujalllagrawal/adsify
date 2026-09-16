import { useMemo, useState } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import { SEO } from '@/components/ui/SEO'
import { SearchBar } from '@/components/SearchBar'
import { FilterPanel, FilterSection } from '@/components/FilterPanel'
import { SocialManagerCard } from '@/components/social-media/SocialManagerCard'
import { Drawer } from '@/components/ui/Drawer'
import { SOCIAL_MANAGERS } from '@/data/socialManagers'
import { LOCATIONS, SOCIAL_INDUSTRIES, SOCIAL_SERVICES, PLATFORMS, EXPERIENCE_RANGES, SOCIAL_PRICE_RANGES } from '@/data/constants'
import { matchesText } from '@/lib/filters'

function useMultiSelect() {
  const [selected, setSelected] = useState<string[]>([])
  const toggle = (v: string) => setSelected((prev) => (prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]))
  return { selected, toggle, reset: () => setSelected([]) }
}

export default function SocialMedia() {
  const [query, setQuery] = useState('')
  const [drawerOpen, setDrawerOpen] = useState(false)

  const location = useMultiSelect()
  const industry = useMultiSelect()
  const services = useMultiSelect()
  const platform = useMultiSelect()
  const experience = useMultiSelect()
  const budget = useMultiSelect()

  const results = useMemo(() => {
    return SOCIAL_MANAGERS.filter((m) => {
      const textMatch = matchesText(`${m.name} ${m.location} ${m.industries.join(' ')}`, query)
      const locMatch = location.selected.length === 0 || location.selected.includes(m.location)
      const indMatch = industry.selected.length === 0 || m.industries.some((i) => industry.selected.includes(i))
      const servMatch = services.selected.length === 0 || m.services.some((s) => services.selected.includes(s))
      const platMatch = platform.selected.length === 0 || m.platforms.some((p) => platform.selected.includes(p))
      const expMatch =
        experience.selected.length === 0 ||
        experience.selected.some((label) => {
          const range = EXPERIENCE_RANGES.find((r) => r.label === label)
          return range ? m.experienceYears >= range.min && m.experienceYears <= range.max : true
        })
      const budgetMatch =
        budget.selected.length === 0 ||
        budget.selected.some((label) => {
          const range = SOCIAL_PRICE_RANGES.find((r) => r.label === label)
          return range ? m.monthlyStartingPrice >= range.min && m.monthlyStartingPrice < range.max : true
        })
      return textMatch && locMatch && indMatch && servMatch && platMatch && expMatch && budgetMatch
    })
  }, [query, location.selected, industry.selected, services.selected, platform.selected, experience.selected, budget.selected])

  const sections: FilterSection[] = [
    { key: 'location', title: 'Location', options: [...LOCATIONS], selected: location.selected, onToggle: location.toggle },
    { key: 'industry', title: 'Industry', options: [...SOCIAL_INDUSTRIES], selected: industry.selected, onToggle: industry.toggle },
    { key: 'services', title: 'Services', options: [...SOCIAL_SERVICES], selected: services.selected, onToggle: services.toggle },
    { key: 'platform', title: 'Platform', options: [...PLATFORMS], selected: platform.selected, onToggle: platform.toggle },
    { key: 'experience', title: 'Experience', options: EXPERIENCE_RANGES.map((r) => r.label), selected: experience.selected, onToggle: experience.toggle },
    { key: 'budget', title: 'Budget', options: SOCIAL_PRICE_RANGES.map((r) => r.label), selected: budget.selected, onToggle: budget.toggle },
  ]

  const activeCount = [location, industry, services, platform, experience, budget].reduce((sum, s) => sum + s.selected.length, 0)

  function resetAll() {
    location.reset(); industry.reset(); services.reset(); platform.reset(); experience.reset(); budget.reset()
  }

  return (
    <>
      <SEO
        title="Find Social Media Managers | Adsify"
        description="Discover professionals who can manage and grow your brand's social presence."
      />
      <section className="container-content pt-12 pb-6">
        <h1 className="text-3xl sm:text-4xl font-semibold">Find Social Media Managers</h1>
        <p className="mt-3 text-ink-soft max-w-xl">
          Discover professionals who can manage and grow your social presence.
        </p>
      </section>

      <section className="container-content pb-24">
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1">
            <SearchBar value={query} onChange={setQuery} placeholder="Search by name, city or industry..." />
          </div>
          <button
            onClick={() => setDrawerOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-3 rounded-md border border-line text-sm"
          >
            <SlidersHorizontal size={16} />
            Filters {activeCount > 0 && `(${activeCount})`}
          </button>
        </div>

        <div className="grid lg:grid-cols-[240px_1fr] gap-8">
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <FilterPanel sections={sections} onReset={resetAll} />
            </div>
          </aside>

          <div>
            <p className="text-sm text-ink-soft mb-4">{results.length} social media managers found</p>
            {results.length === 0 ? (
              <div className="hairline rounded-md bg-white p-10 text-center">
                <p className="font-medium">No managers match your filters.</p>
                <button onClick={() => { resetAll(); setQuery('') }} className="mt-4 text-sm font-medium text-teal-500 hover:underline">
                  Clear search & filters
                </button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {results.map((m) => (
                  <SocialManagerCard key={m.id} manager={m} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="Filters" side="bottom">
        <FilterPanel sections={sections} onReset={resetAll} />
        <button onClick={() => setDrawerOpen(false)} className="w-full mt-6 py-3 rounded bg-ink text-paper text-sm font-medium">
          Show {results.length} results
        </button>
      </Drawer>
    </>
  )
}
