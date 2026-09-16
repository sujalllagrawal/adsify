import { supabase } from './supabase'
import { CREATORS } from '@/data/creators'
import { EDITORS } from '@/data/editors'
import { SOCIAL_MANAGERS } from '@/data/socialManagers'
import type { Creator, Editor, SocialManager, RequirementFormData, JoinFormData } from '@/types'

export interface ApplicationRecord {
  id: string
  created_at?: string
  submittedAt: string
  name: string
  email: string
  phone: string
  city: string
  type: string
  portfolio: string
  bio?: string
  applicationData?: Record<string, any>
  status: 'pending' | 'approved' | 'rejected'
}

/**
 * Submits a new Campaign Requirement to Supabase (and local storage fallback)
 */
export async function submitCampaignRequirement(form: RequirementFormData) {
  try {
    const payload = {
      name: form.name,
      company: form.company,
      email: form.email,
      phone: form.phone,
      talent_type: form.talentType,
      location: form.location,
      category: form.category,
      budget: form.budget,
      campaign_date: form.campaignDate,
      professionals_required: form.professionalsRequired,
      deliverables: form.deliverables,
      campaign_description: form.campaignDescription,
      additional_requirements: form.additionalRequirements,
      shortlisted_ids: form.shortlistedIds,
      status: 'new',
    }

    const { data, error } = await supabase.from('campaign_requirements').insert([payload]).select()
    if (error) {
      console.warn('Supabase requirement insert note:', error.message)
    } else {
      console.log('Successfully saved requirement to Supabase DB:', data)
    }
  } catch (err) {
    console.warn('Supabase connection fallback for requirement submission:', err)
  }

  // Always persist local backup for offline / V1 fallback support
  try {
    const existing = JSON.parse(localStorage.getItem('adsify:requirements') || '[]')
    localStorage.setItem('adsify:requirements', JSON.stringify([form, ...existing]))
  } catch {
    // ignore
  }
}

/**
 * Submits a new Talent Application to Supabase (and local storage fallback)
 */
export async function submitTalentApplication(form: JoinFormData) {
  try {
    const payload = {
      applicant_type: form.applicantType,
      name: form.name,
      email: form.email,
      phone: form.phone,
      city: form.city,
      bio: form.bio,
      portfolio: form.portfolio,
      services: form.services,
      application_data: form,
      status: 'pending',
    }

    const { data, error } = await supabase.from('applications').insert([payload]).select()
    if (error) {
      console.warn('Supabase application insert note:', error.message)
    } else {
      console.log('Successfully saved application to Supabase DB:', data)
    }
  } catch (err) {
    console.warn('Supabase connection fallback for application submission:', err)
  }

  // Persist to local backup for instant Admin Portal sync
  try {
    localStorage.setItem('adsify:latest-application', JSON.stringify(form))
    const existing = JSON.parse(localStorage.getItem('adsify:applications') || '[]')
    localStorage.setItem('adsify:applications', JSON.stringify([form, ...existing]))
  } catch {
    // ignore
  }
}

/**
 * Fetches Applications for Admin Moderation from Supabase (falling back to local storage)
 */
export async function fetchApplications(): Promise<ApplicationRecord[]> {
  try {
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data && data.length > 0) {
      return data.map((item) => ({
        id: item.id,
        submittedAt: item.created_at ? item.created_at.split('T')[0] : new Date().toISOString().split('T')[0],
        name: item.name,
        email: item.email,
        phone: item.phone,
        city: item.city,
        type: item.applicant_type || 'creator',
        portfolio: item.portfolio || '',
        bio: item.bio || '',
        applicationData: item.application_data || {},
        status: (item.status === 'approved' || item.status === 'rejected' ? item.status : 'pending') as 'pending' | 'approved' | 'rejected',
      }))
    }
  } catch (err) {
    console.warn('Supabase application fetch fallback:', err)
  }

  // Fallback to local storage
  const localList: ApplicationRecord[] = []
  try {
    const latest = localStorage.getItem('adsify:latest-application')
    if (latest) {
      const parsed = JSON.parse(latest)
      localList.push({
        id: `app-latest`,
        submittedAt: new Date().toISOString().split('T')[0],
        name: parsed.name,
        email: parsed.email,
        phone: parsed.phone,
        city: parsed.city || 'Jaipur',
        type: parsed.applicantType,
        portfolio: parsed.portfolio,
        bio: parsed.bio,
        applicationData: parsed,
        status: 'pending',
      })
    }
  } catch {
    // ignore
  }

  return localList
}

/**
 * Fetches Creators from Supabase (falling back to curated local dataset)
 */
export async function fetchCreators(): Promise<Creator[]> {
  try {
    const { data, error } = await supabase.from('creators').select('*, talent_profiles(*)')
    if (!error && data && data.length > 0) {
      // Map Supabase rows to Creator DTO
      return data.map((row) => ({
        id: row.id,
        type: 'creator',
        name: row.talent_profiles?.name || 'Creator',
        avatarUrl: row.talent_profiles?.avatar_url || 'https://i.pravatar.cc/240',
        location: row.talent_profiles?.city || 'Jaipur',
        category: row.category,
        languages: row.languages || ['Hindi', 'English'],
        followers: row.followers,
        engagementRate: row.engagement_rate,
        creatorScore: row.talent_profiles?.creator_score || 80,
        verified: row.talent_profiles?.verified || true,
        platforms: row.platforms || ['Instagram'],
        bio: row.talent_profiles?.bio || '',
        services: row.services || [],
        portfolio: row.portfolio || [],
        audience: row.audience || { genderSplit: [], ageGroups: [], topCities: [], interests: [] },
        collaborations: row.collaborations || [],
      }))
    }
  } catch {
    // fallback below
  }
  return CREATORS
}

/**
 * Fetches Editors from Supabase (falling back to local dataset)
 */
export async function fetchEditors(): Promise<Editor[]> {
  try {
    const { data, error } = await supabase.from('editors').select('*, talent_profiles(*)')
    if (!error && data && data.length > 0) {
      return data.map((row) => ({
        id: row.id,
        type: 'editor',
        name: row.talent_profiles?.name || 'Video Editor',
        avatarUrl: row.talent_profiles?.avatar_url || 'https://i.pravatar.cc/240',
        location: row.talent_profiles?.city || 'Jaipur',
        experienceYears: row.experience_years,
        specializations: row.specializations || [],
        software: row.software || [],
        startingPrice: row.starting_price,
        verified: row.talent_profiles?.verified || true,
        bio: row.talent_profiles?.bio || '',
        services: row.services || [],
        portfolio: row.portfolio || [],
        sampleProjects: row.sample_projects || [],
      }))
    }
  } catch {
    // fallback below
  }
  return EDITORS
}

/**
 * Fetches Social Media Managers from Supabase (falling back to local dataset)
 */
export async function fetchSocialManagers(): Promise<SocialManager[]> {
  try {
    const { data, error } = await supabase.from('social_media_managers').select('*, talent_profiles(*)')
    if (!error && data && data.length > 0) {
      return data.map((row) => ({
        id: row.id,
        type: 'social-media',
        name: row.talent_profiles?.name || 'Social Manager',
        avatarUrl: row.talent_profiles?.avatar_url || 'https://i.pravatar.cc/240',
        location: row.talent_profiles?.city || 'Jaipur',
        experienceYears: row.experience_years,
        industries: row.industries || [],
        services: row.services || [],
        platforms: row.platforms || ['Instagram'],
        monthlyStartingPrice: row.monthly_starting_price,
        verified: row.talent_profiles?.verified || true,
        bio: row.talent_profiles?.bio || '',
        portfolio: row.portfolio || [],
        caseStudies: row.case_studies || [],
      }))
    }
  } catch {
    // fallback below
  }
  return SOCIAL_MANAGERS
}
