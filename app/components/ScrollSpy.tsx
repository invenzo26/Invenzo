'use client'

import { useEffect, useState } from 'react'

type SectionId = 'hero' | 'products' | 'tech-stack' | 'services' | 'stats' | 'vision' | 'contact'

export function useScrollSpy(): SectionId {
  const [activeSection, setActiveSection] = useState<SectionId>('hero')

  useEffect(() => {
    if (window.location.pathname !== '/') return

    const sectionElements = Array.from(document.querySelectorAll<HTMLElement>('section[id]'))
    const updateActiveSection = () => {
      const midpoint = window.innerHeight * 0.35
      const closest = sectionElements
        .map((section) => ({ section, distance: Math.abs(section.getBoundingClientRect().top - midpoint) }))
        .filter(({ section }) => section.getBoundingClientRect().bottom > 0 && section.getBoundingClientRect().top < window.innerHeight)
        .sort((a, b) => a.distance - b.distance)[0]

      if (closest) setActiveSection(closest.section.id as SectionId)
    }

    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('resize', updateActiveSection)

    const observer = new IntersectionObserver(
      () => updateActiveSection(),
      {
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    )

    sectionElements.forEach((section) => observer.observe(section))

    return () => {
      window.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('resize', updateActiveSection)
      sectionElements.forEach((section) => observer.unobserve(section))
    }
  }, [])

  return activeSection
}
