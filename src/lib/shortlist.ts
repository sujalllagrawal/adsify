const STORAGE_KEY = 'adsify:shortlist'

export function readShortlist(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as string[]) : []
  } catch {
    return []
  }
}

export function writeShortlist(ids: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
  } catch {
    // storage unavailable — fail silently for V1
  }
}

export const SHORTLIST_EVENT = 'adsify:shortlist-changed'
