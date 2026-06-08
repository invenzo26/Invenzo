import { NextRequest, NextResponse } from 'next/server'
import { requireAdminApiUser } from '@/lib/adminApi'
import { getSupabaseServerClient } from '@/lib/supabaseServer'

export async function GET() {
  try {
    const { client: supabase, error: supabaseError } = getSupabaseServerClient()
    if (!supabase) {
      return NextResponse.json({ error: supabaseError || 'Server Supabase client is not configured.' }, { status: 500 })
    }

    const { data, error } = await supabase
      .from('products')
      .select('id, name, slug, tagline, description, live_url, features')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase query error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ products: data || [] })
  } catch (err) {
    console.error('API error:', err)
    const errorMessage = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: `Failed to fetch products: ${errorMessage}` }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireAdminApiUser()
  if (auth.error) return auth.error

  const { client: supabase, error: supabaseError } = getSupabaseServerClient()
  if (!supabase) {
    return NextResponse.json({ error: supabaseError || 'Server Supabase client is not configured.' }, { status: 500 })
  }

  const body = await req.json()

  const { data, error } = await supabase
    .from('products')
    .insert([body])
    .select('id, name, slug, tagline, description, live_url, features')
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ product: data })
}
