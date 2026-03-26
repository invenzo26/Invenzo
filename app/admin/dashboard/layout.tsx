import { redirect } from 'next/navigation'
import { supabaseServer } from '@/lib/supabaseServer'
import { isAdmin } from '@/lib/checkAdmin'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const {
    data: { user },
  } = await supabaseServer.auth.getUser()

  if (!user) redirect('/admin/login')

  const allowed = await isAdmin(user.id)
  if (!allowed) redirect('/')

  return <>{children}</>
}