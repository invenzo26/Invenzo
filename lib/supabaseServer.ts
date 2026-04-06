import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let supabaseServer: SupabaseClient | null = null

export function getSupabaseServerClient() {
  if (supabaseServer) {
    return { client: supabaseServer, error: null }
  }

  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceRoleKey) {
    const missing = [
      !url ? 'SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL)' : null,
      !serviceRoleKey ? 'SUPABASE_SERVICE_ROLE_KEY' : null,
    ].filter(Boolean)

    const error = `Server Supabase client is not configured. Missing: ${missing.join(', ')}.`
    console.warn(error)
    return { client: null, error }
  }

  supabaseServer = createClient(url, serviceRoleKey)
  return { client: supabaseServer, error: null }
}
