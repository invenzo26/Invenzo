import { redirect } from 'next/navigation'
import { getSupabaseServerClient } from '@/lib/supabaseServer'
import { isAdmin } from '@/lib/checkAdmin'

export const dynamic = 'force-dynamic'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabaseServer = getSupabaseServerClient()

  if (!supabaseServer) {
    redirect('/admin/login')
  }

  const {
    data: { user },
  } = await supabaseServer.auth.getUser()

  if (!user) redirect('/admin/login')

  const allowed = await isAdmin(user.id)
  if (!allowed) redirect('/')

  return <>{children}</>
}
