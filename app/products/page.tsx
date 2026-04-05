'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { getProductIcon } from '@/lib/productMeta'

const products = [
  {
    id: 'FocusLock',
    name: 'FocusLock',
    desc: 'Coming Soon....',
    coming_soon: true,
  },
  {
    id: 'skillsyncx',
    name: 'SkillSyncX',
    desc: 'AI-powered outcome-based learning platform for career-focused education.',
  },
  {
    id: 'trivio',
    name: 'Trivio',
    desc: 'AI-driven career preparation, aptitude practice, and interview training platform.',
  },
  {
    id: 'strequp',
    name: 'Strequp',
    desc: 'Daily habit tracking & consistency-building system for personal growth.',
  },
  {
    id: 'gradguard',
    name: 'GradGuard',
    desc: 'Academic performance monitoring & institutional analytics platform.',
  },
]

export default function Products() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-black text-white px-4 sm:px-6 pt-24 sm:pt-28 pb-20 sm:pb-24 overflow-hidden">
      <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[320px] h-[320px] sm:w-[600px] sm:h-[600px] bg-purple-600/20 blur-[100px] sm:blur-[150px] rounded-full" />

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl sm:text-5xl font-bold text-center mb-4 sm:mb-6"
      >
        Our Products
      </motion.h1>

      <p className="text-center text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mb-10 sm:mb-16">
        We design and build AI-powered SaaS platforms that solve real-world problems with elegance and performance.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-10 max-w-7xl mx-auto">
        {products.map((product, index) => (
          <Link key={index} href={`/products/${product.id}`} className="block">
            {(() => {
              const ProductIcon = getProductIcon(product.id)

              return (
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
                      <p className="text-sm sm:text-base text-slate-300 mb-5 sm:mb-6">{product.desc}</p>
                    </div>
                  </div>

                  <div className="h-[2px] w-12 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full group-hover:w-24 transition-all" />
                </motion.div>
              )
            })()}
          </Link>
        ))}
      </div>
    </main>
  )
}
