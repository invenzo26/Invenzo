import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { defaultPromoSettings } from '@/lib/promoSettings'
import { getSupabaseServerClient } from '@/lib/supabaseServer'
import { isAdmin } from '@/lib/checkAdmin'

async function requireAdmin() {
  const cookieStore = await cookies()
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anonKey) {
    return { error: NextResponse.json({ error: 'Supabase is not configured.' }, { status: 500 }) }
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
    return { error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) }
  }

  const allowed = await isAdmin(user.id)

  if (!allowed) {
    return { error: NextResponse.json({ error: 'Forbidden' }, { status: 403 }) }
  }

  return { user }
}

export async function GET() {
  const auth = await requireAdmin()
  if (auth.error) return auth.error

  const supabase = getSupabaseServerClient()

  if (!supabase) {
    return NextResponse.json({ settings: defaultPromoSettings })
  }

  const { data, error } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'home_promo_card')
    .maybeSingle()

  if (error) {
    const isMissingTable = error.message.includes('site_settings')

    return NextResponse.json({
      settings: defaultPromoSettings,
      storageReady: !isMissingTable,
      warning: isMissingTable
        ? 'Promo settings table is missing. Apply the site_settings migration to save changes.'
        : null,
    })
  }

  if (!data?.value) {
    return NextResponse.json({
      settings: defaultPromoSettings,
      storageReady: true,
      warning: null,
    })
  }

  return NextResponse.json({
    settings: {
      ...defaultPromoSettings,
      ...data.value,
    },
    storageReady: true,
    warning: null,
  })
}

export async function PUT(req: NextRequest) {
  const auth = await requireAdmin()
  if (auth.error) return auth.error

  const supabase = getSupabaseServerClient()

  if (!supabase) {
    return NextResponse.json({ error: 'Server Supabase client unavailable.' }, { status: 500 })
  }

  const body = await req.json()
  const settings = {
    ...defaultPromoSettings,
    ...body,
  }

  const { error } = await supabase.from('site_settings').upsert(
    {
      key: 'home_promo_card',
      value: settings,
    },
    { onConflict: 'key' }
  )

  if (error) {
    const isMissingTable = error.message.includes('site_settings')

    return NextResponse.json(
      {
        error: isMissingTable
          ? 'Promo settings cannot be saved until the `site_settings` table is created in Supabase.'
          : error.message,
      },
      { status: 500 }
    )
  }

  return NextResponse.json({ settings })
}
