'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getSupabaseClient } from '@/lib/supabaseClient'

type Product = {
  name: string
  slug: string
  tagline: string | null
  description: string | null
  features?: string[]
  live_url?: string | null
}

export default function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const productId = typeof id === 'string' ? id : undefined

  useEffect(() => {
    async function fetchProduct() {
      const supabase = getSupabaseClient()
      if (!supabase || !productId) {
        setLoading(false)
        return
      }

      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', productId)
        .single()

      if (!error) {
        setProduct(data as Product)
      } else {
        console.error(error)
      }

      setLoading(false)
    }

    void fetchProduct()
  }, [productId])

  if (loading) {
    return (
      <main
        className="min-h-screen px-4 sm:px-6 pt-24 sm:pt-32 pb-20 relative overflow-hidden transition-colors duration-300"
        style={{ background: 'var(--bg-layered)', color: 'var(--text-primary)' }}
      >
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[380px] w-[min(100vw,760px)] -translate-x-1/2 opacity-20"
          style={{ background: 'radial-gradient(ellipse at top, var(--metallic-highlight), transparent 70%)' }}
        />
        <div
          className="pointer-events-none absolute bottom-0 right-0 h-[300px] w-[min(80vw,560px)] opacity-15"
          style={{ background: 'radial-gradient(ellipse at bottom right, var(--metallic-sheen), transparent 72%)' }}
        />

        <div className="relative max-w-4xl mx-auto">
          <div className="h-12 w-3/4 rounded-lg animate-pulse" style={{ backgroundColor: 'var(--bg-card)' }} />
          <div className="mt-4 h-6 w-1/3 rounded-lg animate-pulse" style={{ backgroundColor: 'var(--hover-overlay)' }} />
          <div className="mt-8 space-y-3">
            <div className="h-4 w-full rounded animate-pulse" style={{ backgroundColor: 'var(--bg-card)' }} />
            <div className="h-4 w-11/12 rounded animate-pulse" style={{ backgroundColor: 'var(--bg-card)' }} />
            <div className="h-4 w-4/5 rounded animate-pulse" style={{ backgroundColor: 'var(--bg-card)' }} />
          </div>
          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-12 rounded-lg animate-pulse" style={{ backgroundColor: 'var(--bg-card)' }} />
            ))}
          </div>
        </div>
      </main>
    )
  }

  if (!product) {
    return (
      <p className="pt-40 text-center" style={{ color: 'var(--color-error)' }}>
        Product not found
      </p>
    )
  }

  return (
    <main
      className="min-h-screen px-4 sm:px-6 pt-24 sm:pt-32 pb-20 relative overflow-hidden transition-colors duration-300"
      style={{ background: 'var(--bg-layered)', color: 'var(--text-primary)' }}
    >
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[380px] w-[min(100vw,760px)] -translate-x-1/2 opacity-20"
        style={{ background: 'radial-gradient(ellipse at top, var(--metallic-highlight), transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-[300px] w-[min(80vw,560px)] opacity-15"
        style={{ background: 'radial-gradient(ellipse at bottom right, var(--metallic-sheen), transparent 72%)' }}
      />

      <div className="relative max-w-4xl mx-auto">
        <div className="mb-8 flex items-center gap-4 sm:gap-5">

          <div className="min-w-0">
            <h1 className="text-3xl sm:text-5xl font-bold leading-tight">{product.name}</h1>
            <p className="text-base sm:text-xl mt-2" style={{ color: 'var(--gold-primary)' }}>
              {product.tagline}
            </p>
          </div>
        </div>

        <p className="text-sm sm:text-base mt-6 sm:mt-8 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {product.description}
        </p>

        <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {product.features?.map((feature, index) => (
            <div
              key={index}
              className="border rounded-lg px-4 py-3 text-sm sm:text-base"
              style={{
                background: 'var(--card-bg)',
                borderColor: 'var(--border-color)',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <span style={{ color: 'var(--gold-primary)' }}>-</span> {feature}
            </div>
          ))}
        </div>

        {product.live_url && (
          <a
            href={product.live_url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex justify-center w-full sm:w-auto mt-10 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-all duration-300 hover:-translate-y-0.5 text-sm sm:text-base"
            style={{
              backgroundColor: 'var(--gold-primary)',
              color: 'var(--bg-primary)',
              boxShadow: '0 18px 45px rgba(201, 162, 39, 0.2)',
            }}
          >
            Visit Product
          </a>
        )}
      </div>
    </main>
  )
}
