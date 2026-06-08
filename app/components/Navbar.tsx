'use client'

import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import { useScrollSpy } from './ScrollSpy'
import { homepageSections, scrollToHomepageSection } from './sectionNavigation'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const activeSection = useScrollSpy()

  if (pathname.startsWith('/admin')) {
    return null
  }

  const isActive = (sectionId: string) => {
    return activeSection === sectionId
  }

  const handleSectionClick = (sectionId: (typeof homepageSections)[number]['id'], e: React.MouseEvent) => {
    e.preventDefault()
    setIsOpen(false)
    scrollToHomepageSection(sectionId)
  }

  return (
    <>
      <nav
        className="fixed top-0 left-0 w-full z-50 backdrop-blur-md border-b transition-all duration-300"
        style={{
          background: 'var(--nav-bg)',
          borderColor: 'var(--border-color)',
          boxShadow: 'var(--shadow-soft)',
        }}
      >
        <div className="max-w-7xl mx-auto h-16 px-3 sm:px-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="sm:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border transition-all duration-300"
              style={{ borderColor: 'var(--border-color)' }}
              aria-label="Open navigation menu"
            >
              <Menu size={20} style={{ color: 'var(--text-primary)' }} />
            </button>

            <a href="#hero" className="flex items-center gap-3" onClick={(e) => handleSectionClick('hero', e)}>
              <Image
                src="/logo.png"
                alt="Invenzo Logo"
                width={40}
                height={40}
                priority
              />
              <span
                className="hidden sm:block text-xl font-bold transition-colors duration-300"
                style={{ color: 'var(--text-primary)' }}
              >
                Invenzo
              </span>
            </a>
          </div>

          <div className="hidden sm:flex items-center gap-8 text-sm">
            {homepageSections.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleSectionClick(link.id, e)}
                className="whitespace-nowrap transition-colors duration-300 relative pb-0.5 cursor-pointer"
                style={{
                  color: isActive(link.id) ? 'var(--gold-primary)' : 'var(--text-secondary)',
                }}
              >
                {link.label}
                {isActive(link.id) && (
                  <div
                    className="absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-300"
                    style={{ backgroundColor: 'var(--gold-primary)' }}
                  />
                )}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <div
        className={`sm:hidden fixed inset-0 z-40 transition-opacity ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!isOpen}
      >
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="absolute inset-0 transition-opacity"
          style={{
            backgroundColor: isOpen ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0)',
          }}
          aria-label="Close navigation menu"
        />

        <aside
          className={`absolute left-0 top-0 h-full w-72 max-w-[82vw] border-r transition-transform duration-300 ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-color)',
          }}
        >
          <div
            className="flex items-center justify-between p-4 border-b transition-colors duration-300"
            style={{ borderColor: 'var(--border-color)' }}
          >
            <a
              href="#hero"
              className="flex items-center gap-3"
              onClick={(e) => {
                handleSectionClick('hero', e)
              }}
            >
              <Image
                src="/logo.png"
                alt="Invenzo Logo"
                width={36}
                height={36}
              />
              <span
                className="text-lg font-bold transition-colors duration-300"
                style={{ color: 'var(--text-primary)' }}
              >
                Invenzo
              </span>
            </a>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border transition-all duration-300"
              style={{ borderColor: 'var(--border-color)' }}
              aria-label="Close navigation menu"
            >
              <X size={20} style={{ color: 'var(--text-primary)' }} />
            </button>
          </div>

          <div className="px-4 py-6 flex flex-col gap-3">
            {homepageSections.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  handleSectionClick(link.id, e)
                }}
                className="rounded-lg border px-4 py-3 transition-all duration-300 cursor-pointer"
                style={{
                  backgroundColor: isActive(link.id) ? 'var(--hover-overlay)' : 'transparent',
                  borderColor: isActive(link.id) ? 'var(--gold-primary)' : 'var(--border-color)',
                  color: isActive(link.id) ? 'var(--gold-primary)' : 'var(--text-primary)',
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </aside>
      </div>
    </>
  )
}
