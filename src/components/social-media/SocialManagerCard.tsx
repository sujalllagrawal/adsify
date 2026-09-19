import { Link } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import type { SocialManager } from '@/types'
import { VerifiedBadge, Pill } from '@/components/ui/Badge'
import { ProfileAvatar } from '@/components/ui/ProfileAvatar'
import { ShortlistButton } from '@/components/ShortlistButton'
import { formatCurrency } from '@/lib/filters'

export function SocialManagerCard({ manager }: { manager: SocialManager }) {
  return (
    <Link
      to={`/social-media/${manager.id}`}
      className="group block hairline rounded-md bg-white p-4 transition-shadow hover:shadow-lift"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3 min-w-0">
          <ProfileAvatar id={manager.id} name={manager.name} avatarUrl={manager.avatarUrl} />
          <div className="min-w-0">
            <h3 className="font-medium text-[15px] truncate">{manager.name}</h3>
            {manager.verified && <VerifiedBadge />}
          </div>
        </div>
        <ShortlistButton id={manager.id} name={manager.name} />
      </div>

      <div className="mt-3 flex items-center gap-1.5 text-xs text-ink-soft">
        <MapPin size={13} />
        {manager.location}
        <span className="mx-1 text-line">·</span>
        {manager.experienceYears} yrs experience
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {manager.industries.slice(0, 3).map((s) => (
          <Pill key={s}>{s}</Pill>
        ))}
      </div>

      {manager.caseStudies[0] && (
        <p className="mt-3 text-xs text-teal-500 font-medium">
          {manager.caseStudies[0].result} — {manager.caseStudies[0].brand}
        </p>
      )}

      <div className="mt-3.5 flex items-center justify-between border-t border-line pt-3 text-sm">
        <span className="text-ink-soft">From / month</span>
        <span className="font-semibold">{formatCurrency(manager.monthlyStartingPrice)}</span>
      </div>
    </Link>
  )
}
