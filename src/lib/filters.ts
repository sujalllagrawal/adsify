export function matchesText(haystack: string, query: string) {
  if (!query.trim()) return true
  return haystack.toLowerCase().includes(query.trim().toLowerCase())
}

export function formatFollowers(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}K`
  return `${n}`
}

export function formatCurrency(n: number) {
  return `₹${n.toLocaleString('en-IN')}`
}
