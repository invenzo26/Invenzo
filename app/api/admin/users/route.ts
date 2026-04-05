import { NextResponse } from 'next/server'
import { requireAdminApiUser } from '@/lib/adminApi'
import { getSupabaseServerClient } from '@/lib/supabaseServer'

export async function GET() {
  const auth = await requireAdminApiUser()
  if (auth.error) return auth.error

  const supabaseServer = getSupabaseServerClient()

  if (!supabaseServer) {
    return NextResponse.json({ error: 'Server Supabase client unavailable.' }, { status: 500 })
  }

  const [authUsersResult, adminUsersResult] = await Promise.all([
    supabaseServer.auth.admin.listUsers({ page: 1, perPage: 1000 }),
    supabaseServer.from('admin_users').select('*'),
  ])

  if (authUsersResult.error) {
    return NextResponse.json({ error: authUsersResult.error.message }, { status: 500 })
  }

  if (adminUsersResult.error) {
    return NextResponse.json({ error: adminUsersResult.error.message }, { status: 500 })
  }

  const adminUserIds = new Set((adminUsersResult.data || []).map((record) => record.user_id).filter(Boolean))

  const users = (authUsersResult.data.users || []).map((authUser) => ({
    id: authUser.id,
    email: authUser.email || null,
    created_at: authUser.created_at || null,
    last_sign_in_at: authUser.last_sign_in_at || null,
    is_admin: adminUserIds.has(authUser.id),
  }))

  return NextResponse.json({
    users,
    totalAuthUsers: users.length,
    totalAdmins: adminUserIds.size,
  })
}
