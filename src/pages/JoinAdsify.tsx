import { SEO } from '@/components/ui/SEO'
import { JoinForm } from '@/components/forms/JoinForm'

export default function JoinAdsify() {
  return (
    <>
      <SEO
        title="Join Adsify — Get Discovered by Brands"
        description="Join Adsify and showcase your work to businesses looking for marketing talent."
      />
      <section className="container-content pt-12 pb-24">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-teal-600 bg-teal-50 px-2.5 py-1 rounded">
            Talent Portal
          </span>
          <h1 className="text-3xl sm:text-4xl font-semibold mt-2">Get discovered & managed by top brands.</h1>
          <p className="mt-3 text-ink-soft">
            Apply to join Adsify or edit your existing profile. Note: Any profile edits or new submissions are re-checked & re-verified by our admin team before publishing.
          </p>

          <div className="mt-4 p-3 bg-paper border border-line rounded-md text-xs text-ink-soft flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-500 shrink-0 animate-pulse" />
            <span>Profile edits undergo manual re-verification to maintain top-tier talent quality for advertising brands.</span>
          </div>
        </div>
        <div className="mt-10">
          <JoinForm />
        </div>
      </section>
    </>
  )
}
