'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bell, Search, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

const pageCopy = {
  '/admin/dashboard': {
    title: 'Dashboard Overview',
    subtitle: 'Track platform activity, admin workflows, and recent trends.',
  },
  '/admin/dashboard/products': {
    title: 'Product Management',
    subtitle: 'Review catalog entries, add launches, and keep listings current.',
  },
  '/admin/dashboard/users': {
    title: 'Users',
    subtitle: 'Monitor your admin-facing user workflows and access state.',
  },
  '/admin/dashboard/contacts': {
    title: 'Contact Submissions',
    subtitle: 'Review incoming messages and follow up on new enquiries.',
  },
  '/admin/dashboard/settings': {
    title: 'Settings',
    subtitle: 'Configure the admin workspace and operational defaults.',
  },
}

export default function AdminTopbar() {
  const pathname = usePathname()
  const copy = pageCopy[pathname] ?? pageCopy['/admin/dashboard']
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isSearchOpen) {
      return
    }

    const timeoutId = window.setTimeout(async () => {
      if (!query.trim()) {
        setResults([])
        setLoading(false)
        return
      }

      setLoading(true)
      const response = await fetch(`/api/admin/search?q=${encodeURIComponent(query)}`, {
        credentials: 'include',
        cache: 'no-store',
      })
      const payload = await response.json()
      setResults(payload.results || [])
      setLoading(false)
    }, 220)

    return () => window.clearTimeout(timeoutId)
  }, [isSearchOpen, query])

  const helperText = useMemo(() => {
    if (!query.trim()) {
      return 'Search products, contacts, and admin-linked users.'
    }

    if (loading) {
      return 'Searching admin data...'
    }

    return results.length > 0 ? `${results.length} result(s) found` : 'No matching admin results.'
  }, [loading, query, results.length])

  return (
    <>
      <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <div className="inline-flex rounded-full border border-purple-300/15 bg-gradient-to-r from-fuchsia-500/10 to-cyan-500/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-300">
            Invenzo Admin
          </div>
          <h1 className="mt-3 text-2xl sm:text-3xl font-semibold text-white">{copy.title}</h1>
          <p className="mt-1.5 max-w-2xl text-sm text-slate-400">{copy.subtitle}</p>
        </div>

        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-3 rounded-2xl border border-purple-300/15 bg-[linear-gradient(135deg,rgba(255,255,255,0.05),rgba(168,85,247,0.08),rgba(34,211,238,0.06))] px-4 py-2.5 text-slate-300 transition hover:brightness-110 hover:text-white"
          >
            <Search size={18} />
            <span className="text-sm">Quick search</span>
          </button>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-purple-300/15 bg-[linear-gradient(135deg,rgba(255,255,255,0.05),rgba(168,85,247,0.08),rgba(34,211,238,0.06))] text-slate-300 transition hover:brightness-110 hover:text-white"
            aria-label="Notifications"
          >
            <Bell size={18} />
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-[70] transition ${isSearchOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        aria-hidden={!isSearchOpen}
      >
        <button
          type="button"
          onClick={() => setIsSearchOpen(false)}
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity ${isSearchOpen ? 'opacity-100' : 'opacity-0'}`}
          aria-label="Close quick search"
        />

        <div className={`absolute left-1/2 top-24 w-[min(92vw,760px)] -translate-x-1/2 transition-all ${isSearchOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
          <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(29,10,49,0.94),rgba(15,12,38,0.96)_58%,rgba(7,21,36,0.96))] shadow-2xl shadow-black/40 backdrop-blur-2xl">
            <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
              <Search size={18} className="text-slate-400" />
              <input
                autoFocus={isSearchOpen}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, contacts, and users"
                className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
              />
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white"
                aria-label="Close quick search"
              >
                <X size={16} />
              </button>
            </div>

            <div className="px-5 py-3 text-sm text-slate-400">{helperText}</div>

            <div className="max-h-[55vh] overflow-y-auto px-4 pb-4">
              {results.map((result) => (
                <Link
                  key={`${result.type}-${result.id}`}
                  href={result.href}
                  onClick={() => setIsSearchOpen(false)}
                  className="mb-2 block rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 transition hover:bg-white/[0.06]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-medium text-white">{result.title}</p>
                      <p className="mt-1 text-sm text-slate-400">{result.subtitle}</p>
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-slate-400">
                      {result.type}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
