import type { SocialManager } from '@/types'
import { LOCATIONS, SOCIAL_INDUSTRIES, SOCIAL_SERVICES, PLATFORMS } from './constants'

const FIRST_NAMES = [
  'Nitya', 'Rohit', 'Alisha', 'Varun', 'Sneha', 'Kunal', 'Pallavi', 'Yuvraj',
  'Ira', 'Sameer', 'Radhika', 'Vikram', 'Trisha', 'Abhinav', 'Nandini',
]
const LAST_NAMES = ['Suri', 'Kohli', 'Trivedi', 'Basu', 'Oberoi', 'Sethi', 'Ghosh', 'Ahluwalia']

function seededRandom(seed: number) {
  let value = seed
  return () => {
    value = (value * 9301 + 49297) % 233280
    return value / 233280
  }
}
function pickMany<T>(arr: readonly T[], count: number, rnd: () => number): T[] {
  const shuffled = [...arr].sort(() => rnd() - 0.5)
  return shuffled.slice(0, count)
}

export const SOCIAL_MANAGERS: SocialManager[] = Array.from({ length: 16 }).map((_, i) => {
  const rnd = seededRandom(i * 43 + 5)
  const name = `${FIRST_NAMES[i % FIRST_NAMES.length]} ${LAST_NAMES[(i * 2) % LAST_NAMES.length]}`
  const location = i % 3 === 0 ? LOCATIONS[(i % (LOCATIONS.length - 1)) + 1] : 'Jaipur'
  const industries = pickMany(SOCIAL_INDUSTRIES, 3, rnd)
  const services = pickMany(SOCIAL_SERVICES, 4, rnd)
  const id = `social-${i + 1}`
  const experienceYears = Math.round(1 + rnd() * 7)

  return {
    id,
    type: 'social-media',
    name,
    avatarUrl: `https://i.pravatar.cc/240?img=${((i + 40) % 70) + 1}`,
    location,
    experienceYears,
    industries,
    services,
    platforms: pickMany(PLATFORMS, 2, rnd),
    monthlyStartingPrice: Math.round((8000 + rnd() * 42000) / 1000) * 1000,
    verified: rnd() > 0.3,
    bio: `Manages end-to-end social presence for ${industries[0].toLowerCase()} and ${industries[1].toLowerCase()} brands, from content calendars to community response.`,
    portfolio: Array.from({ length: 6 }).map((_, p) => ({
      id: `${id}-p${p}`,
      type: 'image' as const,
      imageUrl: `https://picsum.photos/seed/${id}-${p}/800/600`,
      title: `${industries[p % industries.length]} content ${p + 1}`,
    })),
    caseStudies: [
      {
        brand: 'Verdant Co',
        result: '+38% follower growth in 4 months',
        summary: `Rebuilt the content calendar and launched a ${services[0].toLowerCase()} programme.`,
      },
      {
        brand: 'Kavya Living',
        result: '2.1x engagement rate',
        summary: 'Introduced a consistent posting cadence and community response workflow.',
      },
    ],
  }
})
