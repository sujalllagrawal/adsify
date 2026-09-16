import { BadgeCheck } from 'lucide-react'

export function VerifiedBadge({ label = 'Verified' }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium text-teal-500">
      <BadgeCheck size={14} strokeWidth={2.25} />
      {label}
    </span>
  )
}

export function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-sm border border-line bg-white px-2.5 py-1 text-xs text-ink-soft">
      {children}
    </span>
  )
}
