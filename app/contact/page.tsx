'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'


export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setLoading(true)
  setError(null)
  setSuccess(false)
  console.log({ name, email, subject, message })
  const { error } = await supabase
    .from("contacts")
    .insert([
      {
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim(),
      },
    ])

  if (error) {
    console.error(error)
    setError("Failed to send message. Please try again.")
  } else {
    setSuccess(true)
    setName('')
    setEmail('')
    setSubject('')
    setMessage('')
  }

  setLoading(false)
}
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-black via-slate-950 to-black text-white px-6 pt-28 pb-24 overflow-hidden">

      {/* Glow background */}
      <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-500/20 blur-[150px] rounded-full"></div>
      {/* Logo */}
      <Image
        src="/logo.png"
        alt="Invenzo AI Solutions"
        width={90}
        height={90}
        priority
        className="mx-auto mb-6"
      />

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-bold text-center mb-6"
      >
        Contact Us
      </motion.h1>

      <p className="text-center text-slate-300 max-w-xl mx-auto mb-16">
        Let’s build something extraordinary together. Reach out to us for collaborations, product ideas, or partnerships.
      </p>

      {/* Contact Form */}
      <motion.form onSubmit={handleSubmit}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="max-w-3xl mx-auto grid gap-6 bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-xl"
      >
        <div className="grid sm:grid-cols-2 gap-6">
          <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-purple-500"
          required
        />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-purple-500"
          required
        />
        </div>

        <input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Subject"
          className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-purple-500"
          required
        />

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message"
          className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-purple-500 resize-none"
          required
        />
        <center>
        <button
          disabled={loading}
          className="mt-4 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 font-semibold hover:scale-105 transition-transform"
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>
        </center>
        {success && (
          <p className="text-green-600">Message sent successfully!</p>
        )}
        {error && <p className="text-red-600">{error}</p>}
        
      </motion.form>

    </main>
  )
}