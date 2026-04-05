'use client'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getSupabaseClient } from '@/lib/supabaseClient'

export default function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProduct()
  }, [])

  async function fetchProduct() {
    const supabase = getSupabaseClient()
    if (!supabase) {
      setLoading(false)
      return
    }
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
    return (
      <main className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-black text-white px-4 sm:px-6 pt-24 sm:pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-[-150px] left-1/2 -translate-x-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-purple-600/30 blur-[140px] rounded-full"></div>
        <div className="absolute bottom-[-120px] right-[-120px] w-[240px] sm:w-[400px] h-[240px] sm:h-[400px] bg-cyan-500/30 blur-[140px] rounded-full"></div>

        <div className="relative max-w-4xl mx-auto">
          <div className="h-12 w-3/4 rounded-2xl bg-white/10 animate-pulse" />
          <div className="mt-4 h-6 w-1/3 rounded-xl bg-purple-400/20 animate-pulse" />
          <div className="mt-8 space-y-3">
            <div className="h-4 w-full rounded bg-white/10 animate-pulse" />
            <div className="h-4 w-11/12 rounded bg-white/10 animate-pulse" />
            <div className="h-4 w-4/5 rounded bg-white/10 animate-pulse" />
          </div>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="h-12 rounded-xl bg-white/10 animate-pulse" />
            <div className="h-12 rounded-xl bg-white/10 animate-pulse" />
            <div className="h-12 rounded-xl bg-white/10 animate-pulse" />
            <div className="h-12 rounded-xl bg-white/10 animate-pulse" />
          </div>
        </div>
      </main>
    )
  }

  if (!product) {
    return <p className="pt-40 text-center text-red-400">Product not found</p>
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-black text-white px-4 sm:px-6 pt-24 sm:pt-32 pb-20 relative overflow-hidden">
      
      {/* Glow Effects */}
      <div className="absolute top-[-150px] left-1/2 -translate-x-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-purple-600/30 blur-[140px] rounded-full"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-[240px] sm:w-[400px] h-[240px] sm:h-[400px] bg-cyan-500/30 blur-[140px] rounded-full"></div>

      <div className="relative max-w-4xl mx-auto">
        
        <h1 className="text-3xl sm:text-5xl font-bold leading-tight">
          {product.name}
        </h1>

        <p className="text-base sm:text-xl text-purple-400 mt-2">
          {product.tagline}
        </p>

        <p className="text-sm sm:text-base text-slate-300 mt-6 sm:mt-8 leading-relaxed">
          {product.description}
        </p>

        {/* Features */}
        <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {product.features?.map((f: string, i: number) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm sm:text-base"
            >
              ⚡ {f}
            </div>
          ))}
        </div>

        {/* CTA */}
        {product.live_url && (
          <a
            href={product.live_url}
            target="_blank"
            className="inline-flex justify-center w-full sm:w-auto mt-10 px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 font-semibold hover:scale-105 transition-transform text-sm sm:text-base"
          >
            Visit Product
          </a>
        )}

      </div>
    </main>
  )
}
