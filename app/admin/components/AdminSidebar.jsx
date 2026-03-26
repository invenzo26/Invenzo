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
} from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/admin')
  }

  const links = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Products', href: '/admin/dashboard/products', icon: Package },
    { name: 'Users', href: '/admin/dashboard/users', icon: Users },
    { name: 'Contacts', href: '/admin/dashboard/contacts', icon: MessageSquare },
    { name: 'Settings', href: '/admin/dashboard/settings', icon: Settings },
  ]

  return (
    <aside className="w-72 min-h-screen bg-black border-r border-white/10 flex flex-col">
      {/* LOGO */}
      <div className="h-20 flex items-center px-6 border-b border-white/10">
        <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          Invenzo Admin
        </span>
      </div>

      {/* NAV */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        {links.map((link) => {
          const Icon = link.icon
          const active = pathname === link.href

          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition
                ${
                  active
                    ? 'bg-white/10 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
            >
              <Icon size={20} />
              {link.name}
            </Link>
          )
        })}
      </nav>

      {/* LOGOUT */}
      <button
        onClick={handleLogout}
        className="m-4 flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition"
      >
        <LogOut size={20} />
        Logout
      </button>
    </aside>
  )
}