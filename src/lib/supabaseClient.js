import { createClient } from '@supabase/supabase-js'

// Supabase client with graceful degradation when env vars are not set
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured =
  Boolean(supabaseUrl) &&
  Boolean(supabaseAnonKey) &&
  supabaseUrl.startsWith('https://')

/**
 * Returns a Supabase client if configured, or null otherwise.
 * The app remains functional without Supabase - auth features are simply disabled.
 */
export const getSupabaseClient = () => {
  if (!isSupabaseConfigured) {
    return null
  }
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true
    }
  })
}

/**
 * Singleton client instance - only created if Supabase is configured
 */
export const supabase = getSupabaseClient()

export default supabase