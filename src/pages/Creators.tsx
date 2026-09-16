import { useMemo, useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { SlidersHorizontal, MapPin } from 'lucide-react'
import { SEO } from '@/components/ui/SEO'
import { SearchBar } from '@/components/SearchBar'
import { FilterPanel, FilterSection } from '@/components/FilterPanel'
import { CreatorCard } from '@/components/creators/CreatorCard'
import { Drawer } from '@/components/ui/Drawer'
import { CREATORS } from '@/data/creators'
import { LOCATIONS, CREATOR_CATEGORIES, FOLLOWER_RANGES, PLATFORMS, SORT_OPTIONS } from '@/data/constants'
import { matchesText } from '@/lib/filters'

function useMultiSelect(initial: string[] = []) {
  const [selected, setSelected] = useState<string[]>(initial)
  const toggle = (v: string) => setSelected((prev) => (prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]))
  return { selected, toggle, reset: () => setSelected([]), setSelected }
}

export default function Creators() {
  const { locationParam, categoryParam } = useParams<{ locationParam?: string; categoryParam?: string }>()
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<(typeof SORT_OPTIONS)[number]>('Recommended')
  const [drawerOpen, setDrawerOpen] = useState(false)

  const location = useMultiSelect()
  const category = useMultiSelect()
  const followers = useMultiSelect()
  const platform = useMultiSelect()

  useEffect(() => {
    if (locationParam) {
      const match = LOCATIONS.find((l) => l.toLowerCase() === locationParam.toLowerCase())
      if (match) location.setSelected([match])
    }
    if (categoryParam) {
      const match = CREATOR_CATEGORIES.find((c) => c.toLowerCase() === categoryParam.toLowerCase())
      if (match) category.setSelected([match])
    }
  }, [locationParam, categoryParam])

  const currentLocationName = locationParam
    ? LOCATIONS.find((l) => l.toLowerCase() === locationParam.toLowerCase()) || 'Jaipur'
    : null
  const currentCategoryName = categoryParam
    ? CREATOR_CATEGORIES.find((c) => c.toLowerCase() === categoryParam.toLowerCase())
    : null

  const results = useMemo(() => {
    let list = CREATORS.filter((c) => {
      const textMatch = matchesText(`${c.name} ${c.location} ${c.category}`, query)
      const locMatch = location.selected.length === 0 || location.selected.includes(c.location)
      const catMatch = category.selected.length === 0 || category.selected.includes(c.category)
      const platMatch = platform.selected.length === 0 || c.platforms.some((p) => platform.selected.includes(p))
      const followerMatch =
        followers.selected.length === 0 ||
        followers.selected.some((label) => {
          const range = FOLLOWER_RANGES.find((r) => r.label === label)
          return range ? c.followers >= range.min && c.followers < range.max : true
        })
      return textMatch && locMatch && catMatch && platMatch && followerMatch
    })

    switch (sort) {
      case 'Followers':
        list = [...list].sort((a, b) => b.followers - a.followers)
        break
      case 'Engagement':
        list = [...list].sort((a, b) => b.engagementRate - a.engagementRate)
        break
      case 'Creator Score':
        list = [...list].sort((a, b) => b.creatorScore - a.creatorScore)
        break
      default:
        list = [...list].sort((a, b) => b.creatorScore * 0.5 + b.followers / 10000 - (a.creatorScore * 0.5 + a.followers / 10000))
    }
    return list
  }, [query, sort, location.selected, category.selected, followers.selected, platform.selected])

  const sections: FilterSection[] = [
    { key: 'location', title: 'Location', options: [...LOCATIONS], selected: location.selected, onToggle: location.toggle },
    { key: 'category', title: 'Category', options: [...CREATOR_CATEGORIES], selected: category.selected, onToggle: category.toggle },
    { key: 'followers', title: 'Follower range', options: FOLLOWER_RANGES.map((r) => r.label), selected: followers.selected, onToggle: followers.toggle },
    { key: 'platform', title: 'Platform', options: [...PLATFORMS], selected: platform.selected, onToggle: platform.toggle },
  ]

  const activeCount = location.selected.length + category.selected.length + followers.selected.length + platform.selected.length

  function resetAll() {
    location.reset()
    category.reset()
    followers.reset()
    platform.reset()
  }

  return (
    <>
      <SEO
        title={
          currentLocationName
            ? `${currentCategoryName ? `${currentCategoryName} ` : ''}Creators in ${currentLocationName} | Adsify Marketplace`
            : 'Find Influencers & Content Creators | Adsify'
        }
        description={`Discover curated ${currentCategoryName ? currentCategoryName.toLowerCase() : ''} creators in ${
          currentLocationName || 'Jaipur'
        } based on engagement rate, verified metrics, and audience demographics.`}
      />
      <section className="container-content pt-10 pb-6">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-teal-600 bg-teal-50 px-2.5 py-1 rounded">
            Curated Marketplace
          </span>
          {currentLocationName && (
            <span className="text-xs font-medium text-ink-soft bg-paper border border-line px-2.5 py-1 rounded flex items-center gap-1">
              <MapPin size={12} className="text-teal-500" /> {currentLocationName}
            </span>
          )}
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold">
          {currentLocationName
            ? `${currentCategoryName ? `${currentCategoryName} ` : ''}Creators in ${currentLocationName}`
            : 'Find Influencers & Content Creators'}
        </h1>
        <p className="mt-3 text-ink-soft max-w-xl text-sm sm:text-base">
          Discover verified local marketing talent in {currentLocationName || 'Jaipur'} tailored for brand collaborations with private contact protection.
        </p>

        {/* Location Quick Chips */}
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-2 border-t border-line/60">
          <span className="text-xs text-ink-faint font-medium mr-1">Popular Cities:</span>
          {LOCATIONS.map((loc) => {
            const isActive = location.selected.includes(loc)
            return (
              <Link
                key={loc}
                to={`/creators/${loc.toLowerCase()}`}
                className={`text-xs px-3 py-1 rounded-full border transition-all ${
                  isActive
                    ? 'bg-teal-500 text-white border-teal-500 font-medium'
                    : 'bg-white text-ink-soft border-line hover:border-teal-400'
                }`}
              >
                {loc}
              </Link>
            )
          })}
        </div>
      </section>

      <section className="container-content pb-24">
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1">
            <SearchBar value={query} onChange={setQuery} placeholder="Search by city, niche or creator..." />
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setDrawerOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-3 rounded-md border border-line text-sm"
            >
              <SlidersHorizontal size={16} />
              Filters {activeCount > 0 && `(${activeCount})`}
            </button>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="rounded-md border border-line bg-white px-3.5 py-3 text-sm"
              aria-label="Sort creators"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o} value={o}>Sort: {o}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid lg:grid-cols-[240px_1fr] gap-8">
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <FilterPanel sections={sections} onReset={resetAll} />
            </div>
          </aside>

          <div>
            <p className="text-sm text-ink-soft mb-4">{results.length} creators found</p>
            {results.length === 0 ? (
              <EmptyState onReset={() => { resetAll(); setQuery('') }} />
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {results.map((c) => (
                  <CreatorCard key={c.id} creator={c} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="Filters" side="bottom">
        <FilterPanel sections={sections} onReset={resetAll} />
        <button
          onClick={() => setDrawerOpen(false)}
          className="w-full mt-6 py-3 rounded bg-ink text-paper text-sm font-medium"
        >
          Show {results.length} results
        </button>
      </Drawer>
    </>
  )
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="hairline rounded-md bg-white p-10 text-center">
      <p className="font-medium">No creators match your filters.</p>
      <p className="mt-1.5 text-sm text-ink-soft">Try widening your search or clearing a filter.</p>
      <button onClick={onReset} className="mt-4 text-sm font-medium text-teal-500 hover:underline">
        Clear search & filters
      </button>
    </div>
  )
}
