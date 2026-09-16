import React, { useEffect } from 'react'
import { X } from 'lucide-react'

interface DrawerProps {
  open: boolean
  onClose: () => void
  title?: string
  side?: 'left' | 'right' | 'bottom'
  children: React.ReactNode
}

export function Drawer({ open, onClose, title, side = 'bottom', children }: DrawerProps) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  const positionClass =
    side === 'bottom'
      ? 'inset-x-0 bottom-0 max-h-[85vh] rounded-t-md'
      : side === 'left'
      ? 'inset-y-0 left-0 h-full w-full max-w-sm'
      : 'inset-y-0 right-0 h-full w-full max-w-sm'

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-ink/40" onClick={onClose} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`absolute bg-white hairline shadow-lift overflow-y-auto p-5 ${positionClass}`}
      >
        <div className="flex items-center justify-between mb-4 sticky top-0 bg-white pb-2">
          {title && <h3 className="text-base font-semibold">{title}</h3>}
          <button onClick={onClose} aria-label="Close" className="ml-auto text-ink-soft hover:text-ink p-1 rounded">
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
