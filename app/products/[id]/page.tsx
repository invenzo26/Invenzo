'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getSupabaseClient } from '@/lib/supabaseClient'
import { getProductIcon } from '@/lib/productMeta'

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
  const ProductIcon = getProductIcon(productId)

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
        <div className="absolute top-[-150px] left-1/2 -translate-x-1/2 h-[300px] w-[300px] rounded-full blur-[140px] opacity-20 sm:h-[600px] sm:w-[600px]" style={{ background: 'var(--metallic-highlight)' }} />
        <div className="absolute bottom-[-120px] right-[-120px] h-[240px] w-[240px] rounded-full blur-[140px] opacity-20 sm:h-[400px] sm:w-[400px]" style={{ background: 'var(--metallic-sheen)' }} />

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
      <div className="absolute top-[-150px] left-1/2 -translate-x-1/2 h-[300px] w-[300px] rounded-full blur-[140px] opacity-20 sm:h-[600px] sm:w-[600px]" style={{ background: 'var(--metallic-highlight)' }} />
      <div className="absolute bottom-[-120px] right-[-120px] h-[240px] w-[240px] rounded-full blur-[140px] opacity-20 sm:h-[400px] sm:w-[400px]" style={{ background: 'var(--metallic-sheen)' }} />

      <div className="relative max-w-4xl mx-auto">
        <div className="mb-8 flex items-center gap-4 sm:gap-5">
          <div
            className="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border"
            style={{
              background: 'var(--card-bg)',
              borderColor: 'var(--border-color)',
              color: 'var(--gold-primary)',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <ProductIcon size={30} />
          </div>

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
