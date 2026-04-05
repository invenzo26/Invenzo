export type PromoSettings = {
  enabled: boolean
  title: string
  description: string
  ctaLabel: string
  href: string
}

export const defaultPromoSettings: PromoSettings = {
  enabled: true,
  title: '🚀 New Product Launch',
  description:
    "We're glad that our new product which will increase your productivity and focus is getting launched soon...!!",
  ctaLabel: 'Get more info ->',
  href: '/products/FocusLock',
}
