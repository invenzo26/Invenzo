'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getSupabaseClient } from '@/lib/supabaseClient'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      const supabase = getSupabaseClient()

      if (!supabase) {
        router.push('/admin/login')
        return
      }

      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push('/admin/login')
      }
    }

    checkUser()
  }, [router])

  return <>{children}</>
}