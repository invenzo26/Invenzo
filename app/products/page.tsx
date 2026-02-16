'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'

const products = [
  {
    id: 'skillsyncx',
    name: 'SkillSyncX',
    desc: 'AI-powered outcome-based learning platform for career-focused education.'
  },
  {
    id: 'trivio',
    name: 'Trivio',
    desc: 'AI-driven career preparation, aptitude practice, and interview training platform.'
  },
  {
    id: 'strequp',
    name: 'Strequp',
    desc: 'Daily habit tracking & consistency-building system for personal growth.'
  },
  {
    id: 'gradguard',
    name: 'GradGuard',
    desc: 'Academic performance monitoring & institutional analytics platform.'
  }
]

export default function Products() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-black text-white px-6 pt-28 pb-24">

      {/* Glow */}
      <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/20 blur-[150px] rounded-full"></div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-bold text-center mb-6"
      >
        Our Products
      </motion.h1>

      <p className="text-center text-slate-300 max-w-2xl mx-auto mb-16">
        We design and build AI-powered SaaS platforms that solve real-world problems with elegance and performance.
      </p>

      <div className="grid grid-cols-2 grid-rows-2 gap-10 max-w-7xl mx-auto min-h-[420px]">
        {products.map((p, i) => (
  <Link key={i} href={`/products/${p.id}`} className="block">
    <motion.div
    key={i}
  whileHover={{ y: -10, scale: 1.04 }}
  transition={{ type: 'spring', stiffness: 200 }}
  className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-lg hover:shadow-purple-500/30"
>
      <h3 className="text-xl font-semibold mb-3">{p.name}</h3>
      <p className="text-sm text-slate-300 mb-6">{p.desc}</p>

      <div className="h-[2px] w-12 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full"></div>
    </motion.div>
  </Link>
))}
      </div>

    </main>
  )
}