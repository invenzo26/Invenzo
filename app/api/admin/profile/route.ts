import { NextRequest, NextResponse } from 'next/server'
import { requireAdminApiUser } from '@/lib/adminApi'
import { getSupabaseServerClient } from '@/lib/supabaseServer'

const defaultProfile = {
  replyEmail: '',
}

export async function GET() {
  const auth = await requireAdminApiUser()
  if (auth.error) return auth.error

  const supabase = getSupabaseServerClient()

  if (!supabase) {
    return NextResponse.json({ profile: defaultProfile, storageReady: false })
  }

  const { data, error } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'admin_profile')
    .maybeSingle()

  if (error) {
    const isMissingTable = error.message.includes('site_settings')

    return NextResponse.json({
      profile: defaultProfile,
      storageReady: !isMissingTable,
      warning: isMissingTable
        ? 'Admin profile storage is unavailable until the `site_settings` table is created.'
        : null,
    })
  }

  return NextResponse.json({
    profile: {
      ...defaultProfile,
      ...(data?.value || {}),
    },
    storageReady: true,
    warning: null,
  })
}

export async function PUT(req: NextRequest) {
  const auth = await requireAdminApiUser()
  if (auth.error) return auth.error

  const supabase = getSupabaseServerClient()

  if (!supabase) {
    return NextResponse.json({ error: 'Server Supabase client unavailable.' }, { status: 500 })
  }

  const body = await req.json()
  const profile = {
    ...defaultProfile,
    ...body,
  }

  const { error } = await supabase.from('site_settings').upsert(
    {
      key: 'admin_profile',
      value: profile,
    },
    { onConflict: 'key' }
  )

  if (error) {
    const isMissingTable = error.message.includes('site_settings')

    return NextResponse.json(
      {
        error: isMissingTable
          ? 'Admin profile settings cannot be saved until the `site_settings` table exists.'
          : error.message,
      },
      { status: 500 }
    )
  }

  return NextResponse.json({ profile })
}
