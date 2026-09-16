export const LOCATIONS = ['Jaipur', 'Delhi', 'Mumbai', 'Bangalore'] as const

export const CREATOR_CATEGORIES = [
  'Lifestyle',
  'Fashion',
  'Food',
  'Travel',
  'Fitness',
  'Beauty',
  'Finance',
  'Technology',
  'Comedy',
  'Education',
] as const

export const FOLLOWER_RANGES = [
  { label: '1K–10K', min: 1000, max: 10000 },
  { label: '10K–50K', min: 10000, max: 50000 },
  { label: '50K–100K', min: 50000, max: 100000 },
  { label: '100K–500K', min: 100000, max: 500000 },
  { label: '500K+', min: 500000, max: Infinity },
] as const

export const PLATFORMS = ['Instagram', 'YouTube', 'LinkedIn'] as const

export const LANGUAGES = ['English', 'Hindi', 'Rajasthani', 'Marathi', 'Kannada', 'Punjabi'] as const

export const EDITOR_SPECIALIZATIONS = [
  'Reels',
  'YouTube',
  'Short-form',
  'Long-form',
  'Commercial',
  'Wedding',
  'Cinematic',
  'Motion Graphics',
  'Podcast',
  'Gaming',
] as const

export const EDITOR_SOFTWARE = [
  'Premiere Pro',
  'After Effects',
  'DaVinci Resolve',
  'Final Cut Pro',
  'CapCut',
] as const

export const SOCIAL_INDUSTRIES = [
  'Restaurants',
  'Hotels',
  'Fashion',
  'Real Estate',
  'Education',
  'Finance',
  'Travel',
  'Technology',
  'Healthcare',
  'Startups',
] as const

export const SOCIAL_SERVICES = [
  'Instagram Management',
  'Facebook Management',
  'LinkedIn Management',
  'Content Strategy',
  'Content Calendar',
  'Influencer Marketing',
  'Community Management',
  'Paid Ads',
] as const

export const CREATOR_SERVICES = [
  'Instagram Reel',
  'Instagram Story',
  'Static Post',
  'UGC',
  'Brand Shoot',
  'Event Appearance',
] as const

export const SORT_OPTIONS = ['Recommended', 'Followers', 'Engagement', 'Creator Score'] as const

export const EXPERIENCE_RANGES = [
  { label: '0–2 yrs', min: 0, max: 2 },
  { label: '3–5 yrs', min: 3, max: 5 },
  { label: '6+ yrs', min: 6, max: Infinity },
] as const

export const EDITOR_PRICE_RANGES = [
  { label: 'Under ₹3,000', min: 0, max: 3000 },
  { label: '₹3,000–₹8,000', min: 3000, max: 8000 },
  { label: '₹8,000+', min: 8000, max: Infinity },
] as const

export const SOCIAL_PRICE_RANGES = [
  { label: 'Under ₹15,000', min: 0, max: 15000 },
  { label: '₹15,000–₹30,000', min: 15000, max: 30000 },
  { label: '₹30,000+', min: 30000, max: Infinity },
] as const

export const BUDGET_RANGES = [
  'Under ₹10,000',
  '₹10,000 – ₹25,000',
  '₹25,000 – ₹50,000',
  '₹50,000 – ₹1,00,000',
  '₹1,00,000+',
] as const
