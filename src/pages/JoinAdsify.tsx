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
          <h1 className="text-3xl sm:text-4xl font-semibold">Get discovered by brands.</h1>
          <p className="mt-3 text-ink-soft">
            Join Adsify and showcase your work to businesses looking for marketing talent.
          </p>
        </div>
        <div className="mt-10">
          <JoinForm />
        </div>
      </section>
    </>
  )
}
