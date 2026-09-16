import { Link } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import type { Creator } from '@/types'
import { VerifiedBadge } from '@/components/ui/Badge'
import { ShortlistButton } from '@/components/ShortlistButton'
import { formatFollowers } from '@/lib/filters'

export function CreatorCard({ creator }: { creator: Creator }) {
  return (
    <Link
      to={`/creators/${creator.id}`}
      className="group block hairline rounded-md bg-white p-4 transition-shadow hover:shadow-lift"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3 min-w-0">
          <img
            src={creator.avatarUrl}
            alt=""
            className="w-12 h-12 rounded-full object-cover shrink-0"
          />
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="font-medium text-[15px] truncate">{creator.name}</h3>
            </div>
            {creator.verified && <VerifiedBadge />}
          </div>
        </div>
        <ShortlistButton id={creator.id} name={creator.name} />
      </div>

      <div className="mt-3 flex items-center gap-1.5 text-xs text-ink-soft">
        <MapPin size={13} />
        {creator.location}
        <span className="mx-1 text-line">·</span>
        {creator.category}
      </div>

      <p className="mt-2.5 text-sm text-ink-soft leading-relaxed line-clamp-2">{creator.bio}</p>

      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-line pt-3">
        <div>
          <p className="text-sm font-semibold">{formatFollowers(creator.followers)}</p>
          <p className="text-[11px] text-ink-faint">Followers</p>
        </div>
        <div>
          <p className="text-sm font-semibold">{creator.engagementRate}%</p>
          <p className="text-[11px] text-ink-faint">Engagement</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-teal-500">{creator.creatorScore}</p>
          <p className="text-[11px] text-ink-faint">Creator Score</p>
        </div>
      </div>
    </Link>
  )
}
