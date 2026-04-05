'use client'

import { useEffect, useState } from 'react'
import { getSupabaseClient } from '@/lib/supabaseClient'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    contacts: 0,
    products: 0,
  })
  
  useEffect(() => {
    const fetchStats = async () => {
    const supabase = getSupabaseClient()

    if (!supabase) return

    // Get contacts count
    const { count: contactCount } = await supabase
      .from('contacts')
      .select('*', { count: 'exact', head: true })

    // Get products count
    const { count: productCount } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true })

    setStats({
      contacts: contactCount || 0,
      products: productCount || 0,
    })
  }
    fetchStats()
  }, [])
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl border border-zinc-800">
          <h2 className="text-lg font-semibold mb-2">
            Contacts
          </h2>
          <p className="text-2xl font-bold">
            {stats.contacts}
          </p>
        </div>

        <div className="p-6 rounded-xl border border-zinc-800">
          <h2 className="text-lg font-semibold mb-2">
            Products
          </h2>
          <p className="text-2xl font-bold">
            {stats.products}
          </p>
        </div>
      </div>
    </div>
  )
}