import { NextRequest, NextResponse } from 'next/server'
import { requireAdminApiUser } from '@/lib/adminApi'
import { getSupabaseServerClient } from '@/lib/supabaseServer'

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdminApiUser()
  if (auth.error) return auth.error

  const { client: supabase, error: supabaseError } = getSupabaseServerClient()
  if (!supabase) {
    return NextResponse.json({ error: supabaseError || 'Server Supabase client is not configured.' }, { status: 500 })
  }
  const { id } = await params

  const body = await req.json()

  const { error } = await supabase
    .from('products')
    .update(body)
    .eq('id', id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const { data: product, error: fetchError } = await supabase
    .from('products')
    .select('id, name, slug, tagline, description, live_url, features')
    .eq('id', id)
    .maybeSingle()

  if (fetchError) {
    return NextResponse.json({ error: fetchError.message }, { status: 500 })
  }

  return NextResponse.json({ product })
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdminApiUser()
  if (auth.error) return auth.error

  const { client: supabase, error: supabaseError } = getSupabaseServerClient()
  if (!supabase) {
    return NextResponse.json({ error: supabaseError || 'Server Supabase client is not configured.' }, { status: 500 })
  }
  const { id } = await params

  const { error } = await supabase.from('products').delete().eq('id', id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
