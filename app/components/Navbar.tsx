'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  if (pathname.startsWith('/admin')) {
    return null
  }

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto h-16 px-3 sm:px-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="sm:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white"
              aria-label="Open navigation menu"
            >
              <Menu size={20} />
            </button>

            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Invenzo Logo"
                width={40}
                height={40}
                priority
              />
              <span className="hidden sm:block text-xl font-bold text-white">Invenzo</span>
            </Link>
          </div>

          <div className="hidden sm:flex items-center gap-8 text-base text-slate-300">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white whitespace-nowrap">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <div
        className={`sm:hidden fixed inset-0 z-50 transition ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        aria-hidden={!isOpen}
      >
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className={`absolute inset-0 bg-black/60 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`}
          aria-label="Close navigation menu"
        />

        <aside
          className={`absolute left-0 top-0 h-full w-72 max-w-[82vw] border-r border-white/10 bg-slate-950/95 backdrop-blur-2xl transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <Link href="/" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
              <Image
                src="/logo.png"
                alt="Invenzo Logo"
                width={36}
                height={36}
              />
              <span className="text-lg font-bold text-white">Invenzo</span>
            </Link>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white"
              aria-label="Close navigation menu"
            >
              <X size={20} />
            </button>
          </div>

          <div className="px-4 py-6 flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white hover:bg-white/10 transition"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </>
  )
}
