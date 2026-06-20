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
function MiniCard({
  product,
}: {
  product: Product
}) {
  return (
    <div
      className="
      w-[220px]
      h-[320px]
      rounded-xl
      border
      border-white/10
      bg-white/[0.02]
      backdrop-blur-xl
      overflow-hidden
      "
    >
      {product.image_url && (
        <img
          src={getImageUrl(product.image_url)}
          alt={product.name}
         className="
            w-full
            max-h-[220px] object-contain bg-[#0f1117] p-2
            rounded-t-3xl
"
        />
      )}

      <div className="p-4">

        <div className="flex gap-2 mb-3">

          {product.project_type && (
            <span
              className="text-[10px] px-2 py-1 rounded-full border"
              style={getProjectTypeStyles(product.project_type)}
            >
              {product.project_type}
            </span>
          )}

          {product.status && (
            <span
              className="text-[10px] px-2 py-1 rounded-full border"
              style={getStatusStyles(product.status)}
            >
              {product.status}
            </span>
          )}

        </div>

        <h4
          className="text-lg font-bold"
          style={{
            color: 'var(--text-primary)',
          }}
        >
          {product.name}
        </h4>

        <p
          className="text-sm mt-2 line-clamp-2"
          style={{
            color: 'var(--gold-primary)',
          }}
        >
          {product.tagline}
        </p>

      </div>
    </div>
  )
}
export function ProductsSection() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
    setIsMobile(window.innerWidth < 1024)
  }

  checkMobile()

  window.addEventListener('resize', checkMobile)

 
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

        const statusPriority: Record<string, number> = {
  Live: 1,
  Beta: 2,
  Developing: 3,
  Planning: 4,
  Research: 5,
}

const sortedProducts = [...(data.products || [])].sort((a, b) => {
  const aPriority = statusPriority[a.status || ''] ?? 999
  const bPriority = statusPriority[b.status || ''] ?? 999

  return aPriority - bPriority
})

setProducts(sortedProducts)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load products'
        console.error('Failed to fetch products:', err)
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
     return () =>
    window.removeEventListener('resize', checkMobile)
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

  const activeProduct = products[activeIndex]

const prevIndex =
  activeIndex === 0
    ? products.length - 1
    : activeIndex - 1

const nextIndex =
  activeIndex === products.length - 1
    ? 0
    : activeIndex + 1

const previousProduct = products[prevIndex]
const nextProduct = products[nextIndex]

const goPrevious = () => {
  setActiveIndex(prev =>
    prev === 0
      ? products.length - 1
      : prev - 1
  )
}

const goNext = () => {
  setActiveIndex(prev =>
    prev === products.length - 1
      ? 0
      : prev + 1
  )
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
            className="text-lg max-w-xl mx-auto transition-colors duration-300"
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
        ):(
        <div className="relative flex items-center justify-center min-h-[260px]">
  <motion.button
  onClick={goPrevious}
  whileHover={{
    scale: 0.86,
  }}
  className="
  absolute
  left-[25%]
  hidden
  lg:block
  z-10
  cursor-pointer
  "
>
  <MiniCard
    product={previousProduct}
  />
</motion.button>
  {/* Active Card */}
  <motion.div
    key={activeProduct?.id}
    drag={isMobile ? 'x' : false}
    dragConstraints={{ left: 0, right: 0 }}
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{
      opacity: 1,
      scale: 1,
      x: 0,
    }}
    transition={{
      duration: 0.4,
    }}
    onDragEnd={(event, info) => {
  if (info.offset.x < -80) {
    goNext()
  }

  if (info.offset.x > 80) {
    goPrevious()
  }
}}
    className="w-full max-w-[420px] z-20"
  >
    <PremiumCard className="flex flex-col flex items-center text-center box-shadow: 0 0 0 1px rgba(255,215,0,0.08),0 20px 80px rgba(255,215,0,0.06);;">
      {/*<div className="flex flex-col items-center text-center"></div>*/}

      {activeProduct?.image_url && (
        <div className="mb-4">
  <img
    src={getImageUrl(activeProduct.image_url)}
    alt={activeProduct.name}
    className="
w-full
h-52
object-cover
rounded-xl
mb-4
"
  />
  </div>
)}

      <div className="flex justify-center gap-2 mb-4">

        {activeProduct?.project_type && (
          <span
            className="text-xs px-3 py-1 rounded-full border"
            style={getProjectTypeStyles(activeProduct.project_type)}
          >
            {activeProduct.project_type}
          </span>
        )}

        {activeProduct?.status && (
          <span
            className="text-xs px-3 py-1 rounded-full border"
            style={getStatusStyles(activeProduct.status)}
          >
            {activeProduct.status}
          </span>
        )}

      </div>
      <div className="flex flex-col items-center text-center">

      <h2
        className="text-2xl font-bold mb-2"
        style={{ color: 'var(--text-primary)' }}
      >
        {activeProduct?.name}
      </h2>

      <p
        className="text-sm mb-4"
        style={{ color: 'var(--gold-primary)' }}
      >
        {activeProduct?.tagline}
      </p>
      </div>
<div className="flex justify-center">
      <Link href={`/products/${activeProduct?.slug}`}>
        <PremiumButton
variant="secondary"
size="sm"
className="w-full"
>
          View Project →
        </PremiumButton>
      </Link>
</div>
    </PremiumCard>
  </motion.div>
<motion.button
  onClick={goNext}
  whileHover={{
    scale: 0.86,
  }}
  className="
  absolute
  right-[25%]
  hidden
  lg:block
  z-10
  cursor-pointer
  "
>
  <MiniCard
    product={nextProduct}
  />
</motion.button>
</div>
        )}
    <div className="flex justify-center items-center gap-3 mt-5">


  <span
    className="text-sm"
    style={{ color: 'var(--text-secondary)' }}
  >
    <div className="flex gap-2">
  {products.map((_, index) => (
    <button
      key={index}
      onClick={() => setActiveIndex(index)}
      className={`h-2 rounded-full transition-all ${
        activeIndex === index
          ? 'w-8 bg-yellow-400'
          : 'w-2 bg-gray-600'
      }`}
    />
  ))}
</div>
  </span>

</div>
      </div>
    </section>
  )
}