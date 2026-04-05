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
    <aside className="w-full shrink-0 border-b border-white/10 bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.18),_transparent_35%),linear-gradient(180deg,rgba(30,10,50,0.98),rgba(9,8,26,0.98)_52%,rgba(4,18,32,0.98))] backdrop-blur-2xl lg:w-28 lg:border-b-0 lg:border-r">
      <div className="sticky top-0 flex lg:min-h-screen lg:flex-col">
        <div className="flex items-center justify-center border-b border-white/10 px-4 py-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500/30 via-purple-500/25 to-cyan-500/25 text-cyan-300 ring-1 ring-purple-300/20 shadow-[0_0_24px_rgba(34,211,238,0.12)]">
              <ShieldCheck size={24} />
          </div>
        </div>

        <nav className="px-4 py-5">
          <div className="grid grid-cols-5 gap-2 lg:grid-cols-1">
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
                      ? 'justify-center bg-gradient-to-r from-fuchsia-500/18 via-purple-500/18 to-cyan-500/14 text-white ring-1 ring-purple-300/25 shadow-[0_0_22px_rgba(168,85,247,0.08)]'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
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
                </Link>
              )
            })}
          </div>
        </nav>

        <div className="px-4 pb-6 lg:mt-auto">
          <button
            onClick={handleLogout}
            title="Logout"
            className="flex w-full items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-red-200 transition hover:bg-red-500/15"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  )
}
