import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let supabaseServer: SupabaseClient | null = null

export function getSupabaseServerClient() {
  if (supabaseServer) {
    return supabaseServer
  }

  const url = process.env.SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceRoleKey) {
    console.warn('Server Supabase env vars missing')
    return null
  }

  supabaseServer = createClient(url, serviceRoleKey)
  return supabaseServer
}
