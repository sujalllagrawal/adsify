import { useState, FormEvent } from 'react'
import { CheckCircle2 } from 'lucide-react'
import {
  CREATOR_CATEGORIES,
  EDITOR_SPECIALIZATIONS,
  EDITOR_SOFTWARE,
  SOCIAL_INDUSTRIES,
  SOCIAL_SERVICES,
  PLATFORMS,
} from '@/data/constants'
import { submitTalentApplication } from '@/lib/services'
import type { TalentType, JoinFormData } from '@/types'

const TYPE_LABELS: Record<TalentType, string> = {
  creator: 'Creator',
  editor: 'Video Editor',
  'social-media': 'Social Media Manager',
}

const emptyForm: JoinFormData = {
  applicantType: 'creator',
  name: '',
  email: '',
  phone: '',
  city: '',
  bio: '',
  portfolio: '',
  services: [],
}

export function JoinForm() {
  const [form, setForm] = useState<JoinFormData>(emptyForm)
  const [errors, setErrors] = useState<Partial<Record<keyof JoinFormData, string>>>({})
  const [submitted, setSubmitted] = useState(false)

  function update<K extends keyof JoinFormData>(key: K, value: JoinFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  function toggleMulti(key: 'specialization' | 'software' | 'industries' | 'platforms', value: string) {
    setForm((prev) => {
      const current = (prev[key] as string[] | undefined) ?? []
      const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value]
      return { ...prev, [key]: next }
    })
  }

  function validate(): boolean {
    const next: Partial<Record<keyof JoinFormData, string>> = {}
    if (!form.name.trim()) next.name = 'Enter your name.'
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email.'
    if (!form.phone.trim() || form.phone.replace(/\D/g, '').length < 10) next.phone = 'Enter a valid phone number.'
    if (!form.city.trim()) next.city = 'Enter your city.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validate()) return
    await submitTalentApplication(form)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="text-center py-16 max-w-md mx-auto">
        <CheckCircle2 className="mx-auto text-teal-500" size={44} strokeWidth={1.5} />
        <h2 className="mt-5 text-2xl font-display font-semibold">Application submitted.</h2>
        <p className="mt-3 text-ink-soft">Your profile will be reviewed by the Adsify team.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8 max-w-2xl">
      <Field label="I am a">
        <div className="flex flex-wrap gap-2">
          {(Object.keys(TYPE_LABELS) as TalentType[]).map((t) => (
            <button
              type="button"
              key={t}
              onClick={() => update('applicantType', t)}
              className={`text-sm px-3.5 py-2 rounded-full border transition-colors ${
                form.applicantType === t
                  ? 'border-teal-500 bg-teal-50 text-teal-600'
                  : 'border-line text-ink-soft hover:border-ink/30'
              }`}
            >
              {TYPE_LABELS[t]}
            </button>
          ))}
        </div>
      </Field>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Full name" error={errors.name}>
          <input value={form.name} onChange={(e) => update('name', e.target.value)} className={inputClass(!!errors.name)} required />
        </Field>
        <Field label="Email" error={errors.email}>
          <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} className={inputClass(!!errors.email)} required />
        </Field>
        <Field label="Phone" error={errors.phone}>
          <input type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} className={inputClass(!!errors.phone)} required />
        </Field>
        <Field label="City" error={errors.city}>
          <input value={form.city} onChange={(e) => update('city', e.target.value)} className={inputClass(!!errors.city)} required />
        </Field>
      </div>

      {form.applicantType === 'creator' && (
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Instagram handle">
            <input value={form.instagram ?? ''} onChange={(e) => update('instagram', e.target.value)} className={inputClass(false)} />
          </Field>
          <Field label="YouTube channel">
            <input value={form.youtube ?? ''} onChange={(e) => update('youtube', e.target.value)} className={inputClass(false)} />
          </Field>
          <Field label="Category">
            <select value={form.category ?? ''} onChange={(e) => update('category', e.target.value)} className={inputClass(false)}>
              <option value="">Select a category</option>
              {CREATOR_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Followers">
            <input value={form.followers ?? ''} onChange={(e) => update('followers', e.target.value)} placeholder="e.g. 45,000" className={inputClass(false)} />
          </Field>
          <Field label="Engagement rate">
            <input value={form.engagementRate ?? ''} onChange={(e) => update('engagementRate', e.target.value)} placeholder="e.g. 5.2%" className={inputClass(false)} />
          </Field>
          <Field label="Languages">
            <input value={form.languages ?? ''} onChange={(e) => update('languages', e.target.value)} placeholder="e.g. Hindi, English" className={inputClass(false)} />
          </Field>
        </div>
      )}

      {form.applicantType === 'editor' && (
        <div className="space-y-5">
          <Field label="Experience (years)">
            <input value={form.experience ?? ''} onChange={(e) => update('experience', e.target.value)} className={inputClass(false)} />
          </Field>
          <Field label="Software">
            <div className="flex flex-wrap gap-2">
              {EDITOR_SOFTWARE.map((s) => (
                <ChipToggle key={s} active={(form.software ?? []).includes(s)} onClick={() => toggleMulti('software', s)}>
                  {s}
                </ChipToggle>
              ))}
            </div>
          </Field>
          <Field label="Specialization">
            <div className="flex flex-wrap gap-2">
              {EDITOR_SPECIALIZATIONS.map((s) => (
                <ChipToggle key={s} active={(form.specialization ?? []).includes(s)} onClick={() => toggleMulti('specialization', s)}>
                  {s}
                </ChipToggle>
              ))}
            </div>
          </Field>
        </div>
      )}

      {form.applicantType === 'social-media' && (
        <div className="space-y-5">
          <Field label="Experience (years)">
            <input value={form.experience ?? ''} onChange={(e) => update('experience', e.target.value)} className={inputClass(false)} />
          </Field>
          <Field label="Industries">
            <div className="flex flex-wrap gap-2">
              {SOCIAL_INDUSTRIES.map((s) => (
                <ChipToggle key={s} active={(form.industries ?? []).includes(s)} onClick={() => toggleMulti('industries', s)}>
                  {s}
                </ChipToggle>
              ))}
            </div>
          </Field>
          <Field label="Services">
            <div className="flex flex-wrap gap-2">
              {SOCIAL_SERVICES.map((s) => (
                <ChipToggle
                  key={s}
                  active={form.services.includes(s)}
                  onClick={() =>
                    update('services', form.services.includes(s) ? form.services.filter((v) => v !== s) : [...form.services, s])
                  }
                >
                  {s}
                </ChipToggle>
              ))}
            </div>
          </Field>
          <Field label="Platforms">
            <div className="flex flex-wrap gap-2">
              {PLATFORMS.map((s) => (
                <ChipToggle key={s} active={(form.platforms ?? []).includes(s)} onClick={() => toggleMulti('platforms', s)}>
                  {s}
                </ChipToggle>
              ))}
            </div>
          </Field>
        </div>
      )}

      <Field label="Portfolio link">
        <input
          value={form.portfolio}
          onChange={(e) => update('portfolio', e.target.value)}
          placeholder="Link to your work — Drive, Behance, Instagram, etc."
          className={inputClass(false)}
        />
      </Field>

      <Field label="Bio">
        <textarea rows={4} value={form.bio} onChange={(e) => update('bio', e.target.value)} className={inputClass(false)} />
      </Field>

      <button type="submit" className="w-full sm:w-auto px-6 py-3 rounded bg-ink text-paper font-medium hover:bg-teal-600 transition-colors">
        Apply to Join Adsify
      </button>
    </form>
  )
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium mb-1.5">{label}</span>
      {children}
      {error && <span className="block text-xs text-red-600 mt-1">{error}</span>}
    </label>
  )
}

function ChipToggle({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
        active ? 'border-teal-500 bg-teal-50 text-teal-600' : 'border-line text-ink-soft hover:border-ink/30'
      }`}
    >
      {children}
    </button>
  )
}

function inputClass(hasError: boolean) {
  return `w-full rounded-md border bg-white px-3.5 py-2.5 text-sm focus:border-teal-500 transition-colors ${
    hasError ? 'border-red-400' : 'border-line'
  }`
}
