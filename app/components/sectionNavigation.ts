'use client'

export const homepageSections = [
  { id: 'hero', href: '#hero', label: 'Home' },
  { id: 'contact', href: '#contact', label: 'Contact' },
] as const

export const navigationItems = [
  { id: 'hero', href: '/', label: 'Home', kind: 'scroll' },
  { id: 'about', href: '/about', label: 'About', kind: 'route' },
  { id: 'services', href: '/services', label: 'Services', kind: 'route' },
  { id: 'products', href: '/products', label: 'Products', kind: 'route' },
  { id: 'contact', href: '#contact', label: 'Contact', kind: 'scroll' },
] as const

export type NavigationItem = (typeof navigationItems)[number]

export type HomepageSectionId = (typeof homepageSections)[number]['id']

export function scrollToHomepageSection(sectionId: HomepageSectionId) {
  const element = document.getElementById(sectionId)

  if (!element) {
    window.location.href = sectionId === 'hero' ? '/' : `/#${sectionId}`
    return
  }

  element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  window.history.replaceState(null, '', sectionId === 'hero' ? '/' : `#${sectionId}`)
}
