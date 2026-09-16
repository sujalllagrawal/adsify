import { PlayCircle } from 'lucide-react'
import type { PortfolioItem } from '@/types'

export function PortfolioGrid({ items }: { items: PortfolioItem[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {items.map((item) => (
        <figure key={item.id} className="group relative aspect-[4/5] overflow-hidden rounded-md hairline">
          <img
            src={item.imageUrl}
            alt={item.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
          />
          {item.type === 'video' && (
            <div className="absolute inset-0 flex items-center justify-center bg-ink/10">
              <PlayCircle className="text-white drop-shadow" size={32} />
            </div>
          )}
          {item.brand && (
            <figcaption className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-ink/70 to-transparent text-white text-xs px-2 py-2">
              {item.brand}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  )
}
