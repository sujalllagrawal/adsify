import { useState, useEffect } from 'react'
import { SEO } from '@/components/ui/SEO'
import { CheckCircle2, XCircle, ShieldCheck, Eye, Search, Layers, FileText, UserCheck } from 'lucide-react'
import { CREATORS } from '@/data/creators'
import { EDITORS } from '@/data/editors'
import { SOCIAL_MANAGERS } from '@/data/socialManagers'
import { fetchApplications } from '@/lib/services'
import type { JoinFormData } from '@/types'

interface ApplicationMock {
  id: string
  submittedAt: string
  name: string
  city: string
  email: string
  type: string
  portfolio: string
  status: 'pending' | 'approved' | 'rejected'
}

export default function Admin() {
  const [activeTab, setActiveTab] = useState<'talent' | 'applications' | 'leads'>('talent')
  const [searchQuery, setSearchQuery] = useState('')
  const [talentList, setTalentList] = useState(() => {
    return [
      ...CREATORS.map((c) => ({ id: c.id, name: c.name, type: 'Creator', location: c.location, category: c.category, verified: c.verified, status: 'approved' })),
      ...EDITORS.map((e) => ({ id: e.id, name: e.name, type: 'Video Editor', location: e.location, category: e.specializations.join(', '), verified: e.verified, status: 'approved' })),
      ...SOCIAL_MANAGERS.map((s) => ({ id: s.id, name: s.name, type: 'Social Media Manager', location: s.location, category: s.industries.join(', '), verified: s.verified, status: 'approved' })),
    ]
  })

  const [applications, setApplications] = useState<ApplicationMock[]>([
    {
      id: 'app-101',
      submittedAt: '2026-09-15',
      name: 'Rohan Sharma',
      city: 'Jaipur',
      email: 'rohan.sharma@example.com',
      type: 'creator',
      portfolio: 'https://instagram.com/rohan_creates',
      status: 'pending',
    },
    {
      id: 'app-102',
      submittedAt: '2026-09-14',
      name: 'Priya Verma',
      city: 'Jaipur',
      email: 'priya.edits@example.com',
      type: 'editor',
      portfolio: 'https://behance.net/priyaverma',
      status: 'pending',
    },
    {
      id: 'app-103',
      submittedAt: '2026-09-12',
      name: 'Karan Malhotra',
      city: 'Delhi',
      email: 'karan@socialgrowth.com',
      type: 'social-media',
      portfolio: 'https://linkedin.com/in/karan-social',
      status: 'approved',
    },
  ])

  useEffect(() => {
    async function loadData() {
      const live = await fetchApplications()
      if (live && live.length > 0) {
        setApplications(live)
      }
    }
    loadData()
  }, [])

  function toggleVerification(id: string) {
    setTalentList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, verified: !item.verified } : item))
    )
  }

  function handleApplicationStatus(id: string, status: 'approved' | 'rejected') {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status } : app))
    )
  }

  const filteredTalent = talentList.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.type.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <>
      <SEO
        title="Admin Portal | Adsify Talent Moderation"
        description="Internal admin portal for approving talent applications, managing verification badges, and reviewing campaign leads."
      />
      <section className="container-content pt-10 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-brass-500 bg-brass-100/50 border border-brass-400/30 px-2.5 py-1 rounded">
              Adsify Control Center
            </span>
            <h1 className="text-3xl font-semibold mt-2">Admin Dashboard</h1>
            <p className="text-sm text-ink-soft mt-1">
              Review applicant submissions, manage Jaipur talent profiles, and moderate campaign requirement leads.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white p-1 rounded-md border border-line">
            <button
              onClick={() => setActiveTab('talent')}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                activeTab === 'talent' ? 'bg-ink text-paper' : 'text-ink-soft hover:text-ink'
              }`}
            >
              Talent Directory ({talentList.length})
            </button>
            <button
              onClick={() => setActiveTab('applications')}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                activeTab === 'applications' ? 'bg-ink text-paper' : 'text-ink-soft hover:text-ink'
              }`}
            >
              Applications ({applications.filter((a) => a.status === 'pending').length} pending)
            </button>
          </div>
        </div>
      </section>

      <section className="container-content pb-24">
        {activeTab === 'talent' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="relative w-full sm:w-72">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint" />
                <input
                  type="text"
                  placeholder="Filter talent by name or city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm rounded border border-line bg-white focus:outline-none focus:border-teal-500"
                />
              </div>
              <p className="text-xs text-ink-soft">Showing {filteredTalent.length} entries</p>
            </div>

            <div className="hairline rounded-lg bg-white overflow-x-auto shadow-card">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-paper border-b border-line text-ink-soft font-medium uppercase text-[11px] tracking-wider">
                  <tr>
                    <th className="p-3.5">Talent Name</th>
                    <th className="p-3.5">Type</th>
                    <th className="p-3.5">Location</th>
                    <th className="p-3.5">Verification</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {filteredTalent.slice(0, 15).map((talent) => (
                    <tr key={talent.id} className="hover:bg-teal-50/30 transition-colors">
                      <td className="p-3.5 font-medium text-ink flex items-center gap-2">
                        {talent.name}
                      </td>
                        <td className="p-3.5 text-ink-soft">{talent.type}</td>
                      <td className="p-3.5 text-ink-soft">{talent.location}</td>
                      <td className="p-3.5">
                        {talent.verified ? (
                          <span className="inline-flex items-center gap-1 text-xs text-teal-700 bg-teal-50 px-2 py-0.5 rounded font-medium">
                            <ShieldCheck size={14} /> Verified
                          </span>
                        ) : (
                          <span className="text-xs text-ink-faint">Standard</span>
                        )}
                      </td>
                      <td className="p-3.5">
                        <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                          Approved
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => toggleVerification(talent.id)}
                          className="text-xs font-medium text-teal-600 hover:text-teal-800 underline"
                        >
                          {talent.verified ? 'Revoke Verification' : 'Verify Talent'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Pending Talent Applications</h2>
            <div className="grid gap-4">
              {applications.map((app) => (
                <div key={app.id} className="hairline rounded-lg bg-white p-5 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-ink text-base">{app.name}</span>
                      <span className="text-xs font-mono bg-paper border border-line text-ink-soft px-2 py-0.5 rounded uppercase">
                        {app.type}
                      </span>
                      <span className="text-xs text-ink-faint">Submitted {app.submittedAt}</span>
                    </div>
                    <div className="mt-2 text-xs sm:text-sm text-ink-soft space-y-1">
                      <p>Location: <span className="font-medium text-ink">{app.city}</span></p>
                      <p>Portfolio Link: <a href={app.portfolio} target="_blank" rel="noreferrer" className="text-teal-600 hover:underline">{app.portfolio}</a></p>
                      <p className="text-ink-faint text-xs font-mono">Private Contact: {app.email} (Guarded by Adsify)</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-3 md:pt-0 border-t md:border-t-0 border-line">
                    {app.status === 'pending' ? (
                      <>
                        <button
                          onClick={() => handleApplicationStatus(app.id, 'approved')}
                          className="flex items-center gap-1 px-3 py-1.5 rounded bg-emerald-600 text-white text-xs font-medium hover:bg-emerald-700 transition-colors"
                        >
                          <CheckCircle2 size={14} /> Approve & Publish
                        </button>
                        <button
                          onClick={() => handleApplicationStatus(app.id, 'rejected')}
                          className="flex items-center gap-1 px-3 py-1.5 rounded border border-line text-xs font-medium text-ink-soft hover:text-red-600 hover:border-red-200 transition-colors"
                        >
                          <XCircle size={14} /> Reject
                        </button>
                      </>
                    ) : (
                      <span className={`text-xs px-2.5 py-1 rounded font-medium ${
                        app.status === 'approved' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                      }`}>
                        {app.status.toUpperCase()}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  )
}
