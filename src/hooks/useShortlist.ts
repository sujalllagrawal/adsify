import { useCallback, useEffect, useState } from 'react'
import { readShortlist, writeShortlist, SHORTLIST_EVENT } from '@/lib/shortlist'

export function useShortlist() {
  const [ids, setIds] = useState<string[]>(() => readShortlist())

  useEffect(() => {
    const sync = () => setIds(readShortlist())
    window.addEventListener(SHORTLIST_EVENT, sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener(SHORTLIST_EVENT, sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  const toggle = useCallback((id: string) => {
    setIds((prev) => {
      const next = prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      writeShortlist(next)
      window.dispatchEvent(new Event(SHORTLIST_EVENT))
      return next
    })
  }, [])

  const remove = useCallback((id: string) => {
    setIds((prev) => {
      const next = prev.filter((i) => i !== id)
      writeShortlist(next)
      window.dispatchEvent(new Event(SHORTLIST_EVENT))
      return next
    })
  }, [])

  const isShortlisted = useCallback((id: string) => ids.includes(id), [ids])

  return { ids, toggle, remove, isShortlisted }
}
