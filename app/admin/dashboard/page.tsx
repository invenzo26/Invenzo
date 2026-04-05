'use client'

import { useEffect, useState } from 'react'
import { Box, Inbox, Sparkles, Users } from 'lucide-react'
import { getSupabaseClient } from '@/lib/supabaseClient'

type DashboardState = {
  contacts: number
  products: number
  admins: number
}

const initialState: DashboardState = {
  contacts: 0,
  products: 0,
  admins: 0,
}

export default function AdminDashboard() {
  const [state, setState] = useState<DashboardState>(initialState)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      const supabase = getSupabaseClient()

      if (!supabase) {
        setLoading(false)
        return
      }

      const [
        contactsCountResult,
        productsCountResult,
        adminsCountResult,
      ] = await Promise.all([
        supabase.from('contacts').select('*', { count: 'exact', head: true }),
        supabase.from('products').select('*', { count: 'exact', head: true }),
        supabase.from('admin_users').select('*', { count: 'exact', head: true }),
      ])

      setState({
        contacts: contactsCountResult.count || 0,
        products: productsCountResult.count || 0,
        admins: adminsCountResult.count || 0,
      })
      setLoading(false)
    }

    fetchDashboardData()
  }, [])

  const cards = [
    {
      title: 'Products',
      value: state.products,
      detail: 'Entries currently synced with the public catalog.',
      icon: Box,
      tone: 'from-purple-500/20 to-purple-500/5',
    },
    {
      title: 'Contacts',
      value: state.contacts,
      detail: 'Messages submitted through the website contact form.',
      icon: Inbox,
      tone: 'from-cyan-500/20 to-cyan-500/5',
    },
    {
      title: 'Admins',
      value: state.admins,
      detail: 'Authorized accounts with admin panel access.',
      icon: Users,
      tone: 'from-fuchsia-500/20 to-fuchsia-500/5',
    },
    {
      title: 'Status',
      value: loading ? 'Syncing' : 'Live',
      detail: 'Dashboard data is being pulled directly from Supabase.',
      icon: Sparkles,
      tone: 'from-white/10 to-white/[0.03]',
    },
  ]

  return (
    <div className="space-y-5">
      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon

          return (
            <div key={card.title} className={`rounded-[1.4rem] border border-white/10 bg-[linear-gradient(145deg,rgba(24,10,42,0.92),rgba(13,12,34,0.94))] p-4 shadow-[0_18px_45px_rgba(4,8,20,0.28)]`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-400">{card.title}</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">{card.value}</h2>
                </div>
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${card.tone} text-cyan-300 ring-1 ring-white/10`}>
                  <Icon size={18} />
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-400">{card.detail}</p>
            </div>
          )
        })}
      </section>
    </div>
  )
}
