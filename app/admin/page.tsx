'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(e: any) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push('/admin/dashboard')
  }

  return (
    <main className="min-h-screen bg-black flex items-center justify-center text-white">
      <form
        onSubmit={handleLogin}
        className="bg-white/5 border border-white/10 p-8 rounded-2xl w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-6">Admin Login</h1>

        {error && (
          <div className="mb-4 text-red-400 text-sm">{error}</div>
        )}

        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded bg-black border border-white/10"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 rounded bg-black border border-white/10"
          required
        />

        <button
          disabled={loading}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 font-semibold"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </main>
  )
}