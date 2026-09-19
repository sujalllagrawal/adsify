import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

interface DrawerProps {
  open: boolean
  onClose: () => void
  title?: string
  side?: 'left' | 'right' | 'bottom'
  children: React.ReactNode
}

export function Drawer({ open, onClose, title, side = 'right', children }: DrawerProps) {
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
      ? 'inset-x-0 bottom-0 max-h-[85vh] rounded-t-xl'
      : side === 'left'
      ? 'inset-y-0 left-0 h-full w-full max-w-md'
      : 'inset-y-0 right-0 h-full w-full max-w-full sm:max-w-[440px]'

  const content = (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Container Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`relative z-10 bg-white shadow-2xl flex flex-col h-full overflow-hidden border-l border-line ${positionClass}`}
      >
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-line bg-paper shrink-0">
          {title && <h3 className="text-base sm:text-lg font-semibold text-ink">{title}</h3>}
          <button
            onClick={onClose}
            aria-label="Close"
            className="ml-auto p-1.5 text-ink-soft hover:text-ink hover:bg-black/5 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-5">{children}</div>
      </div>
    </div>
  )

  return createPortal(content, document.body)
}

