import { NextResponse } from 'next/server'
import { requireAdminApiUser } from '@/lib/adminApi'

export async function GET() {
  const auth = await requireAdminApiUser()
  if (auth.error) return auth.error

  const supabase = auth.supabase

  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ contacts: data || [] })
}
