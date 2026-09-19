import { Heart } from 'lucide-react'
import { useShortlist } from '@/hooks/useShortlist'

interface ProfileAvatarProps {
  id: string
  name: string
  avatarUrl: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function ProfileAvatar({ id, name, avatarUrl, className = '', size = 'md' }: ProfileAvatarProps) {
  const { isShortlisted, toggle } = useShortlist()
  const saved = isShortlisted(id)

  const sizeClass =
    size === 'sm' ? 'w-10 h-10' : size === 'lg' ? 'w-20 h-20 sm:w-24 sm:h-24' : 'w-12 h-12'

  return (
    <div className="relative group/avatar inline-block shrink-0">
      <div className="relative">
        <img
          src={avatarUrl}
          alt={name}
          className={`${sizeClass} rounded-full object-cover transition-all group-hover/avatar:ring-2 group-hover/avatar:ring-teal-500/80 group-hover/avatar:scale-105 ${className}`}
        />
        {saved && (
          <span className="absolute -bottom-0.5 -right-0.5 bg-teal-600 text-white p-1 rounded-full border-2 border-white shadow-sm flex items-center justify-center">
            <Heart size={10} fill="currentColor" />
          </span>
        )}
      </div>

      {/* Interactive Tooltip Badge on Hover / Drag / Focus */}
      <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 hidden group-hover/avatar:flex group-active/avatar:flex items-center gap-1.5 bg-slate-900 text-white text-[11px] font-medium px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap z-40 pointer-events-auto transition-all animate-in fade-in zoom-in-95">
        <Heart size={13} className={`shrink-0 ${saved ? 'text-teal-400 fill-teal-400' : 'text-teal-400 animate-pulse'}`} />
        <span>Click ♡ heart to {saved ? 'remove' : 'add'}</span>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            toggle(id)
          }}
          className={`ml-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded transition-colors ${
            saved ? 'bg-teal-700/60 text-teal-200 hover:bg-teal-700' : 'bg-teal-500 text-slate-900 hover:bg-teal-400'
          }`}
        >
          {saved ? 'Added ✓' : '+ Add'}
        </button>
      </div>
    </div>
  )
}
