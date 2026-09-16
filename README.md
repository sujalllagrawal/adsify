# Adsify — V1

A curated marketing talent discovery platform connecting brands and agencies with
content creators, video editors and social media managers. Talent contact details
are never shown publicly — brands submit a requirement, and Adsify manages the
introduction.

This is the **V1 frontend**: a complete, working prototype on mock data, built so
it can be wired up to Supabase (auth, database, storage) without restructuring
the app.

## Tech stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- React Router
- Lucide React icons

## Getting started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

Other scripts:

```bash
npm run build     # type-check + production build to dist/
npm run preview   # preview the production build locally
```

## Environment variables

None are required for V1. `.env.example` lists the variables the app will need
once it's connected to Supabase:

```bash
cp .env.example .env
```

## Project structure

```
src/
  components/
    layout/       Navbar, Footer, Layout (route shell)
    ui/            Button, Badge, Modal, Drawer, SEO — generic primitives
    creators/      CreatorCard
    editors/       EditorCard
    social-media/  SocialManagerCard
    forms/         RequirementForm, JoinForm
    FilterPanel.tsx, SearchBar.tsx, PortfolioGrid.tsx,
    ShortlistButton.tsx, ShortlistDrawer.tsx, StatsCard.tsx
  pages/           One file per route (see Routes below)
  data/            Mock data generators + shared constant lists (locations,
                   categories, filter ranges, etc.)
  hooks/           useShortlist — localStorage-backed shortlist state
  lib/             filters.ts (search/format helpers), shortlist.ts (storage)
  types/           Shared TypeScript types for Creator, Editor, SocialManager,
                   and form payloads
```

## Routes

| Path                  | Page                              |
|-----------------------|------------------------------------|
| `/`                   | Home                                |
| `/creators`           | Creator discovery + filters         |
| `/creators/:id`       | Creator profile                     |
| `/editors`            | Editor discovery + filters          |
| `/editors/:id`        | Editor profile                      |
| `/social-media`       | Social media manager discovery      |
| `/social-media/:id`   | Social media manager profile        |
| `/submit-requirement` | Brand requirement form              |
| `/join-adsify`        | Talent application form (dynamic)   |
| `/about`              | About / curation / privacy          |

## What's implemented in V1

- Client-side search, multi-select filtering and sorting across all three
  talent types (real filtering on mock data, not decorative UI).
- Shortlist: add/remove talent from any card or profile, persisted to
  `localStorage`, viewable from a header drawer, and carried into the
  requirement form.
- Requirement and Join forms with inline validation and success states.
  Submission is handled in frontend state — each form is commented with the
  exact Supabase call it will become.
- Fully responsive layout: sidebar filters on desktop, a filter drawer on
  mobile; no horizontal scrolling.
- SEO basics (per-page title + meta description via the `SEO` component),
  semantic headings, alt text, visible focus states.
- No talent contact info (phone/email) is ever rendered on cards or profiles.

## Mock data

`src/data/creators.ts`, `editors.ts` and `socialManagers.ts` generate 32
creators, 16 editors and 16 social media managers respectively, using a
seeded pseudo-random generator so the data is stable across reloads. Avatar
images come from `pravatar.cc`; portfolio images from `picsum.photos` — both
public placeholder image services, swappable for real Supabase Storage URLs
later.

## Extending toward the full product

The code is intentionally structured so the following can be added without a
rewrite:

- **Supabase auth + database**: replace the arrays in `src/data/*.ts` with
  queries (e.g. `supabase.from('creators').select()`), keeping the same
  `Creator` / `Editor` / `SocialManager` types.
- **Shortlist persistence**: swap `src/lib/shortlist.ts`'s localStorage calls
  for authenticated database writes; `useShortlist` already isolates that
  logic behind a hook.
- **Form submission**: `RequirementForm` and `JoinForm` each have a single
  commented line marking where the Supabase `insert` call goes.
- **Admin dashboard**: talent, applications and requirements are already
  shaped as flat, typed records — a natural fit for an admin CRUD layer added
  as new routes later.
