import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { SEO } from '@/components/ui/SEO'
import { useShortlist } from '@/hooks/useShortlist'
import { CREATORS } from '@/data/creators'
import { EDITORS } from '@/data/editors'
import { SOCIAL_MANAGERS } from '@/data/socialManagers'
import { CreatorCard } from '@/components/creators/CreatorCard'
import { EditorCard } from '@/components/editors/EditorCard'
import { SocialManagerCard } from '@/components/social-media/SocialManagerCard'
import { Trash2, Send, Heart, ArrowRight } from 'lucide-react'

export default function Shortlist() {
  const { ids, remove } = useShortlist()

  const shortlistedTalent = useMemo(() => {
    const creators = CREATORS.filter((c) => ids.includes(c.id))
    const editors = EDITORS.filter((e) => ids.includes(e.id))
    const socialManagers = SOCIAL_MANAGERS.filter((s) => ids.includes(s.id))
    return { creators, editors, socialManagers, total: creators.length + editors.length + socialManagers.length }
  }, [ids])

  function handleClearAll() {
    ids.forEach((id) => remove(id))
  }

  return (
    <>
      <SEO
        title="Your Saved Shortlist | Adsify Talent Marketplace"
        description="Review your shortlisted creators, video editors, and social media managers and submit campaign requirements."
      />
      <section className="container-content pt-12 pb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-line pb-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-teal-600 bg-teal-50 px-2.5 py-1 rounded">
              Shortlist Manager
            </span>
            <h1 className="text-3xl sm:text-4xl font-semibold mt-2">Saved Talent ({shortlistedTalent.total})</h1>
            <p className="mt-1.5 text-ink-soft text-sm sm:text-base max-w-xl">
              Compare shortlisted profiles and send a unified campaign requirement directly to the Adsify campaign team.
            </p>
          </div>
          {shortlistedTalent.total > 0 && (
            <div className="flex items-center gap-3">
              <button
                onClick={handleClearAll}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded border border-line text-sm text-ink-soft hover:text-red-600 hover:border-red-200 transition-colors"
              >
                <Trash2 size={16} /> Clear All
              </button>
              <Link
                to="/submit-requirement"
                className="flex items-center gap-2 px-5 py-2.5 rounded bg-ink text-paper text-sm font-medium hover:bg-teal-600 transition-colors"
              >
                <Send size={16} /> Submit Requirement
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="container-content pb-24">
        {shortlistedTalent.total === 0 ? (
          <div className="hairline rounded-lg bg-white p-12 text-center max-w-xl mx-auto my-8 shadow-card">
            <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center mx-auto mb-4">
              <Heart size={24} />
            </div>
            <h2 className="text-xl font-semibold text-ink">Your shortlist is empty</h2>
            <p className="mt-2 text-sm text-ink-soft">
              Browse Jaipur creators, editors, and social media managers and click the heart icon to save talent for your campaign.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
              <Link
                to="/creators"
                className="px-4 py-2.5 rounded bg-ink text-paper text-sm font-medium hover:bg-teal-600 transition-colors"
              >
                Browse Creators
              </Link>
              <Link
                to="/editors"
                className="px-4 py-2.5 rounded border border-line text-sm font-medium text-ink hover:border-teal-500 transition-colors"
              >
                Browse Editors
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Creators Section */}
            {shortlistedTalent.creators.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  Creators <span className="text-xs bg-teal-50 text-teal-600 font-mono px-2 py-0.5 rounded-full">{shortlistedTalent.creators.length}</span>
                </h2>
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {shortlistedTalent.creators.map((creator) => (
                    <CreatorCard key={creator.id} creator={creator} />
                  ))}
                </div>
              </div>
            )}

            {/* Editors Section */}
            {shortlistedTalent.editors.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  Video Editors <span className="text-xs bg-teal-50 text-teal-600 font-mono px-2 py-0.5 rounded-full">{shortlistedTalent.editors.length}</span>
                </h2>
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {shortlistedTalent.editors.map((editor) => (
                    <EditorCard key={editor.id} editor={editor} />
                  ))}
                </div>
              </div>
            )}

            {/* Social Managers Section */}
            {shortlistedTalent.socialManagers.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  Social Media Managers <span className="text-xs bg-teal-50 text-teal-600 font-mono px-2 py-0.5 rounded-full">{shortlistedTalent.socialManagers.length}</span>
                </h2>
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {shortlistedTalent.socialManagers.map((manager) => (
                    <SocialManagerCard key={manager.id} manager={manager} />
                  ))}
                </div>
              </div>
            )}

            <div className="hairline rounded-lg bg-teal-50 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold text-teal-900">Ready to initiate your campaign?</h3>
                <p className="text-xs sm:text-sm text-teal-700 mt-1">
                  Submit campaign details with your {shortlistedTalent.total} shortlisted talent items. Adsify keeps all talent contact information private while managing campaign execution.
                </p>
              </div>
              <Link
                to="/submit-requirement"
                className="whitespace-nowrap px-5 py-3 rounded bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 transition-colors flex items-center gap-2 shadow-sm"
              >
                Proceed with Requirement <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        )}
      </section>
    </>
  )
}
