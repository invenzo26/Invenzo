'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

const menu = [
  { name: 'Overview', path: '/admin/dashboard' },
  { name: 'Contacts', path: '/admin/dashboard/contacts' },
  { name: 'Products', path: '/admin/dashboard/products' },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  const logout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  return (
    <div className="min-h-screen flex bg-black text-white">

      {/* Sidebar */}
      <aside className="w-64 bg-zinc-950 border-r border-zinc-800 p-6">
        <h1 className="text-2xl font-bold mb-10">Invenzo Admin</h1>

        <nav className="space-y-3">
          {menu.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`block px-4 py-2 rounded transition
                ${pathname === item.path
                  ? 'bg-white text-black'
                  : 'hover:bg-zinc-800'}`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <button
          onClick={logout}
          className="mt-10 w-full bg-red-600 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 bg-zinc-900 overflow-y-auto">
        {children}
      </main>

    </div>
  )
}