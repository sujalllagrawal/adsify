interface StatsCardProps {
  label: string
  value: string
}

export function StatsCard({ label, value }: StatsCardProps) {
  return (
    <div className="hairline rounded-md p-4 bg-white">
      <p className="text-2xl font-display font-semibold text-ink">{value}</p>
      <p className="text-xs text-ink-soft mt-1">{label}</p>
    </div>
  )
}
