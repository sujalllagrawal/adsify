import { useState, useEffect } from 'react'
import { SEO } from '@/components/ui/SEO'
import { CheckCircle2, XCircle, ShieldCheck, Eye, Search, Layers, FileText, UserCheck } from 'lucide-react'
import { CREATORS } from '@/data/creators'
import { EDITORS } from '@/data/editors'
import { SOCIAL_MANAGERS } from '@/data/socialManagers'
import { fetchApplications, submitTalentApplication, type ApplicationRecord } from '@/lib/services'
import type { JoinFormData } from '@/types'

export default function Admin() {
  const [activeTab, setActiveTab] = useState<'talent' | 'applications' | 'google-forms'>('talent')
  const [searchQuery, setSearchQuery] = useState('')
  const [testSuccessMessage, setTestSuccessMessage] = useState('')
  const [talentList, setTalentList] = useState(() => {
    return [
      ...CREATORS.map((c) => ({ id: c.id, name: c.name, type: 'Creator', location: c.location, category: c.category, verified: c.verified, status: 'approved' })),
      ...EDITORS.map((e) => ({ id: e.id, name: e.name, type: 'Video Editor', location: e.location, category: e.specializations.join(', '), verified: e.verified, status: 'approved' })),
      ...SOCIAL_MANAGERS.map((s) => ({ id: s.id, name: s.name, type: 'Social Media Manager', location: s.location, category: s.industries.join(', '), verified: s.verified, status: 'approved' })),
    ]
  })

  const [applications, setApplications] = useState<ApplicationRecord[]>([
    {
      id: 'app-101',
      submittedAt: '2026-09-15',
      name: 'Rohan Sharma',
      phone: '+91 98290 11111',
      city: 'Jaipur',
      email: 'rohan.sharma@example.com',
      type: 'creator',
      portfolio: 'https://instagram.com/rohan_creates',
      bio: 'Lifestyle creator with 45K followers and 6.2% engagement rate.',
      status: 'pending',
    },
    {
      id: 'app-102',
      submittedAt: '2026-09-14',
      name: 'Priya Verma',
      phone: '+91 98290 22222',
      city: 'Jaipur',
      email: 'priya.edits@example.com',
      type: 'editor',
      portfolio: 'https://behance.net/priyaverma',
      bio: 'Reels and YouTube editor with 4 years Premiere Pro experience.',
      status: 'pending',
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

  async function handleSimulateGoogleFormQuery() {
    const sample = {
      applicantType: 'creator' as const,
      name: `Applicant (Google Form ${Math.floor(Math.random() * 900 + 100)})`,
      email: 'googleform.applicant@example.com',
      phone: '+91 98290 12345',
      city: 'Jaipur',
      bio: 'Submitted via Google Form integration.',
      portfolio: 'https://drive.google.com/sample-portfolio',
      services: ['Instagram Reel', 'Brand Shoot'],
    }
    await submitTalentApplication(sample)
    const updated = await fetchApplications()
    setApplications(updated)
    setTestSuccessMessage('Simulated Google Form query successfully sent to Supabase & loaded into Admin Panel!')
    setTimeout(() => setTestSuccessMessage(''), 5000)
  }

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
              Review applicant submissions, manage Jaipur talent profiles, and receive live Google Form queries.
            </p>
          </div>
          <div className="flex items-center gap-1.5 bg-white p-1 rounded-md border border-line flex-wrap">
            <button
              onClick={() => setActiveTab('talent')}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                activeTab === 'talent' ? 'bg-ink text-paper' : 'text-ink-soft hover:text-ink'
              }`}
            >
              Talent ({talentList.length})
            </button>
            <button
              onClick={() => setActiveTab('applications')}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                activeTab === 'applications' ? 'bg-ink text-paper' : 'text-ink-soft hover:text-ink'
              }`}
            >
              Applications ({applications.filter((a) => a.status === 'pending').length} pending)
            </button>
            <button
              onClick={() => setActiveTab('google-forms')}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                activeTab === 'google-forms' ? 'bg-teal-600 text-white' : 'text-ink-soft hover:text-ink'
              }`}
            >
              Google Forms Sync
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
                    <div className="mt-2 text-xs sm:text-sm text-ink-soft space-y-1.5">
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                        <p>City: <span className="font-medium text-ink">{app.city}</span></p>
                        <p>Phone: <span className="font-mono text-ink">{app.phone || 'N/A'}</span></p>
                        <p>Email: <span className="font-mono text-ink">{app.email}</span></p>
                      </div>

                      {app.portfolio && (
                        <p>
                          Portfolio Link:{' '}
                          <a
                            href={app.portfolio.startsWith('http') ? app.portfolio : `https://${app.portfolio}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-teal-600 font-medium hover:underline"
                          >
                            {app.portfolio}
                          </a>
                        </p>
                      )}

                      {app.bio && (
                        <p className="text-ink-soft italic bg-paper/60 p-2 rounded text-xs border border-line/60 mt-1">
                          "{app.bio}"
                        </p>
                      )}

                      {app.applicationData && (
                        <div className="flex flex-wrap gap-2 pt-1 text-[11px]">
                          {app.applicationData.category && (
                            <span className="bg-teal-50 text-teal-700 px-2 py-0.5 rounded font-medium">Category: {app.applicationData.category}</span>
                          )}
                          {app.applicationData.followers && (
                            <span className="bg-teal-50 text-teal-700 px-2 py-0.5 rounded font-medium">Followers: {app.applicationData.followers}</span>
                          )}
                          {app.applicationData.instagram && (
                            <span className="bg-paper border border-line text-ink-soft px-2 py-0.5 rounded font-mono">IG: {app.applicationData.instagram}</span>
                          )}
                          {app.applicationData.youtube && (
                            <span className="bg-paper border border-line text-ink-soft px-2 py-0.5 rounded font-mono">YT: {app.applicationData.youtube}</span>
                          )}
                        </div>
                      )}
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
        {activeTab === 'google-forms' && (
          <div className="space-y-6 max-w-3xl">
            <div className="hairline rounded-lg bg-white p-6 shadow-card space-y-4">
              <div className="flex items-center justify-between border-b border-line pb-4">
                <div>
                  <h2 className="text-xl font-semibold text-ink">Google Forms Automatic Sync</h2>
                  <p className="text-xs sm:text-sm text-ink-soft mt-1">
                    Connect any Google Form so that whenever a talent fills out your form, their submission is automatically sent to Supabase and appears here live!
                  </p>
                </div>
                <button
                  onClick={handleSimulateGoogleFormQuery}
                  className="px-4 py-2 rounded bg-teal-600 text-white text-xs font-medium hover:bg-teal-700 transition-colors shrink-0"
                >
                  Test Query Simulator
                </button>
              </div>

              {testSuccessMessage && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded font-medium">
                  {testSuccessMessage}
                </div>
              )}

              <div className="space-y-3 pt-2 text-sm">
                <h3 className="font-semibold text-ink">1-Minute Setup Instructions:</h3>
                <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-ink-soft">
                  <li>Open your Google Form in Google Drive.</li>
                  <li>Click the <strong>3 dots (⋮)</strong> at the top right → select <strong>Extensions</strong> → <strong>Apps Script</strong>.</li>
                  <li>Delete any default code, paste the script below, and click <strong>Save (⌘S or Ctrl+S)</strong>.</li>
                  <li>Click <strong>Triggers (Alarm Clock icon on left)</strong> → Add Trigger → Select Event Source: <strong>From form</strong> → Event Type: <strong>On form submit</strong>. Save!</li>
                </ol>
              </div>

              <div className="pt-3">
                <label className="block text-xs font-semibold text-ink-soft mb-1 uppercase tracking-wider">
                  Copy-and-Paste Google Apps Script Code:
                </label>
                <textarea
                  readOnly
                  rows={14}
                  className="w-full font-mono text-xs p-3.5 bg-paper rounded border border-line text-ink leading-relaxed select-all"
                  value={`function onFormSubmit(e) {
  var itemResponses = e.response.getItemResponses();
  var name = "", email = "", phone = "", city = "Jaipur", type = "creator", portfolio = "", bio = "";
  
  for (var i = 0; i < itemResponses.length; i++) {
    var title = itemResponses[i].getItem().getTitle().toLowerCase();
    var response = itemResponses[i].getResponse();
    if (title.indexOf("name") !== -1) name = response;
    else if (title.indexOf("email") !== -1) email = response;
    else if (title.indexOf("phone") !== -1 || title.indexOf("mobile") !== -1) phone = response;
    else if (title.indexOf("city") !== -1 || title.indexOf("location") !== -1) city = response;
    else if (title.indexOf("type") !== -1 || title.indexOf("role") !== -1) type = response;
    else if (title.indexOf("portfolio") !== -1 || title.indexOf("link") !== -1) portfolio = response;
    else if (title.indexOf("bio") !== -1 || title.indexOf("about") !== -1) bio = response;
  }
  
  var payload = {
    applicant_type: type.toString().toLowerCase().indexOf("editor") !== -1 ? "editor" : (type.toString().toLowerCase().indexOf("social") !== -1 ? "social-media" : "creator"),
    name: name || "Google Form Applicant",
    email: email || "noemail@provided.com",
    phone: phone || "Not Provided",
    city: city || "Jaipur",
    portfolio: portfolio || "",
    bio: bio || "Submitted via Google Form",
    status: "pending"
  };
  
  UrlFetchApp.fetch("https://vzzjyravmxjluqnwskhm.supabase.co/rest/v1/applications", {
    method: "post",
    headers: {
      "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6emp5cmF2bXhqbHVxbndza2htIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk1NzQ5NzksImV4cCI6MjEwNTE1MDk3OX0.leQWk5e4BEkMkKwRNcygYXZDAw1eFf0o11RVvSv6tds",
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6emp5cmF2bXhqbHVxbndza2htIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk1NzQ5NzksImV4cCI6MjEwNTE1MDk3OX0.leQWk5e4BEkMkKwRNcygYXZDAw1eFf0o11RVvSv6tds",
      "Content-Type": "application/json",
      "Prefer": "return=representation"
    },
    payload: JSON.stringify(payload)
  });
}`}
                />
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  )
}
