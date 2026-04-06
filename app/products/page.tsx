'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { getSupabaseClient } from '@/lib/supabaseClient'
import { getProductIcon } from '@/lib/productMeta'

type Product = {
  id: string
  name: string
  slug: string | null
  tagline: string | null
  description: string | null
}

const extraProducts = [
  {
    id: 'FocusLock',
    name: 'FocusLock',
    slug: 'FocusLock',
    tagline: 'Coming Soon....',
    description: 'Coming Soon....',
  },
]

export default function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      const supabase = getSupabaseClient()
      if (!supabase) {
        setLoading(false)
        return
      }

      const { data, error } = await supabase
        .from('products')
        .select('id, name, slug, tagline, description')
        .order('created_at', { ascending: false })

      if (!error) {
        setProducts(data || [])
      } else {
        console.error(error)
      }

      setLoading(false)
    }

    fetchProducts()
  }, [])

  const normalizedLiveKeys = new Set(
    products.flatMap((product) => [product.slug, product.name, product.id]).filter(Boolean).map((value) => String(value).toLowerCase())
  )

  const displayProducts = [
    ...extraProducts.filter(
      (product) => !normalizedLiveKeys.has(String(product.slug || product.name || product.id).toLowerCase())
    ),
    ...products,
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-black text-white px-4 sm:px-6 pt-24 sm:pt-28 pb-20 sm:pb-24 overflow-hidden">
      <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[320px] h-[320px] sm:w-[600px] sm:h-[600px] bg-purple-600/20 blur-[100px] sm:blur-[150px] rounded-full" />

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl sm:text-4xl font-bold text-center mb-3 sm:mb-5"
      >
        Our Products
      </motion.h1>

      <p className="text-center text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mb-10 sm:mb-16">
        We design and build AI-powered SaaS platforms that solve real-world problems with elegance and performance.
      </p>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-10 max-w-7xl mx-auto">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6 backdrop-blur-xl"
            >
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-2xl bg-white/10 animate-pulse" />
                <div className="min-w-0 flex-1">
                  <div className="h-6 w-2/3 rounded bg-white/10 animate-pulse" />
                  <div className="mt-3 h-4 w-full rounded bg-white/10 animate-pulse" />
                  <div className="mt-2 h-4 w-5/6 rounded bg-white/10 animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-10 max-w-7xl mx-auto">
          {displayProducts.map((product) => {
            const ProductIcon = getProductIcon(product.slug || product.id)

            return (
              <Link key={product.id} href={`/products/${product.slug || product.id}`} className="block">
                <motion.div
                  whileHover={{ y: -8, scale: 1.03 }}
                  className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 sm:p-6 transition-all shadow-lg hover:shadow-purple-500/20"
                >
                  <div className="flex items-start gap-4">
                    <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-cyan-300">
                      <ProductIcon size={24} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                      <p className="text-sm sm:text-base text-slate-300 mb-5 sm:mb-6">
                        {product.tagline || product.description || 'Explore this product.'}
                      </p>
                    </div>
                  </div>

                  <div className="h-[2px] w-12 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full group-hover:w-24 transition-all" />
                </motion.div>
              </Link>
            )
          })}
        </div>
      )}
    </main>
  )
}
