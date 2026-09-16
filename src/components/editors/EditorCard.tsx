import { Link } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import type { Editor } from '@/types'
import { VerifiedBadge, Pill } from '@/components/ui/Badge'
import { ShortlistButton } from '@/components/ShortlistButton'
import { formatCurrency } from '@/lib/filters'

export function EditorCard({ editor }: { editor: Editor }) {
  return (
    <Link
      to={`/editors/${editor.id}`}
      className="group block hairline rounded-md bg-white p-4 transition-shadow hover:shadow-lift"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3 min-w-0">
          <img src={editor.avatarUrl} alt="" className="w-12 h-12 rounded-full object-cover shrink-0" />
          <div className="min-w-0">
            <h3 className="font-medium text-[15px] truncate">{editor.name}</h3>
            {editor.verified && <VerifiedBadge />}
          </div>
        </div>
        <ShortlistButton id={editor.id} name={editor.name} />
      </div>

      <div className="mt-3 flex items-center gap-1.5 text-xs text-ink-soft">
        <MapPin size={13} />
        {editor.location}
        <span className="mx-1 text-line">·</span>
        {editor.experienceYears} yrs experience
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {editor.specializations.slice(0, 3).map((s) => (
          <Pill key={s}>{s}</Pill>
        ))}
      </div>

      <div className="mt-3 grid grid-cols-3 gap-1">
        {editor.portfolio.slice(0, 3).map((p) => (
          <img key={p.id} src={p.imageUrl} alt="" loading="lazy" className="aspect-square rounded-sm object-cover" />
        ))}
      </div>

      <div className="mt-3.5 flex items-center justify-between border-t border-line pt-3 text-sm">
        <span className="text-ink-soft">Starting from</span>
        <span className="font-semibold">{formatCurrency(editor.startingPrice)}</span>
      </div>
    </Link>
  )
}
