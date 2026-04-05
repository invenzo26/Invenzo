'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-black text-white overflow-hidden">
      
      {/* HERO SECTION */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 pt-32 pb-28">
        
        {/* Glow Effects */}
        <div className="absolute top-[-150px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/30 blur-[140px] rounded-full"></div>
        <div className="absolute bottom-[-120px] right-[-120px] w-[400px] h-[400px] bg-cyan-500/30 blur-[140px] rounded-full"></div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold leading-tight tracking-tight"
        >
          Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">AI-Powered</span> Products <br />
          for the Next Generation
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-6 max-w-2xl text-lg text-slate-300"
        >
          Invenzo is an AI solutions & product studio building next-gen SaaS platforms for education, productivity and career enablement.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-10 flex gap-5 flex-wrap justify-center"
        >
          <Link href="/products">
            <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 hover:scale-105 transition-transform font-semibold">
              Explore Products
            </button>
          </Link>

          <Link href="/contact">
            <button className="px-8 py-4 rounded-xl border border-white/20 backdrop-blur-md bg-white/5 hover:bg-white/10 transition">
              Contact Us
            </button>
          </Link>
        </motion.div>
      </section>
      <Link href="/products/FocusLock">
      <motion.div
    whileHover={{ scale: 1.03 }}
    transition={{ type: "spring", stiffness: 200 }}
    className="relative overflow-hidden mt-20 max-w-5xl mx-auto rounded-3xl p-10 border border-white/10 
               bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 
               shadow-lg hover:shadow-purple-500/40 cursor-pointer">
    {/* Glow Effect */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/20 blur-3xl rounded-full"></div>
          <div className="relative z-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">🚀New Product Launch</h2>
            <p className="text-white/90 text-lg max-w-2xl mx-auto mb-6">We're glad that our new product which will increase your productivity and focus is getting launched soon...!!</p>
            <div className="inline-block px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition">Get more info→</div>
          </div>
        </motion.div>
      </Link>
      {/* PRODUCTS SECTION */}
      <section className="relative px-6 pb-32">
        <h2 className="text-4xl font-bold text-center mb-16">
          Our Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {[
          { id: 'skillsyncx', name: 'SkillSyncX', desc: 'AI-powered outcome-based learning platform' },
          { id: 'trivio', name: 'Trivio', desc: 'AI career preparation & practice platform' },
          { id: 'strequp', name: 'Strequp', desc: 'Daily habit tracking & consistency system' },
          { id: 'gradguard', name: 'GradGuard', desc: 'Academic & student performance management system' },
          ].map((p, i) => (
            <Link href={`/products/${p.id}`} key={i}>
            <motion.div
              whileHover={{ y: -8, scale: 1.03 }}
              className="group cursor-pointer rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 transition-all shadow-lg hover:shadow-purple-500/20"
             >
              <h3 className="text-xl font-semibold mb-2">{p.name}</h3>
              <p className="text-sm text-slate-300 mb-6">{p.desc}</p>

              <div className="h-[2px] w-12 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full group-hover:w-24 transition-all"></div>
            </motion.div>
            </Link>
          ))}
        </div>
      </section>

    </main>
  )
}