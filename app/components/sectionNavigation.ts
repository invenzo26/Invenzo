'use client'

export const homepageSections = [
  { id: 'hero', href: '#hero', label: 'Home' },
  { id: 'products', href: '#products', label: 'Products' },
  { id: 'services', href: '#services', label: 'Services' },
  { id: 'contact', href: '#contact', label: 'Contact' },
] as const

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
