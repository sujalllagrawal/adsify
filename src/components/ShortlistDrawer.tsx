import { Link } from 'react-router-dom'
import { X } from 'lucide-react'
import { Drawer } from '@/components/ui/Drawer'
import { useShortlist } from '@/hooks/useShortlist'
import { CREATORS } from '@/data/creators'
import { EDITORS } from '@/data/editors'
import { SOCIAL_MANAGERS } from '@/data/socialManagers'
import type { Talent } from '@/types'

const ALL_TALENT: Talent[] = [...CREATORS, ...EDITORS, ...SOCIAL_MANAGERS]

interface ShortlistDrawerProps {
  open: boolean
  onClose: () => void
}

export function ShortlistDrawer({ open, onClose }: ShortlistDrawerProps) {
  const { ids, remove } = useShortlist()
  const talent = ALL_TALENT.filter((t) => ids.includes(t.id))

  return (
    <Drawer open={open} onClose={onClose} title={`Shortlist (${talent.length})`} side="right">
      {talent.length === 0 ? (
        <p className="text-sm text-ink-soft py-6">
          Nothing shortlisted yet. Browse creators, editors or social media managers and tap the heart
          icon to save them here.
        </p>
      ) : (
        <div className="space-y-3">
          {talent.map((t) => (
            <div key={t.id} className="flex items-center gap-3 hairline rounded-md p-3">
              <img src={t.avatarUrl} alt="" className="w-11 h-11 rounded-full object-cover" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium truncate">{t.name}</p>
                <p className="text-xs text-ink-soft truncate">{t.location}</p>
              </div>
              <button
                onClick={() => remove(t.id)}
                aria-label={`Remove ${t.name} from shortlist`}
                className="p-1.5 text-ink-faint hover:text-ink"
              >
                <X size={16} />
              </button>
            </div>
          ))}
          <Link
            to="/submit-requirement"
            onClick={onClose}
            className="block text-center mt-5 py-3 rounded bg-ink text-paper text-sm font-medium hover:bg-teal-600 transition-colors"
          >
            Submit requirement for shortlist
          </Link>
        </div>
      )}
    </Drawer>
  )
}
