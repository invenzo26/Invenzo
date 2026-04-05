import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { getSupabaseServerClient } from '@/lib/supabaseServer'
import { isAdmin } from '@/lib/checkAdmin'

export async function GET() {
  const cookieStore = await cookies()
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anonKey) {
    return NextResponse.json({ error: 'Supabase is not configured.' }, { status: 500 })
  }

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set() {},
      remove() {},
    },
  })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const allowed = await isAdmin(user.id)

  if (!allowed) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

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
