'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { defaultPromoSettings, type PromoSettings } from '@/lib/promoSettings'

export default function Home() {
  const [promo, setPromo] = useState<PromoSettings>(defaultPromoSettings)

  useEffect(() => {
    const loadPromo = async () => {
      const response = await fetch('/api/promo', {
        cache: 'no-store',
      })
      const payload = await response.json()
      setPromo(payload.settings || defaultPromoSettings)
    }

    loadPromo()
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-black text-white overflow-hidden">
      <section className="relative flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-28 sm:pt-32 pb-10 sm:pb-12">
        <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[320px] h-[320px] sm:w-[600px] sm:h-[600px] bg-purple-600/30 blur-[100px] sm:blur-[140px] rounded-full" />
        <div className="absolute bottom-[-100px] right-[-100px] w-[220px] h-[220px] sm:w-[400px] sm:h-[400px] bg-cyan-500/30 blur-[100px] sm:blur-[140px] rounded-full" />

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight tracking-tight"
        >
          Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">AI-Powered</span> Products <br />
          for the Next Generation
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-6 max-w-2xl text-base sm:text-lg text-slate-300"
        >
          Invenzo is an AI solutions & product studio building next-gen SaaS platforms for education, productivity and career enablement.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-8 sm:mt-10 flex w-full sm:w-auto flex-col sm:flex-row gap-4 sm:gap-5 justify-center"
        >
          <Link href="/products" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 hover:scale-105 transition-transform font-semibold">
              Explore Products
            </button>
          </Link>

          <Link href="/contact" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-8 py-4 rounded-xl border border-white/20 backdrop-blur-md bg-white/5 hover:bg-white/10 transition">
              Contact Us
            </button>
          </Link>
        </motion.div>
      </section>

      {promo.enabled && (
        <Link href={promo.href} className="block pb-16 md:pb-24">
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="relative overflow-hidden mt-4 sm:mt-6 mx-4 sm:mx-auto max-w-5xl rounded-[2rem] border border-white/10 p-6 sm:p-10 bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 shadow-lg hover:shadow-purple-500/40 cursor-pointer"
          >
            <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/20 blur-3xl rounded-full" />

            <div className="relative z-10 text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                {promo.title}
              </h2>
              <p className="text-white/90 text-base sm:text-lg max-w-2xl mx-auto mb-6">
                {promo.description}
              </p>
              <div className="inline-block px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition">
                {promo.ctaLabel}
              </div>
            </div>
          </motion.div>
        </Link>
      )}
    </main>
  )
}
