import { NextRequest, NextResponse } from 'next/server'
import { requireAdminApiUser } from '@/lib/adminApi'
import { getSupabaseServerClient } from '@/lib/supabaseServer'

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdminApiUser()
  if (auth.error) return auth.error

  const supabase = getSupabaseServerClient()
  const { id } = await params

  if (!supabase) {
    return NextResponse.json({ error: 'Server Supabase client unavailable.' }, { status: 500 })
  }

  const body = await req.json()

  const { data, error } = await supabase
    .from('products')
    .update(body)
    .eq('id', id)
    .select('id, name, slug, tagline, description, live_url, features')
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ product: data })
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdminApiUser()
  if (auth.error) return auth.error

  const supabase = getSupabaseServerClient()
  const { id } = await params

  if (!supabase) {
    return NextResponse.json({ error: 'Server Supabase client unavailable.' }, { status: 500 })
  }

  const { error } = await supabase.from('products').delete().eq('id', id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
