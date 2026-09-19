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
            Talent Onboarding
          </span>
          <h1 className="text-3xl sm:text-4xl font-semibold mt-2">Get discovered by top brands.</h1>
          <p className="mt-3 text-ink-soft">
            Apply to join Adsify as a Creator, Video Editor, or Social Media Manager. Fill out the application form below.
          </p>
        </div>
        <div className="mt-10">
          <JoinForm />
        </div>
      </section>
    </>
  )
}
