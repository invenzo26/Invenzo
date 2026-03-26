import { createClient } from '@supabase/supabase-js'

let supabase: ReturnType<typeof createClient>

export const getSupabaseClient = () => {
  if (!supabase) {
    supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    )
  }

  return supabase
}