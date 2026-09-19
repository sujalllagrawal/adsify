// Core domain types for Adsify V1.
// Kept intentionally close to a future Supabase schema shape
// (snake_case-free, id-based relations) so this can be swapped
// for real database rows with minimal refactor later.

export type Platform = 'Instagram' | 'YouTube' | 'LinkedIn'

export type TalentType = 'creator' | 'editor' | 'social-media'

export interface PortfolioItem {
  id: string
  type: 'image' | 'video' | 'campaign'
  imageUrl: string
  title: string
  brand?: string
}

export interface AudienceStat {
  label: string
  value: number // percentage 0-100
}

export interface Collaboration {
  brand: string
  summary: string
}

export interface Creator {
  id: string
  type: 'creator'
  name: string
  avatarUrl: string
  location: string
  category: string
  languages: string[]
  followers: number
  engagementRate: number // percentage
  creatorScore: number // 0-100
  verified: boolean
  platforms: Platform[]
  bio: string
  services: string[]
  portfolio: PortfolioItem[]
  audience: {
    genderSplit: AudienceStat[]
    ageGroups: AudienceStat[]
    topCities: AudienceStat[]
    interests: string[]
  }
  collaborations: Collaboration[]
}

export interface Editor {
  id: string
  type: 'editor'
  name: string
  avatarUrl: string
  location: string
  experienceYears: number
  specializations: string[]
  software: string[]
  startingPrice: number
  verified: boolean
  bio: string
  services: string[]
  portfolio: PortfolioItem[]
  sampleProjects: Collaboration[]
}

export interface SocialManager {
  id: string
  type: 'social-media'
  name: string
  avatarUrl: string
  location: string
  experienceYears: number
  industries: string[]
  services: string[]
  platforms: Platform[]
  monthlyStartingPrice: number
  verified: boolean
  bio: string
  portfolio: PortfolioItem[]
  caseStudies: { brand: string; result: string; summary: string }[]
}

export type Talent = Creator | Editor | SocialManager

export interface RequirementFormData {
  name: string
  company: string
  email: string
  phone: string
  talentType: 'Creator' | 'Video Editor' | 'Social Media Manager' | 'Multiple'
  location: string
  category: string
  budget: string
  campaignDate: string
  professionalsRequired: string
  deliverables: string
  campaignDescription: string
  additionalRequirements: string
  shortlistedIds: string[]
}

export interface JoinFormData {
  applicantType: TalentType
  name: string
  email: string
  phone: string
  city: string
  bio: string
  portfolio: string
  services: string[]
  profilePhoto?: string
  // creator-specific
  instagram?: string
  youtube?: string
  category?: string
  followers?: string
  engagementRate?: string
  languages?: string
  // editor-specific
  experience?: string
  software?: string[]
  specialization?: string[]
  // social-media-specific
  industries?: string[]
  platforms?: string[]
}
