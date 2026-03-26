'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

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

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    setError(error.message)
    setLoading(false)
    return
  }

  // 🔥 IMPORTANT: Full reload so middleware reads new session
  window.location.href = '/admin/dashboard'
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 max-w-md w-full"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Admin Login</h1>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <input
          type="email"
          placeholder="Admin Email"
          className="w-full mb-4 p-3 rounded-lg bg-black border border-white/10 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-3 rounded-lg bg-black border border-white/10 outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 font-semibold hover:scale-[1.02] transition-transform disabled:opacity-60"
        >
          {loading ? 'Signing in...' : 'Login'}
        </button>
      </form>
    </div>
  )
}