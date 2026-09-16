import type { Editor } from '@/types'
import { LOCATIONS, EDITOR_SPECIALIZATIONS, EDITOR_SOFTWARE } from './constants'

const FIRST_NAMES = [
  'Ansh', 'Priya', 'Devansh', 'Neha', 'Rudra', 'Kajal', 'Aryan', 'Shreya',
  'Manav', 'Tanya', 'Harsh', 'Ritika', 'Om', 'Bhavna', 'Siddharth',
]
const LAST_NAMES = ['Vora', 'Khanna', 'Pillai', 'Agarwal', 'Desai', 'Thakur', 'Chauhan', 'Bhatt']

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
function pickMany<T>(arr: readonly T[], count: number, rnd: () => number): T[] {
  const shuffled = [...arr].sort(() => rnd() - 0.5)
  return shuffled.slice(0, count)
}

const SPECIALIZATION_BIO: Record<string, string> = {
  Reels: 'Cuts fast-paced, trend-aware reels built for retention on Instagram and YouTube Shorts.',
  YouTube: 'Edits long-form YouTube content with pacing built for watch-time and audience retention.',
  'Short-form': 'Specialises in punchy short-form edits optimised for mobile viewing.',
  'Long-form': 'Handles documentary-style long-form edits with careful narrative structure.',
  Commercial: 'Produces polished commercial edits for brand and product campaigns.',
  Wedding: 'Edits cinematic wedding films with a focus on emotion and storytelling.',
  Cinematic: 'Colour grades and cuts cinematic sequences with a film-first sensibility.',
  'Motion Graphics': 'Builds custom motion graphics and kinetic typography for brand content.',
  Podcast: 'Edits and clips podcast episodes into shareable, platform-ready segments.',
  Gaming: 'Edits gaming highlights and montages tuned for a young, fast-scrolling audience.',
}

export const EDITORS: Editor[] = Array.from({ length: 16 }).map((_, i) => {
  const rnd = seededRandom(i * 61 + 7)
  const name = `${FIRST_NAMES[i % FIRST_NAMES.length]} ${LAST_NAMES[(i * 2) % LAST_NAMES.length]}`
  const location = i % 3 === 0 ? LOCATIONS[(i % (LOCATIONS.length - 1)) + 1] : 'Jaipur'
  const specializations = pickMany(EDITOR_SPECIALIZATIONS, 2, rnd)
  const software = pickMany(EDITOR_SOFTWARE, 3, rnd)
  const id = `editor-${i + 1}`
  const experienceYears = Math.round(1 + rnd() * 8)

  return {
    id,
    type: 'editor',
    name,
    avatarUrl: `https://i.pravatar.cc/240?img=${((i + 20) % 70) + 1}`,
    location,
    experienceYears,
    specializations,
    software,
    startingPrice: Math.round((1500 + rnd() * 12000) / 500) * 500,
    verified: rnd() > 0.3,
    bio: SPECIALIZATION_BIO[specializations[0]],
    services: ['Raw footage editing', 'Colour grading', 'Sound design', 'Subtitling'].filter(() => rnd() > 0.3),
    portfolio: Array.from({ length: 6 }).map((_, p) => ({
      id: `${id}-p${p}`,
      type: (p % 2 === 0 ? 'video' : 'image') as 'video' | 'image',
      imageUrl: `https://picsum.photos/seed/${id}-${p}/800/600`,
      title: `${pick(specializations, rnd)} edit ${p + 1}`,
    })),
    sampleProjects: [
      { brand: 'Northline', summary: `Edited a ${specializations[0].toLowerCase()} campaign across 8 deliverables.` },
      { brand: 'Fieldnote', summary: 'Delivered a full brand video with colour grade and sound design.' },
    ],
  }
})
