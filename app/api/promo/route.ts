import { NextResponse } from 'next/server'
import { defaultPromoSettings } from '@/lib/promoSettings'
import { getSupabaseServerClient } from '@/lib/supabaseServer'

export async function GET() {
  const supabase = getSupabaseServerClient()

  if (!supabase) {
    return NextResponse.json({ settings: defaultPromoSettings })
  }

  const { data, error } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'home_promo_card')
    .maybeSingle()

  if (error || !data?.value) {
    return NextResponse.json({ settings: defaultPromoSettings })
  }

  return NextResponse.json({
    settings: {
      ...defaultPromoSettings,
      ...data.value,
    },
  })
}
