import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServerClient } from '@supabase/ssr'
import AdminSidebar from '@/app/admin/components/AdminSidebar'
import AdminTopbar from '@/app/admin/components/AdminTopbar'
import { isAdmin } from '@/lib/checkAdmin'

export const dynamic = 'force-dynamic'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anonKey) {
    redirect('/admin/login')
  }

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set() {},
      remove() {},
    },
  })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  const allowed = await isAdmin(user.id)

  if (!allowed) {
    redirect('/')
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.28),_transparent_26%),radial-gradient(circle_at_bottom_right,_rgba(34,211,238,0.18),_transparent_28%),linear-gradient(135deg,#04030d,#14051f_42%,#071524)] text-white">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <AdminSidebar />

        <section className="min-w-0 flex-1">
          <div className="mx-auto max-w-7xl px-3 py-4 sm:px-5 sm:py-5 xl:px-7">
            <AdminTopbar />
            <div className="rounded-[1.6rem] border border-white/10 bg-[linear-gradient(145deg,rgba(28,12,48,0.86),rgba(15,13,36,0.88)_55%,rgba(8,20,36,0.82))] p-4 shadow-[0_24px_80px_rgba(5,8,20,0.55)] backdrop-blur-xl sm:p-5 lg:p-6">
              {children}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
