'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function DashboardHome() {
  const [stats, setStats] = useState({
    contacts: 0,
    products: 0,
  })

  useEffect(() => {
    const loadStats = async () => {
      const { count: contacts } = await supabase
        .from('contacts')
        .select('*', { count: 'exact', head: true })

      const { count: products } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true })

      setStats({
        contacts: contacts || 0,
        products: products || 0,
      })
    }

    loadStats()
  }, [])

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <StatCard title="Total Contacts" value={stats.contacts} />
        <StatCard title="Total Products" value={stats.products} />
      </div>
    </div>
  )
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6">
      <p className="text-zinc-400 text-sm">{title}</p>
      <h2 className="text-4xl font-bold mt-2">{value}</h2>
    </div>
  )
}