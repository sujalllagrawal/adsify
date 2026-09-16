import { LinkButton } from '@/components/ui/Button'
import { SEO } from '@/components/ui/SEO'

export default function NotFound() {
  return (
    <>
      <SEO title="Page not found | Adsify" description="The page you're looking for doesn't exist." />
      <section className="container-content py-32 text-center">
        <h1 className="text-3xl font-semibold">Page not found</h1>
        <p className="mt-3 text-ink-soft">The page you're looking for doesn't exist or has moved.</p>
        <LinkButton to="/" className="mt-6 inline-flex">Back to home</LinkButton>
      </section>
    </>
  )
}
