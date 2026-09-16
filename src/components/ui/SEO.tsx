import { useEffect } from 'react'

interface SEOProps {
  title: string
  description: string
}

export function SEO({ title, description }: SEOProps) {
  useEffect(() => {
    const prevTitle = document.title
    document.title = title

    let meta = document.querySelector('meta[name="description"]')
    const prevDescription = meta?.getAttribute('content') ?? ''
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'description')
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', description)

    return () => {
      document.title = prevTitle
      meta?.setAttribute('content', prevDescription)
    }
  }, [title, description])

  return null
}
