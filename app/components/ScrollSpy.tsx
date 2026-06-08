'use client'

import { useEffect, useState } from 'react'

type SectionId = 'hero' | 'products' | 'tech-stack' | 'services' | 'stats' | 'vision' | 'contact'

export function useScrollSpy(): SectionId {
  const [activeSection, setActiveSection] = useState<SectionId>('hero')

  useEffect(() => {
    // Create intersection observer to detect visible sections
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        // Find the section that is most visible (highest intersection ratio)
        let maxRatio = 0
        let maxEntry: IntersectionObserverEntry | null = null

        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio
            maxEntry = entry
          }
        })

        // If we found a visible section, update active state
        if (maxEntry) {
          const id = (maxEntry as IntersectionObserverEntry).target.id as unknown as SectionId
          setActiveSection(id)
        }
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: '-50% 0px -50% 0px', // Trigger when section is in middle of viewport
      }
    )

    // Observe all section elements
    const sections = document.querySelectorAll('section[id]')
    sections.forEach((section) => observer.observe(section))

    return () => {
      sections.forEach((section) => observer.unobserve(section))
    }
  }, [])

  return activeSection
}
