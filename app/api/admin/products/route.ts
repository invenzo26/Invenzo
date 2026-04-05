import { NextRequest, NextResponse } from 'next/server'
import { requireAdminApiUser } from '@/lib/adminApi'

export async function GET() {
  const auth = await requireAdminApiUser()
  if (auth.error) return auth.error

  const supabase = auth.supabase

  const { data, error } = await supabase
    .from('products')
    .select('id, name, slug, tagline, description, live_url, features')
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ products: data || [] })
}

export async function POST(req: NextRequest) {
  const auth = await requireAdminApiUser()
  if (auth.error) return auth.error

  const supabase = auth.supabase

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
