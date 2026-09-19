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
    <div className="relative group/heart shrink-0">
      <button
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          toggle(id)
        }}
        aria-pressed={saved}
        aria-label={saved ? `Remove ${name} from shortlist` : `Shortlist ${name}`}
        title={saved ? `Remove ${name} from shortlist` : `Click ♡ to add ${name} to shortlist`}
        className={`inline-flex items-center gap-1.5 rounded border transition-all ${dimension} ${
          saved
            ? 'border-teal-500 text-teal-500 bg-teal-50 shadow-sm'
            : 'border-line text-ink-soft hover:text-teal-600 hover:border-teal-400 hover:bg-teal-50/60'
        }`}
      >
        <Heart size={16} fill={saved ? 'currentColor' : 'none'} className={saved ? 'scale-110' : 'transition-transform group-hover/heart:scale-110'} />
        {size === 'md' && <span className="text-sm font-medium">{saved ? 'Shortlisted' : 'Shortlist'}</span>}
      </button>

      {/* Hover/Drag Tooltip hint */}
      <div className="absolute right-0 top-full mt-1.5 hidden group-hover/heart:flex items-center gap-1.5 bg-slate-900 text-white text-[11px] font-medium px-2.5 py-1 rounded-md shadow-xl whitespace-nowrap z-40 pointer-events-none transition-all animate-in fade-in duration-150">
        <Heart size={12} className={`shrink-0 ${saved ? 'text-teal-400 fill-teal-400' : 'text-teal-400 animate-pulse'}`} />
        <span>{saved ? 'Click to remove from shortlist' : 'Click ♡ to add to shortlist'}</span>
      </div>
    </div>
  )
}

