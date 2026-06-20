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

  const supabase = getSupabaseClient()

if (!supabase) return ''

const { data } = supabase.storage
  .from('products')
  .getPublicUrl(path)

  return data.publicUrl
}
const getStatusStyles = (status?: string) => {
  switch (status) {
    case 'Live':
      return {
        backgroundColor: 'rgba(16, 185, 129, 0.12)',
        borderColor: '#60ff04',
        color: '#00ff1a',
      }

    case 'Beta':
      return {
        backgroundColor: 'rgba(34, 197, 94, 0.12)',
        borderColor: '#00fbff',
        color: '#00ffff',
      }

    case 'Developing':
      return {
        backgroundColor: 'rgba(59, 130, 246, 0.12)',
        borderColor: '#fc06c3',
        color: '#e76fd7',
      }

    case 'Planning':
      return {
        backgroundColor: 'rgba(168, 85, 247, 0.12)',
        borderColor: '#A855F7',
        color: '#A855F7',
      }

    case 'Research':
      return {
        backgroundColor: 'rgba(139, 92, 246, 0.12)',
        borderColor: '#8B5CF6',
        color: '#8B5CF6',
      }

    default:
      return {
        backgroundColor: 'rgba(245, 158, 11, 0.12)',
        borderColor: '#F59E0B',
        color: '#F59E0B',
      }
  }
}
const getProjectTypeStyles = (type?: string) => {
  switch (type) {
    case 'EdTech':
      return {
        color: '#9436ff',
        borderColor: 'rgba(147,197,253,0.25)',
        backgroundColor: 'rgba(147,197,253,0.08)',
      }

    case 'CareerTech':
      return {
        color: '#C4B5FD',
        borderColor: 'rgba(196,181,253,0.25)',
        backgroundColor: 'rgba(196,181,253,0.08)',
      }

    case 'Automation':
      return {
        color: '#FDBA74',
        borderColor: 'rgba(253,186,116,0.25)',
        backgroundColor: 'rgba(253,186,116,0.08)',
      }

    case 'SaaS':
      return {
        color: '#67E8F9',
        borderColor: 'rgba(103,232,249,0.25)',
        backgroundColor: 'rgba(103,232,249,0.08)',
      }

    default:
      return {
        color: '#D1D5DB',
        borderColor: 'rgba(209,213,219,0.2)',
        backgroundColor: 'rgba(209,213,219,0.05)',
      }
  }
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
                      {product.project_type && (
                       <span
                            className="text-xs px-3 py-1 rounded-full border backdrop-blur-sm"
                            style={getProjectTypeStyles(product.project_type)}>
                              {product.project_type}
                        </span>
                      )}
                      {product.status && (
                         <span
                          className="text-xs px-3 py-1 rounded-full border"
                          style={getStatusStyles(product.status)}>{product.status}</span>)}
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