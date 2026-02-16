'use client'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProduct()
  }, [])

  async function fetchProduct() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', id)
      .single()

    if (!error) setProduct(data)
    else console.error(error)

    setLoading(false)
  }

  if (loading) {
    return <p className="pt-40 text-center text-white">Loading...</p>
  }

  if (!product) {
    return <p className="pt-40 text-center text-red-400">Product not found</p>
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-black text-white px-6 pt-32 pb-24 relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
      <div className="absolute top-[-150px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/30 blur-[140px] rounded-full"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-[400px] h-[400px] bg-cyan-500/30 blur-[140px] rounded-full"></div>
        <h1 className="text-5xl font-bold">{product.name}</h1>
        <p className="text-xl text-purple-400 mt-2">{product.tagline}</p>

        <p className="text-slate-300 mt-8 leading-relaxed">
          {product.description}
        </p>

        <div className="mt-10 grid sm:grid-cols-2 gap-4">
          {product.features?.map((f: string, i: number) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3"
            >
              ⚡ {f}
            </div>
          ))}
        </div>

        {product.live_url && (
          <a
            href={product.live_url}
            target="_blank"
            className="inline-block mt-12 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 font-semibold hover:scale-105 transition-transform"
          >
            Visit Product
          </a>
        )}

      </div>
    </main>
  )
}