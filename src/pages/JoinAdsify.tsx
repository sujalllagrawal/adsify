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
            Apply to join Adsify as a Creator, Video Editor, or Social Media Manager. Fill out the application form below or use our official Google Form.
          </p>

          <div className="mt-6 hairline rounded-lg bg-teal-50/70 p-4 border border-teal-200/60 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold text-teal-900">Prefer applying via Google Form?</p>
              <p className="text-xs text-teal-700 mt-0.5">Use our official Google Form to submit your application details directly.</p>
            </div>
            <a
              href="https://docs.google.com/forms/d/1ghTqL9kEEV0O7PretEaYF1jvSEti-GECl3meDNyPtmc/viewform"
              target="_blank"
              rel="noreferrer"
              className="shrink-0 px-4 py-2 rounded bg-teal-600 text-white text-xs font-medium hover:bg-teal-700 transition-colors shadow-sm"
            >
              Open Official Google Form →
            </a>
          </div>
        </div>
        <div className="mt-10">
          <JoinForm />
        </div>
      </section>
    </>
  )
}
