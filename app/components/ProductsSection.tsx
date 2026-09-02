'use client'

import { getSupabaseClient } from '@/lib/supabaseClient'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { PremiumButton } from './PremiumButton'
import { MotionSection } from './animations/MotionSection'
import { cinematicEase, productSlide } from './animations/motionVariants'

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
  const { data } = supabase.storage.from('products').getPublicUrl(path)
  return data.publicUrl
}

const statusPriority: Record<string, number> = {
  Live: 1,
  Beta: 2,
  Developing: 3,
  Planning: 4,
  Research: 5,
}

function Badge({ children }: { children: string }) {
  return (
    <span
      className="rounded-full border px-3 py-1 text-xs font-semibold uppercase"
      style={{
        color: 'var(--gold-primary)',
        borderColor: 'var(--border-color)',
        background: 'var(--hover-overlay)',
        letterSpacing: '0.08em',
      }}
    >
      {children}
    </span>
  )
}

export function ProductsSection() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setError(null)
        const response = await fetch('/api/admin/products', { cache: 'no-store' })

        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.statusText}`)
        }

        const data = await response.json()
        if (data.error) {
          throw new Error(data.error)
        }

        const sortedProducts = [...(data.products || [])].sort((a, b) => {
          const aPriority = statusPriority[a.status || ''] ?? 999
          const bPriority = statusPriority[b.status || ''] ?? 999
          return aPriority - bPriority
        })

        setProducts(sortedProducts)
        setActiveIndex(0)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load products'
        console.error('Failed to fetch products:', err)
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    void fetchProducts()
  }, [])

  const activeProduct = products[activeIndex]
  const imageUrl = useMemo(() => getImageUrl(activeProduct?.image_url), [activeProduct?.image_url])

  const goPrevious = () => {
    if (!products.length) return
    setActiveIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1))
  }

  const goNext = () => {
    if (!products.length) return
    setActiveIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1))
  }

  return (
    <section
      id="products"
      className="relative z-10 overflow-hidden px-4 py-24 sm:px-6 lg:px-8 lg:py-36"
      style={{ background: 'var(--section-primary-bg)' }}
    >
      <div className="absolute left-0 top-24 h-72 w-72 rounded-full opacity-14" style={{ background: 'radial-gradient(circle, rgba(212, 175, 55, 0.18), transparent 70%)' }} />
      <div className="absolute right-0 bottom-20 h-80 w-80 rounded-full opacity-12" style={{ background: 'radial-gradient(circle, rgba(212, 175, 55, 0.16), transparent 70%)' }} />

      <div className="relative mx-auto max-w-7xl">
        <MotionSection className="mb-14 grid gap-8 lg:grid-cols-[0.78fr_1fr] lg:items-end">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase" style={{ color: 'var(--gold-primary)', letterSpacing: '0.24em' }}>
              Product Lab
            </p>
            <h2 className="text-[clamp(2.4rem,6vw,5.8rem)] font-semibold leading-none tracking-normal" style={{ color: 'var(--text-primary)' }}>
              Digital products with a real operating surface.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-8 lg:justify-self-end" style={{ color: 'var(--text-secondary)' }}>
            Our products are built as usable systems, not static concepts: AI workflows, dashboards, learning tools, and automation layers designed for day-to-day business use.
          </p>
        </MotionSection>

        {loading ? (
          <div className="grid min-w-0 gap-6 lg:grid-cols-[1fr_0.42fr]">
            <div className="h-[400px] animate-pulse rounded-2xl border sm:h-[560px]" style={{ background: 'var(--card-bg)', borderColor: 'var(--border-color)' }} />
            <div className="hidden h-[560px] animate-pulse rounded-2xl border lg:block" style={{ background: 'var(--card-bg)', borderColor: 'var(--border-color)' }} />
          </div>
        ) : error ? (
          <div className="rounded-2xl border p-8 text-center" style={{ background: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
            <p style={{ color: 'var(--text-secondary)' }}>Unable to load products. Please try again later.</p>
            {process.env.NODE_ENV === 'development' && <p className="mt-2 text-sm" style={{ color: 'var(--color-error)' }}>{error}</p>}
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-2xl border p-10 text-center" style={{ background: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
            <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>No products available at the moment.</p>
          </div>
        ) : (
          <div className="grid min-w-0 gap-6 lg:grid-cols-[1fr_0.42fr]">
            <div className="relative min-w-0 min-h-[520px] overflow-hidden rounded-2xl border p-4 pb-20 sm:min-h-[590px] sm:p-6 sm:pb-6 lg:p-8" style={{ background: 'var(--card-bg)', borderColor: 'var(--border-color)', perspective: '1100px' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProduct.id}
                  variants={reduceMotion ? undefined : productSlide}
                  initial={reduceMotion ? { opacity: 0 } : 'enter'}
                  animate={reduceMotion ? { opacity: 1 } : 'center'}
                  exit={reduceMotion ? { opacity: 0 } : 'exit'}
                  className="grid h-full min-w-0 gap-8 lg:grid-cols-[0.58fr_0.42fr] lg:items-center"
                >
                  <div className="relative min-h-[300px] overflow-hidden rounded-2xl border sm:min-h-[430px]" style={{ borderColor: 'var(--border-color)', background: 'var(--bg-primary)' }}>
                    {imageUrl ? (
                      <motion.img
                        src={imageUrl}
                        alt={activeProduct.name}
                        className="h-full min-h-[300px] w-full object-cover sm:min-h-[430px]"
                        initial={{ scale: 1.08 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1.1, ease: cinematicEase }}
                      />
                    ) : (
                      <div className="grid h-full min-h-[300px] place-items-center sm:min-h-[430px]">
                        <div className="text-center">
                          <div className="mx-auto mb-5 h-20 w-20 rounded-2xl border" style={{ borderColor: 'var(--border-color)', background: 'var(--hover-overlay)' }} />
                          <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>{activeProduct.name}</p>
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 p-5" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.62), transparent)' }}>
                      <div className="flex flex-wrap gap-2">
                        {activeProduct.project_type && <Badge>{activeProduct.project_type}</Badge>}
                        {activeProduct.status && <Badge>{activeProduct.status}</Badge>}
                      </div>
                    </div>
                  </div>

                  <div className="min-w-0">
                    <p className="mb-5 text-xs font-semibold uppercase" style={{ color: 'var(--gold-primary)', letterSpacing: '0.2em' }}>
                      Featured system {String(activeIndex + 1).padStart(2, '0')}
                    </p>
                    <h3 className="text-4xl font-semibold leading-tight sm:text-5xl" style={{ color: 'var(--text-primary)' }}>
                      {activeProduct.name}
                    </h3>
                    <p className="mt-4 text-lg font-medium" style={{ color: 'var(--gold-primary)' }}>
                      {activeProduct.tagline}
                    </p>
                    <p className="mt-6 line-clamp-5 leading-8" style={{ color: 'var(--text-secondary)' }}>
                      {activeProduct.description}
                    </p>
                    <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                      <Link href={`/products/${activeProduct.slug}`}>
                        <PremiumButton variant="secondary" className="w-full sm:w-auto">
                          View Project
                        </PremiumButton>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="absolute bottom-5 right-5 flex gap-2">
                <button onClick={goPrevious} className="grid h-10 w-10 place-items-center rounded-full border sm:h-11 sm:w-11" style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)', background: 'var(--card-bg)' }} aria-label="Previous product">
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button onClick={goNext} className="grid h-10 w-10 place-items-center rounded-full border sm:h-11 sm:w-11" style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)', background: 'var(--card-bg)' }} aria-label="Next product">
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="min-w-0 space-y-3">
              {products.map((product, index) => (
                <button
                  key={product.id}
                  onClick={() => setActiveIndex(index)}
                  className="group flex min-w-0 w-full items-center gap-3 rounded-2xl border p-3 text-left transition-all duration-300 sm:gap-4 sm:p-4"
                  style={{
                    background: index === activeIndex ? 'var(--hover-overlay)' : 'var(--card-bg)',
                    borderColor: index === activeIndex ? 'var(--gold-primary)' : 'var(--border-color)',
                  }}
                >
                  <span className="text-xs font-semibold" style={{ color: 'var(--gold-primary)' }}>{String(index + 1).padStart(2, '0')}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-semibold" style={{ color: 'var(--text-primary)' }}>{product.name}</span>
                    <span className="mt-1 block truncate text-sm" style={{ color: 'var(--text-secondary)' }}>{product.tagline}</span>
                  </span>
                  <ExternalLink className="h-4 w-4 opacity-40 transition-opacity group-hover:opacity-100" style={{ color: 'var(--gold-primary)' }} />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
