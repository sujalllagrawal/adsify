import { useState, FormEvent } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { LOCATIONS, BUDGET_RANGES } from '@/data/constants'
import { useShortlist } from '@/hooks/useShortlist'
import { submitCampaignRequirement } from '@/lib/services'
import type { RequirementFormData } from '@/types'

const TALENT_TYPES: RequirementFormData['talentType'][] = [
  'Creator',
  'Video Editor',
  'Social Media Manager',
  'Multiple',
]

const emptyForm: RequirementFormData = {
  name: '',
  company: '',
  email: '',
  phone: '',
  talentType: 'Creator',
  location: '',
  category: '',
  budget: '',
  campaignDate: '',
  professionalsRequired: '1',
  deliverables: '',
  campaignDescription: '',
  additionalRequirements: '',
  shortlistedIds: [],
}

export function RequirementForm() {
  const { ids } = useShortlist()
  const [form, setForm] = useState<RequirementFormData>(emptyForm)
  const [errors, setErrors] = useState<Partial<Record<keyof RequirementFormData, string>>>({})
  const [submitted, setSubmitted] = useState(false)

  function update<K extends keyof RequirementFormData>(key: K, value: RequirementFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  function validate(): boolean {
    const next: Partial<Record<keyof RequirementFormData, string>> = {}
    if (!form.name.trim()) next.name = 'Enter your name.'
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email.'
    if (!form.phone.trim() || form.phone.replace(/\D/g, '').length < 10) next.phone = 'Enter a valid phone number.'
    if (!form.campaignDescription.trim()) next.campaignDescription = 'Describe your campaign.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validate()) return
    const payload = { ...form, shortlistedIds: ids }
    await submitCampaignRequirement(payload)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="text-center py-16 max-w-md mx-auto">
        <CheckCircle2 className="mx-auto text-teal-500" size={44} strokeWidth={1.5} />
        <h2 className="mt-5 text-2xl font-display font-semibold">Requirement received.</h2>
        <p className="mt-3 text-ink-soft">
          An Adsify team member will review your requirement and get back to you shortly.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8 max-w-2xl">
      {ids.length > 0 && (
        <div className="hairline rounded-md bg-teal-50 px-4 py-3 text-sm text-teal-600">
          Submitting with {ids.length} shortlisted profile{ids.length > 1 ? 's' : ''} attached.
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Full name" error={errors.name}>
          <input
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            className={inputClass(!!errors.name)}
            required
          />
        </Field>
        <Field label="Company">
          <input
            value={form.company}
            onChange={(e) => update('company', e.target.value)}
            className={inputClass(false)}
          />
        </Field>
        <Field label="Email" error={errors.email}>
          <input
            type="email"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            className={inputClass(!!errors.email)}
            required
          />
        </Field>
        <Field label="Phone" error={errors.phone}>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => update('phone', e.target.value)}
            className={inputClass(!!errors.phone)}
            required
          />
        </Field>
      </div>

      <Field label="Talent type">
        <div className="flex flex-wrap gap-2">
          {TALENT_TYPES.map((t) => (
            <button
              type="button"
              key={t}
              onClick={() => update('talentType', t)}
              className={`text-sm px-3.5 py-2 rounded-full border transition-colors ${
                form.talentType === t
                  ? 'border-teal-500 bg-teal-50 text-teal-600'
                  : 'border-line text-ink-soft hover:border-ink/30'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </Field>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Location">
          <select value={form.location} onChange={(e) => update('location', e.target.value)} className={inputClass(false)}>
            <option value="">Any location</option>
            {LOCATIONS.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </Field>
        <Field label="Category / niche">
          <input
            value={form.category}
            onChange={(e) => update('category', e.target.value)}
            placeholder="e.g. Fashion, Food, Tech"
            className={inputClass(false)}
          />
        </Field>
        <Field label="Budget">
          <select value={form.budget} onChange={(e) => update('budget', e.target.value)} className={inputClass(false)}>
            <option value="">Select a range</option>
            {BUDGET_RANGES.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </Field>
        <Field label="Campaign date">
          <input
            type="date"
            value={form.campaignDate}
            onChange={(e) => update('campaignDate', e.target.value)}
            className={inputClass(false)}
          />
        </Field>
        <Field label="Number of professionals required">
          <input
            type="number"
            min={1}
            value={form.professionalsRequired}
            onChange={(e) => update('professionalsRequired', e.target.value)}
            className={inputClass(false)}
          />
        </Field>
        <Field label="Deliverables">
          <input
            value={form.deliverables}
            onChange={(e) => update('deliverables', e.target.value)}
            placeholder="e.g. 3 reels, 1 static post"
            className={inputClass(false)}
          />
        </Field>
      </div>

      <Field label="Campaign description" error={errors.campaignDescription}>
        <textarea
          rows={4}
          value={form.campaignDescription}
          onChange={(e) => update('campaignDescription', e.target.value)}
          className={inputClass(!!errors.campaignDescription)}
          required
        />
      </Field>

      <Field label="Additional requirements">
        <textarea
          rows={3}
          value={form.additionalRequirements}
          onChange={(e) => update('additionalRequirements', e.target.value)}
          className={inputClass(false)}
        />
      </Field>

      <button
        type="submit"
        className="w-full sm:w-auto px-6 py-3 rounded bg-ink text-paper font-medium hover:bg-teal-600 transition-colors"
      >
        Submit Requirement
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

function inputClass(hasError: boolean) {
  return `w-full rounded-md border bg-white px-3.5 py-2.5 text-sm focus:border-teal-500 transition-colors ${
    hasError ? 'border-red-400' : 'border-line'
  }`
}
