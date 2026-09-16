import { Heart } from 'lucide-react'
import { useShortlist } from '@/hooks/useShortlist'

interface ShortlistButtonProps {
  id: string
  name: string
  size?: 'sm' | 'md'
}

export function ShortlistButton({ id, name, size = 'sm' }: ShortlistButtonProps) {
  const { isShortlisted, toggle } = useShortlist()
  const saved = isShortlisted(id)
  const dimension = size === 'sm' ? 'p-2' : 'px-4 py-2.5'

  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggle(id)
      }}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${name} from shortlist` : `Shortlist ${name}`}
      className={`inline-flex items-center gap-1.5 rounded border transition-colors ${dimension} ${
        saved ? 'border-teal-500 text-teal-500 bg-teal-50' : 'border-line text-ink-soft hover:text-ink hover:border-ink/30'
      }`}
    >
      <Heart size={16} fill={saved ? 'currentColor' : 'none'} />
      {size === 'md' && <span className="text-sm">{saved ? 'Shortlisted' : 'Shortlist'}</span>}
    </button>
  )
}
