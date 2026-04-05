import { NextRequest, NextResponse } from 'next/server'
import { requireAdminApiUser } from '@/lib/adminApi'
import { getSupabaseServerClient } from '@/lib/supabaseServer'

export async function POST(req: NextRequest) {
  const auth = await requireAdminApiUser()
  if (auth.error) return auth.error

  const supabase = getSupabaseServerClient()

  if (!supabase) {
    return NextResponse.json({ error: 'Server Supabase client unavailable.' }, { status: 500 })
  }

  const { user_id } = await req.json()

  const existing = await supabase
    .from('admin_users')
    .select('id')
    .eq('user_id', user_id)
    .maybeSingle()

  if (existing.data) {
    return NextResponse.json({ success: true })
  }

  const { error } = await supabase.from('admin_users').insert([{ user_id }])

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}

export async function DELETE(req: NextRequest) {
  const auth = await requireAdminApiUser()
  if (auth.error) return auth.error

  const supabase = getSupabaseServerClient()

  if (!supabase) {
    return NextResponse.json({ error: 'Server Supabase client unavailable.' }, { status: 500 })
  }

  const { user_id } = await req.json()

  const { error } = await supabase.from('admin_users').delete().eq('user_id', user_id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
