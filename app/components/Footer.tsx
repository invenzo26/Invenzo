'use client'

import { motion } from 'framer-motion'
import { ArrowUp, Github, Instagram, Linkedin } from 'lucide-react'
import Link from 'next/link'
import { navigationItems, scrollToHomepageSection } from './sectionNavigation'

const socialLinks = [
  { icon: Github, href: 'https://github.com/Invenzo26', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/invenzo-solutions-91006a3b1/', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://www.instagram.com/invenzo_ai_solutions/', label: 'Instagram' },
]

export function Footer() {
  return (
    <footer
      className="relative z-10 overflow-hidden px-4 pb-10 pt-24 sm:px-6 lg:px-8"
      style={{ background: 'var(--section-surface-bg)' }}
    >
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, var(--gold-primary), transparent)' }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 flex select-none items-center justify-center text-[18vw] font-black leading-none"
        style={{ color: 'var(--gold-primary)', opacity: 0.035 }}
      >
        INVENZO
      </div>

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: 0.75 }}
          className="grid gap-12 lg:grid-cols-[1fr_0.55fr_0.55fr]"
        >
          <div>
            <p className="mb-5 text-xs font-semibold uppercase" style={{ color: 'var(--gold-primary)', letterSpacing: '0.24em' }}>
              Invenzo AI Solutions
            </p>
            <h2 className="max-w-2xl text-[clamp(2.35rem,6vw,6rem)] font-semibold leading-[0.98]" style={{ color: 'var(--text-primary)' }}>
              Build what your business will run on next.
            </h2>
            <p className="mt-7 max-w-lg leading-8" style={{ color: 'var(--text-secondary)' }}>
              AI-powered products, automation systems, and scalable SaaS platforms for ambitious businesses.
            </p>
          </div>

          <div>
            <p className="mb-6 text-xs font-semibold uppercase" style={{ color: 'var(--gold-primary)', letterSpacing: '0.2em' }}>
              Navigate
            </p>
            <div className="grid gap-3">
              {navigationItems.map((link) => link.kind === 'scroll' ? (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToHomepageSection(link.id)
                  }}
                  className="transition-colors duration-300 hover:text-gold-primary"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {link.label}
                </a>
              ) : (
                <Link key={link.href} href={link.href} className="transition-colors duration-300 hover:text-gold-primary" style={{ color: 'var(--text-secondary)' }}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-6 text-xs font-semibold uppercase" style={{ color: 'var(--gold-primary)', letterSpacing: '0.2em' }}>
              Contact
            </p>
            <a href="mailto:invenzo26@gmail.com" className="block transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>
              invenzo26@gmail.com
            </a>
            <p className="mt-3" style={{ color: 'var(--text-secondary)' }}>
              Coimbatore, Tamil Nadu, India
            </p>
            <div className="mt-8 flex gap-3">
              {socialLinks.map((item) => {
                const Icon = item.icon
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="grid h-11 w-11 place-items-center rounded-xl border transition-transform duration-300 hover:-translate-y-1"
                    style={{ background: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
                  >
                    <Icon className="h-5 w-5" style={{ color: 'var(--gold-primary)' }} />
                  </a>
                )
              })}
            </div>
          </div>
        </motion.div>

        <div className="mt-20 flex flex-col justify-between gap-4 border-t pt-8 text-sm md:flex-row" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
          <p>Copyright 2026 Invenzo AI Solutions. All rights reserved.</p>
          <p>Built in India with intelligent craft.</p>
        </div>
      </div>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'auto' })}
        className="fixed bottom-5 right-5 z-[55] grid h-12 w-12 place-items-center rounded-full border transition-transform duration-300 hover:-translate-y-1"
        style={{ background: 'var(--gold-primary)', borderColor: 'var(--gold-primary)', color: 'var(--bg-primary)' }}
        aria-label="Back to top"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </footer>
  )
}
