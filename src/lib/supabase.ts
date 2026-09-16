import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://vzzjyravmxjluqnwskhm.supabase.co'
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6emp5cmF2bXhqbHVxbndza2htIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk1NzQ5NzksImV4cCI6MjEwNTE1MDk3OX0.leQWk5e4BEkMkKwRNcygYXZDAw1eFf0o11RVvSv6tds'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})

// Helper to check if Supabase is online & configured
export async function checkSupabaseConnection(): Promise<boolean> {
  try {
    const { error } = await supabase.from('talent_profiles').select('id').limit(1)
    return !error
  } catch {
    return false
  }
}
