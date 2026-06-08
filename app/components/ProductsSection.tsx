'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { PremiumCard } from './PremiumCard'
import { PremiumButton } from './PremiumButton'
import { getProductIcon } from '@/lib/productMeta'

interface Product {
  id: string
  name: string
  slug: string
  tagline: string
  description: string
  features?: string[]
}

export function ProductsSection() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/admin/products', {
          cache: 'no-store',
        })
        const data = await response.json()
        setProducts(data.products || [])
      } catch (error) {
        console.error('Failed to fetch products:', error)
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
            Our Products
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
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {products.map((product) => {
              const Icon = getProductIcon(product.slug)
              return (
                <motion.div key={product.id} variants={itemVariants}>
                  <PremiumCard>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        {Icon && (
                          <Icon
                            className="w-10 h-10 mb-4"
                            style={{ color: 'var(--gold-primary)' }}
                          />
                        )}
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

                    <p
                      className="text-sm leading-relaxed mb-6 transition-colors duration-300"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {product.description}
                    </p>

                    {product.features && product.features.length > 0 && (
                      <ul className="space-y-2 mb-6">
                        {product.features.slice(0, 3).map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-center text-sm transition-colors duration-300"
                            style={{ color: 'var(--text-secondary)' }}
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full mr-3"
                              style={{
                                backgroundColor: 'var(--gold-primary)',
                              }}
                            />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}

                    <Link href={`/products/${product.slug}`}>
                      <PremiumButton
                        variant="secondary"
                        size="sm"
                        className="w-full"
                      >
                        Learn More
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
