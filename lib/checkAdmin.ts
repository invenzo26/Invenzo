import { getSupabaseServerClient } from './supabaseServer'

export async function isAdmin(userId: string) {
  const supabaseServer = getSupabaseServerClient()

  if (!supabaseServer) {
    return false
  }

  const { data } = await supabaseServer
    .from('admin_users')
    .select('id')
    .eq('user_id', userId)
    .single()

  return !!data
}
