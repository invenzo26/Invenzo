'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error) setProducts(data || [])
    else console.error(error)

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Products</h1>
        <a
          href="/admin/products/new"
          className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700"
        >
          + Add Product
        </a>
      </div>

      {loading && (
        <p className="mt-10 text-center text-slate-400">Loading...</p>
      )}

      <div className="mt-8 grid gap-4">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white/5 border border-white/10 rounded-xl p-4 flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold text-lg">{p.name}</h3>
              <p className="text-slate-400 text-sm">{p.slug}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}