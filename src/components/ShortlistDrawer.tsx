import { Link } from 'react-router-dom'
import { X, Trash2, Send, ArrowRight, Heart } from 'lucide-react'
import { Drawer } from '@/components/ui/Drawer'
import { useShortlist } from '@/hooks/useShortlist'
import { CREATORS } from '@/data/creators'
import { EDITORS } from '@/data/editors'
import { SOCIAL_MANAGERS } from '@/data/socialManagers'
import type { Talent } from '@/types'

const ALL_TALENT: Talent[] = [...CREATORS, ...EDITORS, ...SOCIAL_MANAGERS]

function getTalentTypeLabel(type: string): string {
  if (type === 'creator') return 'Creator'
  if (type === 'editor') return 'Video Editor'
  if (type === 'social-media') return 'Social Manager'
  return 'Talent'
}

interface ShortlistDrawerProps {
  open: boolean
  onClose: () => void
}

export function ShortlistDrawer({ open, onClose }: ShortlistDrawerProps) {
  const { ids, remove } = useShortlist()
  const talent = ALL_TALENT.filter((t) => ids.includes(t.id))

  function handleClearAll() {
    ids.forEach((id) => remove(id))
  }

  return (
    <Drawer open={open} onClose={onClose} title={`Saved Shortlist (${talent.length})`} side="right">
      {talent.length === 0 ? (
        <div className="text-center py-12 px-4 space-y-3">
          <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center mx-auto">
            <Heart size={24} />
          </div>
          <h3 className="font-semibold text-ink text-base">Your shortlist is empty</h3>
          <p className="text-xs text-ink-soft leading-relaxed max-w-xs mx-auto">
            Browse creators, editors, or social media managers and tap the ♡ heart icon to add them to your shortlist.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-2">
            <Link
              to="/creators"
              onClick={onClose}
              className="text-xs px-3 py-2 rounded bg-ink text-paper font-medium hover:bg-teal-600 transition-colors"
            >
              Browse Creators
            </Link>
            <Link
              to="/editors"
              onClick={onClose}
              className="text-xs px-3 py-2 rounded border border-line text-ink font-medium hover:border-teal-500 transition-colors"
            >
              Browse Editors
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-full space-y-4">
          <div className="flex items-center justify-between border-b border-line pb-2.5 shrink-0">
            <span className="text-xs font-medium text-ink-soft">
              {talent.length} {talent.length === 1 ? 'profile' : 'profiles'} saved
            </span>
            <button
              onClick={handleClearAll}
              className="text-xs text-ink-soft hover:text-red-600 flex items-center gap-1 transition-colors"
            >
              <Trash2 size={13} /> Clear All
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
            {talent.map((t) => (
              <div
                key={t.id}
                className="flex items-center justify-between gap-3 bg-white hairline rounded-lg p-3 shadow-sm hover:border-teal-300 transition-colors"
              >
                <Link
                  to={t.type === 'creator' ? `/creators/${t.id}` : t.type === 'editor' ? `/editors/${t.id}` : `/social-media/${t.id}`}
                  onClick={onClose}
                  className="flex items-center gap-3 min-w-0 flex-1 group"
                >
                  <img src={t.avatarUrl} alt={t.name} className="w-11 h-11 rounded-full object-cover shrink-0 border border-line" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-ink group-hover:text-teal-600 truncate transition-colors">
                      {t.name}
                    </p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[10px] font-mono font-medium uppercase bg-teal-50 text-teal-700 px-1.5 py-0.5 rounded">
                        {getTalentTypeLabel(t.type)}
                      </span>
                      <span className="text-xs text-ink-faint truncate">{t.location}</span>
                    </div>
                  </div>
                </Link>

                <button
                  onClick={() => remove(t.id)}
                  aria-label={`Remove ${t.name} from shortlist`}
                  title="Remove from shortlist"
                  className="flex items-center gap-1 text-xs font-medium text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 px-2.5 py-1.5 rounded transition-colors shrink-0"
                >
                  <X size={14} />
                  <span>Remove</span>
                </button>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-line space-y-2 shrink-0">
            <Link
              to="/submit-requirement"
              onClick={onClose}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded bg-ink text-paper text-sm font-medium hover:bg-teal-600 transition-colors shadow-sm"
            >
              <Send size={15} /> Post Requirement with Shortlist ({talent.length})
            </Link>
            <Link
              to="/shortlist"
              onClick={onClose}
              className="flex items-center justify-center gap-1 w-full py-2 rounded text-xs font-medium text-ink-soft hover:text-ink transition-colors"
            >
              View Full Shortlist Manager <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      )}
    </Drawer>
  )
}

