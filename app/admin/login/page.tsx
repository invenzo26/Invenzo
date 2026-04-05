'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { getSupabaseClient } from '@/lib/supabaseClient'

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = getSupabaseClient()

    if (!supabase) {
      setError('Supabase is not configured.')
      setLoading(false)
      return
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.replace('/admin/dashboard')
    router.refresh()
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-black via-slate-950 to-black px-4 pt-24 pb-16 text-white">
      <div className="absolute top-[-140px] left-1/2 h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-purple-600/25 blur-[120px]" />
      <div className="absolute bottom-[-120px] right-[-80px] h-[280px] w-[280px] rounded-full bg-cyan-500/20 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative mx-auto max-w-md"
      >
        <div className="mb-8 text-center">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 backdrop-blur-xl">
            Admin Portal
          </div>
          <h1 className="mt-5 text-4xl font-bold tracking-tight">Welcome back</h1>
          <p className="mt-3 text-slate-300">
            Sign in to manage products, contacts, and platform activity.
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-purple-900/20 backdrop-blur-2xl"
        >
          {error && (
            <p className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </p>
          )}

          <label className="mb-4 block">
            <span className="mb-2 block text-sm text-slate-300">Admin Email</span>
            <input
              type="email"
              placeholder="admin@invenzo.ai"
              className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none transition focus:border-purple-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label className="mb-6 block">
            <span className="mb-2 block text-sm text-slate-300">Password</span>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none transition focus:border-cyan-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 py-3 font-semibold transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>
      </motion.div>
    </main>
  )
}
