import type { Creator } from '@/types'
import { LOCATIONS, CREATOR_CATEGORIES } from './constants'

const FIRST_NAMES = [
  'Aarav', 'Riya', 'Kabir', 'Ananya', 'Vivaan', 'Diya', 'Arjun', 'Myra',
  'Reyansh', 'Ishita', 'Sai', 'Navya', 'Krishna', 'Aditi', 'Rohan', 'Sara',
  'Dhruv', 'Kiara', 'Aryan', 'Zara', 'Vihaan', 'Anaya', 'Yash', 'Meera',
  'Karan', 'Tara', 'Nikhil', 'Pooja', 'Rahul', 'Simran', 'Aman', 'Isha',
]

const LAST_NAMES = [
  'Mehta', 'Sharma', 'Singh', 'Kapoor', 'Verma', 'Iyer', 'Gupta', 'Nair',
  'Chopra', 'Reddy', 'Malhotra', 'Bose', 'Rao', 'Joshi', 'Bansal', 'Menon',
]

const BIO_BY_CATEGORY: Record<string, string> = {
  Lifestyle: 'Documents everyday routines, home design and slow-living moments with a clean, editorial eye.',
  Fashion: 'Styles seasonal edits and street-style content, with a strong eye for silhouette and colour.',
  Food: 'Reviews restaurants and shares home-cooking recipes with a focus on regional Indian cuisine.',
  Travel: 'Covers offbeat destinations and travel logistics for a young, adventure-first audience.',
  Fitness: 'Shares training splits, mobility routines and nutrition basics for everyday athletes.',
  Beauty: 'Creates tutorials and honest product reviews across skincare and makeup.',
  Finance: 'Breaks down personal finance, investing and tax basics in plain language.',
  Technology: 'Reviews gadgets and explains new tech in accessible, jargon-free videos.',
  Comedy: 'Produces relatable sketch and observational comedy rooted in everyday Indian life.',
  Education: 'Simplifies exam prep and study techniques for students and young professionals.',
}

const SERVICES_POOL = ['Instagram Reel', 'Instagram Story', 'Static Post', 'UGC', 'Brand Shoot', 'Event Appearance']

function seededRandom(seed: number) {
  let value = seed
  return () => {
    value = (value * 9301 + 49297) % 233280
    return value / 233280
  }
}

function pick<T>(arr: readonly T[], rnd: () => number): T {
  return arr[Math.floor(rnd() * arr.length)]
}

function buildPortfolio(id: string, category: string, rnd: () => number) {
  const topics = ['campaign', 'shoot', 'reel', 'collab', 'launch']
  return Array.from({ length: 6 }).map((_, i) => ({
    id: `${id}-p${i}`,
    type: (i % 3 === 0 ? 'video' : 'image') as 'video' | 'image',
    imageUrl: `https://picsum.photos/seed/${id}-${i}/800/600`,
    title: `${category} ${pick(topics, rnd)} ${i + 1}`,
    brand: rnd() > 0.5 ? pick(['Northline', 'Verdant Co', 'Studio Aura', 'Kavya Living', 'Fieldnote'], rnd) : undefined,
  }))
}

export const CREATORS: Creator[] = Array.from({ length: 32 }).map((_, i) => {
  const rnd = seededRandom(i * 97 + 13)
  const first = FIRST_NAMES[i % FIRST_NAMES.length]
  const last = LAST_NAMES[(i * 3) % LAST_NAMES.length]
  const name = `${first} ${last}`
  const category = CREATOR_CATEGORIES[i % CREATOR_CATEGORIES.length]
  // Prioritize Jaipur as the launch city marketplace
  const location = i % 3 === 0 ? LOCATIONS[(i % (LOCATIONS.length - 1)) + 1] : 'Jaipur'
  const followers = Math.floor(12000 + rnd() * 480000)
  const engagementRate = Math.round((3.2 + rnd() * 5.8) * 10) / 10
  const creatorScore = Math.round(72 + rnd() * 26)
  const id = `creator-${i + 1}`

  const jaipurBrands = ['Bar Palladio', 'Raw Mango Jaipur', 'Johri Bazaar Label', 'Tapri Central', 'Suja Crafts', 'Suvarna Living', 'Kripal Kumbh']
  const nationalBrands = ['Zomato', 'Nykaa', 'Lenskart', 'FabIndia', 'Forest Essentials', 'Tanishq']

  return {
    id,
    type: 'creator',
    name,
    avatarUrl: `https://i.pravatar.cc/240?img=${(i % 70) + 1}`,
    location,
    category,
    languages: location === 'Jaipur' ? ['Hindi', 'English', 'Rajasthani'] : ['English', 'Hindi'],
    followers,
    engagementRate,
    creatorScore,
    verified: rnd() > 0.2,
    platforms: rnd() > 0.5 ? ['Instagram', 'YouTube'] : ['Instagram'],
    bio: BIO_BY_CATEGORY[category] || 'Curates high quality editorial content and brand partnerships.',
    services: SERVICES_POOL.filter(() => rnd() > 0.35).slice(0, 4).length
      ? SERVICES_POOL.filter(() => rnd() > 0.35).slice(0, 4)
      : [SERVICES_POOL[0], SERVICES_POOL[1]],
    portfolio: buildPortfolio(id, category, rnd),
    audience: {
      genderSplit: [
        { label: 'Female', value: Math.round(35 + rnd() * 35) },
        { label: 'Male', value: 0 },
      ].map((s, idx, arr) => (idx === 1 ? { ...s, value: 100 - arr[0].value } : s)),
      ageGroups: [
        { label: '18–24', value: 32 },
        { label: '25–34', value: 46 },
        { label: '35–44', value: 16 },
        { label: '45+', value: 6 },
      ],
      topCities: [
        { label: location, value: 42 },
        { label: location === 'Jaipur' ? 'Delhi' : 'Jaipur', value: 24 },
        { label: 'Mumbai', value: 14 },
      ],
      interests: [category, 'Shopping', 'Aesthetics', 'Travel'].filter((v, idx, a) => a.indexOf(v) === idx),
    },
    collaborations: [
      {
        brand: location === 'Jaipur' ? pick(jaipurBrands, rnd) : pick(nationalBrands, rnd),
        summary: `Led a successful ${category.toLowerCase()} reel series achieving over ${Math.round(40 + rnd() * 120)}K views.`,
      },
      {
        brand: pick(nationalBrands, rnd),
        summary: 'Produced seasonal campaign assets with an impressive engagement rate.',
      },
    ],
  }
})

