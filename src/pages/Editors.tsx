import { useMemo, useState } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import { SEO } from '@/components/ui/SEO'
import { SearchBar } from '@/components/SearchBar'
import { FilterPanel, FilterSection } from '@/components/FilterPanel'
import { EditorCard } from '@/components/editors/EditorCard'
import { Drawer } from '@/components/ui/Drawer'
import { EDITORS } from '@/data/editors'
import { LOCATIONS, EDITOR_SPECIALIZATIONS, EDITOR_SOFTWARE, EXPERIENCE_RANGES, EDITOR_PRICE_RANGES } from '@/data/constants'
import { matchesText } from '@/lib/filters'

function useMultiSelect() {
  const [selected, setSelected] = useState<string[]>([])
  const toggle = (v: string) => setSelected((prev) => (prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]))
  return { selected, toggle, reset: () => setSelected([]) }
}

export default function Editors() {
  const [query, setQuery] = useState('')
  const [drawerOpen, setDrawerOpen] = useState(false)

  const location = useMultiSelect()
  const specialization = useMultiSelect()
  const software = useMultiSelect()
  const experience = useMultiSelect()
  const budget = useMultiSelect()

  const results = useMemo(() => {
    return EDITORS.filter((e) => {
      const textMatch = matchesText(`${e.name} ${e.location} ${e.specializations.join(' ')}`, query)
      const locMatch = location.selected.length === 0 || location.selected.includes(e.location)
      const specMatch = specialization.selected.length === 0 || e.specializations.some((s) => specialization.selected.includes(s))
      const softMatch = software.selected.length === 0 || e.software.some((s) => software.selected.includes(s))
      const expMatch =
        experience.selected.length === 0 ||
        experience.selected.some((label) => {
          const range = EXPERIENCE_RANGES.find((r) => r.label === label)
          return range ? e.experienceYears >= range.min && e.experienceYears <= range.max : true
        })
      const budgetMatch =
        budget.selected.length === 0 ||
        budget.selected.some((label) => {
          const range = EDITOR_PRICE_RANGES.find((r) => r.label === label)
          return range ? e.startingPrice >= range.min && e.startingPrice < range.max : true
        })
      return textMatch && locMatch && specMatch && softMatch && expMatch && budgetMatch
    })
  }, [query, location.selected, specialization.selected, software.selected, experience.selected, budget.selected])

  const sections: FilterSection[] = [
    { key: 'location', title: 'Location', options: [...LOCATIONS], selected: location.selected, onToggle: location.toggle },
    { key: 'specialization', title: 'Specialization', options: [...EDITOR_SPECIALIZATIONS], selected: specialization.selected, onToggle: specialization.toggle },
    { key: 'software', title: 'Software', options: [...EDITOR_SOFTWARE], selected: software.selected, onToggle: software.toggle },
    { key: 'experience', title: 'Experience', options: EXPERIENCE_RANGES.map((r) => r.label), selected: experience.selected, onToggle: experience.toggle },
    { key: 'budget', title: 'Budget', options: EDITOR_PRICE_RANGES.map((r) => r.label), selected: budget.selected, onToggle: budget.toggle },
  ]

  const activeCount = [location, specialization, software, experience, budget].reduce((sum, s) => sum + s.selected.length, 0)

  function resetAll() {
    location.reset(); specialization.reset(); software.reset(); experience.reset(); budget.reset()
  }

  return (
    <>
      <SEO
        title="Find Video Editors | Adsify"
        description="Discover editors based on style, experience, software and portfolio."
      />
      <section className="container-content pt-12 pb-6">
        <h1 className="text-3xl sm:text-4xl font-semibold">Find Video Editors</h1>
        <p className="mt-3 text-ink-soft max-w-xl">
          Discover editors based on location, specialization, software and experience.
        </p>
      </section>

      <section className="container-content pb-24">
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1">
            <SearchBar value={query} onChange={setQuery} placeholder="Search by name, city or specialization..." />
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
            <p className="text-sm text-ink-soft mb-4">{results.length} editors found</p>
            {results.length === 0 ? (
              <div className="hairline rounded-md bg-white p-10 text-center">
                <p className="font-medium">No editors match your filters.</p>
                <button onClick={() => { resetAll(); setQuery('') }} className="mt-4 text-sm font-medium text-teal-500 hover:underline">
                  Clear search & filters
                </button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {results.map((e) => (
                  <EditorCard key={e.id} editor={e} />
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
