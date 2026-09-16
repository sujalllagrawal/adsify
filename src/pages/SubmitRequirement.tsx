import { SEO } from '@/components/ui/SEO'
import { RequirementForm } from '@/components/forms/RequirementForm'

export default function SubmitRequirement() {
  return (
    <>
      <SEO
        title="Post a Requirement | Adsify"
        description="Share your campaign requirements and the Adsify team will find the right marketing talent for you."
      />
      <section className="container-content pt-12 pb-24">
        <div className="max-w-2xl">
          <h1 className="text-3xl sm:text-4xl font-semibold">Tell us what you need.</h1>
          <p className="mt-3 text-ink-soft">
            Share your campaign requirements and our team will find the right talent for you.
          </p>
        </div>
        <div className="mt-10">
          <RequirementForm />
        </div>
      </section>
    </>
  )
}
