import { Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import Home from '@/pages/Home'
import Creators from '@/pages/Creators'
import CreatorProfile from '@/pages/CreatorProfile'
import Editors from '@/pages/Editors'
import EditorProfile from '@/pages/EditorProfile'
import SocialMedia from '@/pages/SocialMedia'
import SocialManagerProfile from '@/pages/SocialManagerProfile'
import SubmitRequirement from '@/pages/SubmitRequirement'
import JoinAdsify from '@/pages/JoinAdsify'
import About from '@/pages/About'
import Shortlist from '@/pages/Shortlist'
import Admin from '@/pages/Admin'
import NotFound from '@/pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/creators" element={<Creators />} />
        <Route path="/creators/:locationParam" element={<Creators />} />
        <Route path="/creators/:locationParam/:categoryParam" element={<Creators />} />
        <Route path="/creators/profile/:id" element={<CreatorProfile />} />
        <Route path="/creators/:id" element={<CreatorProfile />} />
        <Route path="/editors" element={<Editors />} />
        <Route path="/editors/:id" element={<EditorProfile />} />
        <Route path="/social-media" element={<SocialMedia />} />
        <Route path="/social-media/:id" element={<SocialManagerProfile />} />
        <Route path="/shortlist" element={<Shortlist />} />
        <Route path="/submit-requirement" element={<SubmitRequirement />} />
        <Route path="/join-adsify" element={<JoinAdsify />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

