'use client'
import { getSupabaseClient } from '@/lib/supabaseClient'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { PremiumCard } from './PremiumCard'
import { PremiumButton } from './PremiumButton'

interface Product {
  id: string
  name: string
  slug: string
  tagline: string
  description: string
  image_url?: string
  status?: string
  project_type?: string
  featured?: boolean
}
const getImageUrl = (path?: string) => {
  if (!path) return ''

  const { data } = getSupabaseClient().storage
    .from('products')
    .getPublicUrl(path)

  return data.publicUrl
}
export function ProductsSection() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setError(null)
        const response = await fetch('/api/admin/products', {
          cache: 'no-store',
        })

        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.statusText}`)
        }

        const data = await response.json()

        if (data.error) {
          throw new Error(data.error)
        }

        setProducts(data.products || [])
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load products'
        console.error('Failed to fetch products:', err)
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section
      id="products"
      className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 transition-colors duration-300"
      style={{ background: 'var(--section-primary-bg)' }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl sm:text-5xl font-bold mb-4 transition-colors duration-300"
            style={{ color: 'var(--text-primary)' }}
          >
            Featured Products
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto transition-colors duration-300"
            style={{ color: 'var(--text-secondary)' }}
          >
            Intelligent solutions built to solve real business challenges and drive measurable impact.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-64 rounded-lg animate-pulse transition-colors duration-300"
                style={{ backgroundColor: 'var(--bg-card)' }}
              />
            ))}
          </div>
        ) : error ? (
          <div
            className="rounded-lg p-8 text-center"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderLeft: '4px solid var(--color-error)',
            }}
          >
            <p
              className="text-base transition-colors duration-300"
              style={{ color: 'var(--text-secondary)' }}
            >
              Unable to load products. Please try again later.
            </p>
            {process.env.NODE_ENV === 'development' && (
              <p
                className="text-sm mt-2 transition-colors duration-300"
                style={{ color: 'var(--color-error)' }}
              >
                {error}
              </p>
            )}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p
              className="text-lg transition-colors duration-300"
              style={{ color: 'var(--text-secondary)' }}
            >
              No products available at the moment.
            </p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {products.map((product) => {
              return (
                <motion.div key={product.id} variants={itemVariants}>
                  <PremiumCard>
                    {product.image_url && (
                      <img src={getImageUrl(product.image_url)} alt={product.name} className="w-full h-52 object-cover rounded-lg mb-4"/>
                  )}
                    <div className="flex gap-2 mb-3">
                      {product.status && (
                         <span
                            className="text-xs px-3 py-1 rounded-full border"
                          style={{
                           borderColor: 'var(--gold-primary)',
                           color: 'var(--gold-primary)',
                          }}>
                          {product.status}
                         </span>
                    )}
                    </div>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        
                        <h3
                          className="text-xl font-bold mb-1 transition-colors duration-300"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          {product.name}
                        </h3>
                        <p
                          className="text-sm font-medium"
                          style={{ color: 'var(--gold-primary)' }}
                        >
                          {product.tagline}
                        </p>
                      </div>
                    </div>
                    <Link href={`/products/${product.slug}`}>
                      <PremiumButton
                        variant="secondary"
                        size="sm"
                        className="w-full"
                      >
                        View Project →
                      </PremiumButton>
                    </Link>
                  </PremiumCard>
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </div>
    </section>
  )
}
