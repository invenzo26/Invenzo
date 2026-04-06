import { NextRequest, NextResponse } from 'next/server'
import { requireAdminApiUser } from '@/lib/adminApi'
import { defaultPromoSettings } from '@/lib/promoSettings'
import { getSupabaseServerClient } from '@/lib/supabaseServer'
import {
  isMissingSiteSettingsTable,
  readFallbackSiteSetting,
  writeFallbackSiteSetting,
} from '@/lib/siteSettingsFallback'

export async function GET() {
  const auth = await requireAdminApiUser()
  if (auth.error) return auth.error

  const { client: supabase } = getSupabaseServerClient()

  if (!supabase) {
    const settings = await readFallbackSiteSetting('home_promo_card', defaultPromoSettings)
    return NextResponse.json({ settings, storageReady: true, warning: null })
  }

  const { data, error } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'home_promo_card')
    .maybeSingle()

  if (error) {
    if (isMissingSiteSettingsTable(error)) {
      const settings = await readFallbackSiteSetting('home_promo_card', defaultPromoSettings)

      return NextResponse.json({
        settings,
        storageReady: true,
        warning: null,
      })
    }

    return NextResponse.json({
      settings: defaultPromoSettings,
      storageReady: false,
      warning: error.message,
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
  const auth = await requireAdminApiUser()
  if (auth.error) return auth.error

  const { client: supabase } = getSupabaseServerClient()

  const body = await req.json()
  const settings = {
    ...defaultPromoSettings,
    ...body,
  }

  if (!supabase) {
    await writeFallbackSiteSetting('home_promo_card', settings)
    return NextResponse.json({ settings })
  }

  const { error } = await supabase.from('site_settings').upsert(
    {
      key: 'home_promo_card',
      value: settings,
    },
    { onConflict: 'key' }
  )

  if (error) {
    if (isMissingSiteSettingsTable(error)) {
      await writeFallbackSiteSetting('home_promo_card', settings)
      return NextResponse.json({ settings })
    }

    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    )
  }

  return NextResponse.json({ settings })
}
