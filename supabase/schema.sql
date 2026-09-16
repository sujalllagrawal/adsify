-- ADSIFY SUPABASE DATABASE SCHEMA MIGRATION SCRIPT
-- Execute this script in your Supabase SQL Editor (https://vzzjyravmxjluqnwskhm.supabase.co)

-- 1. Create Core Talent Profiles Table
CREATE TABLE IF NOT EXISTS public.talent_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    talent_type TEXT NOT NULL CHECK (talent_type IN ('creator', 'editor', 'social-media')),
    name TEXT NOT NULL,
    avatar_url TEXT,
    city TEXT NOT NULL DEFAULT 'Jaipur',
    bio TEXT,
    verified BOOLEAN NOT NULL DEFAULT false,
    creator_score INTEGER DEFAULT 75,
    status TEXT NOT NULL DEFAULT 'approved' CHECK (status IN ('pending', 'approved', 'rejected', 'hidden')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Creators Extension Table
CREATE TABLE IF NOT EXISTS public.creators (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES public.talent_profiles(id) ON DELETE CASCADE,
    category TEXT NOT NULL,
    followers INTEGER NOT NULL DEFAULT 10000,
    engagement_rate NUMERIC(4, 2) NOT NULL DEFAULT 4.5,
    languages TEXT[] DEFAULT ARRAY['Hindi', 'English'],
    platforms TEXT[] DEFAULT ARRAY['Instagram'],
    services TEXT[] DEFAULT ARRAY['Instagram Reel', 'Instagram Story'],
    audience JSONB DEFAULT '{}'::jsonb,
    collaborations JSONB DEFAULT '[]'::jsonb,
    portfolio JSONB DEFAULT '[]'::jsonb
);

-- 3. Video Editors Extension Table
CREATE TABLE IF NOT EXISTS public.editors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES public.talent_profiles(id) ON DELETE CASCADE,
    experience_years INTEGER NOT NULL DEFAULT 3,
    specializations TEXT[] DEFAULT ARRAY['Reels', 'YouTube'],
    software TEXT[] DEFAULT ARRAY['Premiere Pro', 'After Effects'],
    starting_price NUMERIC(10, 2) NOT NULL DEFAULT 3000,
    services TEXT[] DEFAULT ARRAY['Raw footage editing', 'Colour grading'],
    sample_projects JSONB DEFAULT '[]'::jsonb,
    portfolio JSONB DEFAULT '[]'::jsonb
);

-- 4. Social Media Managers Extension Table
CREATE TABLE IF NOT EXISTS public.social_media_managers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES public.talent_profiles(id) ON DELETE CASCADE,
    experience_years INTEGER NOT NULL DEFAULT 3,
    industries TEXT[] DEFAULT ARRAY['Restaurants', 'Fashion'],
    services TEXT[] DEFAULT ARRAY['Instagram Management', 'Content Strategy'],
    platforms TEXT[] DEFAULT ARRAY['Instagram', 'LinkedIn'],
    monthly_starting_price NUMERIC(10, 2) NOT NULL DEFAULT 15000,
    case_studies JSONB DEFAULT '[]'::jsonb,
    portfolio JSONB DEFAULT '[]'::jsonb
);

-- 5. Campaign Requirements Table (Submitted by Brands)
CREATE TABLE IF NOT EXISTS public.campaign_requirements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    company TEXT,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    talent_type TEXT NOT NULL,
    location TEXT,
    category TEXT,
    budget TEXT,
    campaign_date TEXT,
    professionals_required TEXT DEFAULT '1',
    deliverables TEXT,
    campaign_description TEXT NOT NULL,
    additional_requirements TEXT,
    shortlisted_ids TEXT[] DEFAULT ARRAY[]::TEXT[],
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_review', 'matched', 'closed')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. Talent Applications Table (Submitted via /join-adsify)
CREATE TABLE IF NOT EXISTS public.applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    applicant_type TEXT NOT NULL CHECK (applicant_type IN ('creator', 'editor', 'social-media')),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    city TEXT NOT NULL DEFAULT 'Jaipur',
    bio TEXT,
    portfolio TEXT,
    services TEXT[] DEFAULT ARRAY[]::TEXT[],
    application_data JSONB DEFAULT '{}'::jsonb,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.talent_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.creators ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.editors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_media_managers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaign_requirements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- Allow Public Read Access for Approved Talent Profiles
CREATE POLICY "Public Approved Profiles Read" ON public.talent_profiles FOR SELECT USING (status = 'approved');
CREATE POLICY "Public Creators Read" ON public.creators FOR SELECT USING (true);
CREATE POLICY "Public Editors Read" ON public.editors FOR SELECT USING (true);
CREATE POLICY "Public Social Managers Read" ON public.social_media_managers FOR SELECT USING (true);

-- Allow Public Insert for Campaign Requirements and Applications
CREATE POLICY "Public Insert Requirements" ON public.campaign_requirements FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Read Requirements" ON public.campaign_requirements FOR SELECT USING (true);

CREATE POLICY "Public Insert Applications" ON public.applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Read Applications" ON public.applications FOR SELECT USING (true);

-- Create Indexes for Fast Location and Search Querying
CREATE INDEX IF NOT EXISTS idx_talent_city ON public.talent_profiles(city);
CREATE INDEX IF NOT EXISTS idx_talent_type ON public.talent_profiles(talent_type);
CREATE INDEX IF NOT EXISTS idx_creators_category ON public.creators(category);
