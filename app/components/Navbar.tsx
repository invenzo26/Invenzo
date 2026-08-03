'use client'

import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import { useTheme } from '@/app/providers/ThemeProvider'
import { useScrollSpy } from './ScrollSpy'
import { homepageSections, scrollToHomepageSection } from './sectionNavigation'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme } = useTheme()

  const logoSrc =
    theme === 'light'
      ? '/logo.png'
      : '/logo.png'
  const pathname = usePathname()
  const activeSection = useScrollSpy()
  useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 20)
  }

  window.addEventListener('scroll', handleScroll)

  return () => window.removeEventListener('scroll', handleScroll)
}, [])
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
  className={`
    fixed top-0 left-0 right-0 z-50
    px-4 sm:px-6 lg:px-8
    transition-all duration-500
    ${isScrolled ? 'pt-2' : 'pt-4'}
  `}
>
        <div
  className={`
    max-w-7xl mx-auto
    px-4 sm:px-6
    flex items-center justify-between gap-4
    glass-panel-elevated
    rounded-2xl
    transition-all duration-500
    ${isScrolled ? 'h-14 shadow-2xl' : 'h-16'}
  `}
>
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
                src={logoSrc}
                alt="Invenzo Logo"
                width={40}
                height={40}
                className='rounded-lg'
              />
              <span
                className="hidden sm:block text-xl font-bold transition-colors duration-300 tracking-tight"
                style={{ color: 'var(--text-primary)' }}
              >
                Invenzo
              </span>
            </a>

          <div className="hidden sm:flex items-center gap-12 text-sm font-medium">
            {homepageSections.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleSectionClick(link.id, e)}
                className={`
                  whitespace-nowrap transition-all duration-400 relative pb-1 cursor-pointer
                  tracking-wide
                  ${isActive(link.id)
                    ? 'font-semibold nav-link-active'
                    : 'font-medium hover:font-semibold'
                  }
                `}
                style={{
                  color: isActive(link.id) ? 'var(--gold-primary)' : 'var(--text-secondary)',
                }}
              >
                {link.label}
                {isActive(link.id) && (
                  <div
                    className="absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-400"
                    style={{
                      backgroundColor: 'var(--gold-primary)',
                      boxShadow: '0 0 12px rgba(212, 175, 55, 0.6)',
                    }}
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
        className={`sm:hidden fixed inset-0 z-60 transition-opacity ${
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
          } glass-panel`}
          style={{
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
                src={logoSrc}
                alt="Invenzo Logo"
                width={36}
                height={36}
                className='rounded-lg'
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
