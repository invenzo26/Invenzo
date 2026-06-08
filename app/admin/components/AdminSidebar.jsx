'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  Package,
  Users,
  MessageSquare,
  Settings,
  LogOut,
  ShieldCheck,
} from 'lucide-react'
import { getSupabaseClient } from '@/lib/supabaseClient'

const links = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Products', href: '/admin/dashboard/products', icon: Package },
  { name: 'Users', href: '/admin/dashboard/users', icon: Users },
  { name: 'Contacts', href: '/admin/dashboard/contacts', icon: MessageSquare },
  { name: 'Settings', href: '/admin/dashboard/settings', icon: Settings },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    const supabase = getSupabaseClient()

    if (supabase) {
      await supabase.auth.signOut()
    }

    router.replace('/admin/login')
    router.refresh()
  }

  return (
    <aside className="sticky top-0 z-40 w-full shrink-0 border-b border-white/10 bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.18),_transparent_35%),linear-gradient(180deg,rgba(30,10,50,0.98),rgba(9,8,26,0.98)_52%,rgba(4,18,32,0.98))] backdrop-blur-2xl lg:w-28 lg:border-b-0 lg:border-r xl:w-72">
      <div className="flex flex-col lg:min-h-screen">
        <div className="flex items-center justify-between border-b border-white/10 px-3 py-3 sm:px-4 lg:justify-center lg:px-4 lg:py-6 xl:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500/30 via-purple-500/25 to-cyan-500/25 text-cyan-300 ring-1 ring-purple-300/20 shadow-[0_0_24px_rgba(34,211,238,0.12)] lg:h-14 lg:w-14">
              <ShieldCheck size={24} />
            </div>
            <div className="min-w-0 lg:hidden xl:block">
              <p className="text-sm font-semibold text-white">Admin Panel</p>
              <p className="text-xs text-slate-400">Invenzo workspace</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            title="Logout"
            className="inline-flex items-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-200 transition hover:bg-red-500/15 lg:hidden"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>

        <nav className="overflow-x-auto px-3 py-3 sm:px-4 lg:px-4 lg:py-5">
          <div className="grid auto-cols-[minmax(8rem,1fr)] grid-flow-col gap-2 lg:grid-flow-row lg:grid-cols-1 lg:auto-cols-auto">
            {links.map((link) => {
              const Icon = link.icon
              const active = pathname === link.href

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  title={link.name}
                  className={`group flex items-center gap-3 rounded-2xl px-4 py-3.5 transition ${
                    active
                      ? 'justify-start bg-gradient-to-r from-fuchsia-500/18 via-purple-500/18 to-cyan-500/14 text-white ring-1 ring-purple-300/25 shadow-[0_0_22px_rgba(168,85,247,0.08)] lg:justify-center xl:justify-start'
                      : 'justify-start text-slate-300 hover:bg-white/5 hover:text-white lg:justify-center xl:justify-start'
                  }`}
                >
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-xl transition ${
                      active
                        ? 'bg-white/10 text-cyan-300 ring-1 ring-cyan-300/15'
                        : 'bg-white/5 text-slate-400 group-hover:text-cyan-300'
                    }`}
                  >
                    <Icon size={18} />
                  </span>
                  <span className="truncate text-sm font-medium lg:hidden xl:block">{link.name}</span>
                </Link>
              )
            })}
          </div>
        </nav>

        <div className="hidden px-4 pb-6 lg:mt-auto lg:block">
          <button
            onClick={handleLogout}
            title="Logout"
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-red-200 transition hover:bg-red-500/15 xl:justify-start"
          >
            <LogOut size={18} />
            <span className="hidden text-sm font-medium xl:inline">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  )
}
