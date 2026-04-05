import { NextResponse } from 'next/server'
import { defaultPromoSettings } from '@/lib/promoSettings'
import { getSupabaseServerClient } from '@/lib/supabaseServer'
import { isMissingSiteSettingsTable, readFallbackSiteSetting } from '@/lib/siteSettingsFallback'

export async function GET() {
  const supabase = getSupabaseServerClient()

  if (!supabase) {
    const settings = await readFallbackSiteSetting('home_promo_card', defaultPromoSettings)
    return NextResponse.json({ settings })
  }

  const { data, error } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'home_promo_card')
    .maybeSingle()

  if (error) {
    if (isMissingSiteSettingsTable(error)) {
      const settings = await readFallbackSiteSetting('home_promo_card', defaultPromoSettings)
      return NextResponse.json({ settings })
    }

    return NextResponse.json({ settings: defaultPromoSettings })
  }

  if (!data?.value) {
    const settings = await readFallbackSiteSetting('home_promo_card', defaultPromoSettings)
    return NextResponse.json({ settings })
  }

  return NextResponse.json({
    settings: {
      ...defaultPromoSettings,
      ...data.value,
    },
  })
}
