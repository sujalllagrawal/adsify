import { ShieldCheck, Sparkles, Users2, Building2 } from 'lucide-react'
import { SEO } from '@/components/ui/SEO'
import { LinkButton } from '@/components/ui/Button'

export default function About() {
  return (
    <>
      <SEO
        title="About Adsify — Curated Marketing Talent"
        description="What Adsify is, how curation and privacy work, and how brands and professionals benefit."
      />

      <section className="container-content pt-16 pb-16 max-w-2xl">
        <p className="text-sm text-teal-500 font-medium mb-4">About Adsify</p>
        <h1 className="text-3xl sm:text-4xl font-semibold leading-tight">
          A curated marketplace for marketing talent — not another influencer list.
        </h1>
        <p className="mt-5 text-ink-soft leading-relaxed">
          Adsify connects brands and agencies with content creators, video editors and social media
          managers. Every profile is reviewed before it goes live, and every introduction is handled
          by Adsify — so brands get quality without the noise, and professionals get discovered
          without giving up their privacy.
        </p>
      </section>

      <section className="border-y border-line bg-white">
        <div className="container-content py-16 grid sm:grid-cols-2 gap-8">
          <div className="hairline rounded-md p-7">
            <Sparkles size={20} className="text-teal-500" />
            <h2 className="mt-4 text-lg font-medium">How curation works</h2>
            <p className="mt-2 text-sm text-ink-soft leading-relaxed">
              Every applicant is reviewed for portfolio quality, audience authenticity and past
              collaboration history before being approved. Adsify would rather list fewer profiles
              than list the wrong ones.
            </p>
          </div>
          <div className="hairline rounded-md p-7">
            <ShieldCheck size={20} className="text-teal-500" />
            <h2 className="mt-4 text-lg font-medium">How privacy works</h2>
            <p className="mt-2 text-sm text-ink-soft leading-relaxed">
              Talent contact details are never shown publicly. Brands submit a requirement, Adsify
              reviews it, and the introduction happens through Adsify — so every conversation starts
              professionally, on both sides.
            </p>
          </div>
        </div>
      </section>

      <section className="container-content py-16 grid sm:grid-cols-2 gap-8">
        <div>
          <Building2 size={20} className="text-teal-500" />
          <h2 className="mt-4 text-lg font-medium">For brands</h2>
          <p className="mt-2 text-sm text-ink-soft leading-relaxed">
            Skip the manual DM outreach and unreliable spreadsheets. Filter by location, category and
            performance, shortlist who fits, and let Adsify manage the introduction and logistics.
          </p>
        </div>
        <div>
          <Users2 size={20} className="text-teal-500" />
          <h2 className="mt-4 text-lg font-medium">For professionals</h2>
          <p className="mt-2 text-sm text-ink-soft leading-relaxed">
            Get discovered by serious brands without publishing your phone number or email anywhere.
            Showcase your portfolio, set your services, and let requirements come to you.
          </p>
        </div>
      </section>

      <section className="container-content pb-24">
        <div className="hairline rounded-md bg-white p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-semibold">Ready to get started?</h2>
            <p className="mt-1.5 text-sm text-ink-soft">Explore talent, or apply to be discovered.</p>
          </div>
          <div className="flex gap-3">
            <LinkButton to="/creators" variant="secondary">Explore Talent</LinkButton>
            <LinkButton to="/join-adsify">Join Adsify</LinkButton>
          </div>
        </div>
      </section>
    </>
  )
}
