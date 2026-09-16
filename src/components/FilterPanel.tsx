export interface FilterSection {
  key: string
  title: string
  options: string[]
  selected: string[]
  onToggle: (option: string) => void
}

interface FilterPanelProps {
  sections: FilterSection[]
  onReset: () => void
}

export function FilterPanel({ sections, onReset }: FilterPanelProps) {
  const activeCount = sections.reduce((sum, s) => sum + s.selected.length, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Filters</h3>
        {activeCount > 0 && (
          <button onClick={onReset} className="text-xs text-teal-500 hover:underline">
            Clear all ({activeCount})
          </button>
        )}
      </div>

      {sections.map((section) => (
        <fieldset key={section.key}>
          <legend className="text-xs font-medium text-ink-soft mb-2.5">{section.title}</legend>
          <div className="flex flex-wrap gap-2">
            {section.options.map((option) => {
              const active = section.selected.includes(option)
              return (
                <button
                  key={option}
                  type="button"
                  aria-pressed={active}
                  onClick={() => section.onToggle(option)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                    active
                      ? 'border-teal-500 bg-teal-50 text-teal-600'
                      : 'border-line text-ink-soft hover:border-ink/30 hover:text-ink'
                  }`}
                >
                  {option}
                </button>
              )
            })}
          </div>
        </fieldset>
      ))}
    </div>
  )
}
