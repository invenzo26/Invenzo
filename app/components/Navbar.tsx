'use client'

import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { type MouseEvent, useEffect, useState } from 'react'
import { ThemeToggle } from './ThemeToggle'
import { useTheme } from '@/app/providers/ThemeProvider'
import { useScrollSpy } from './ScrollSpy'
import { homepageSections, scrollToHomepageSection } from './sectionNavigation'
import { cinematicEase } from './animations/motionVariants'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme } = useTheme()
  const pathname = usePathname()
  const activeSection = useScrollSpy()
  const logoSrc = theme === 'light' ? '/favicon-96x96.png' : '/favicon-96x96.png'

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (pathname.startsWith('/admin')) {
    return null
  }

  const isActive = (sectionId: string) => activeSection === sectionId
  const handleSectionClick = (sectionId: (typeof homepageSections)[number]['id'], e: MouseEvent) => {
    e.preventDefault()
    setIsOpen(false)
    scrollToHomepageSection(sectionId)
  }

  return (
    <>
      <nav className="fixed left-0 right-0 top-0 z-[80] px-3 pt-3 sm:px-6">
        <div
          className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 rounded-2xl border px-3 transition-colors duration-200 sm:px-5"
          style={{
            background: 'var(--nav-bg)',
            borderColor: 'var(--border-color)',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          <a href="#hero" className="group flex items-center gap-3" onClick={(e) => handleSectionClick('hero', e)}>
            <span className="relative grid h-10 w-10 place-items-center rounded-xl border" style={{ borderColor: 'var(--border-color)', background: 'var(--card-bg)' }}>
              <Image src={logoSrc} alt="Invenzo Logo" width={28} height={28} className="rounded-md" />
              <span className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ boxShadow: 'inset 0 0 18px rgba(212,175,55,0.24)' }} />
            </span>
            <span className="hidden text-base font-semibold sm:block" style={{ color: 'var(--text-primary)' }}>
              Invenzo
            </span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {homepageSections.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleSectionClick(link.id, e)}
                className="relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300"
                style={{ color: isActive(link.id) ? 'var(--text-primary)' : 'var(--text-secondary)' }}
              >
                {isActive(link.id) && (
                  <span
                    className="absolute inset-0 rounded-full"
                    style={{ background: 'var(--hover-overlay)', border: '1px solid var(--border-color)' }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border md:hidden"
              style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
              aria-label="Open navigation menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[60] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute inset-0"
              style={{ background: 'rgba(0,0,0,0.64)' }}
              aria-label="Close navigation menu"
            />

            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.42, ease: cinematicEase }}
              className="absolute inset-0 h-full w-full p-4"
              style={{
                background: 'var(--nav-bg)',
                borderColor: 'var(--border-color)',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <div className="flex items-center justify-between">
                <a href="#hero" className="flex items-center gap-3" onClick={(e) => handleSectionClick('hero', e)}>
                  <Image src={logoSrc} alt="Invenzo Logo" width={34} height={34} className="rounded-lg" />
                  <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>Invenzo</span>
                </a>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="grid h-10 w-10 place-items-center rounded-xl border"
                  style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                  aria-label="Close navigation menu"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mt-10 flex flex-col gap-2">
                {homepageSections.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleSectionClick(link.id, e)}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.35 }}
                    className="rounded-xl border px-4 py-4 text-lg font-medium"
                    style={{
                      background: isActive(link.id) ? 'var(--hover-overlay)' : 'transparent',
                      borderColor: isActive(link.id) ? 'var(--gold-primary)' : 'var(--border-color)',
                      color: isActive(link.id) ? 'var(--gold-primary)' : 'var(--text-primary)',
                    }}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
