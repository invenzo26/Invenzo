import { NextRequest, NextResponse } from 'next/server'
import { requireAdminApiUser } from '@/lib/adminApi'
import { getSupabaseServerClient } from '@/lib/supabaseServer'
import {
  isMissingSiteSettingsTable,
  readFallbackSiteSetting,
  writeFallbackSiteSetting,
} from '@/lib/siteSettingsFallback'

const defaultProfile = {
  replyEmail: '',
}

export async function GET() {
  const auth = await requireAdminApiUser()
  if (auth.error) return auth.error

  const supabase = getSupabaseServerClient()

  if (!supabase) {
    const profile = await readFallbackSiteSetting('admin_profile', defaultProfile)
    return NextResponse.json({ profile, storageReady: true, warning: null })
  }

  const { data, error } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'admin_profile')
    .maybeSingle()

  if (error) {
    if (isMissingSiteSettingsTable(error)) {
      const profile = await readFallbackSiteSetting('admin_profile', defaultProfile)

      return NextResponse.json({
        profile,
        storageReady: true,
        warning: null,
      })
    }

    return NextResponse.json({
      profile: defaultProfile,
      storageReady: false,
      warning: error.message,
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

  const body = await req.json()
  const profile = {
    ...defaultProfile,
    ...body,
  }

  if (!supabase) {
    await writeFallbackSiteSetting('admin_profile', profile)
    return NextResponse.json({ profile })
  }

  const { error } = await supabase.from('site_settings').upsert(
    {
      key: 'admin_profile',
      value: profile,
    },
    { onConflict: 'key' }
  )

  if (error) {
    if (isMissingSiteSettingsTable(error)) {
      await writeFallbackSiteSetting('admin_profile', profile)
      return NextResponse.json({ profile })
    }

    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    )
  }

  return NextResponse.json({ profile })
}
