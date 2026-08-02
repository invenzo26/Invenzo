'use client'

import { motion } from 'framer-motion'
import {
  BrainCircuit,
  Layers3,
  Workflow,
  Handshake,
} from 'lucide-react'
import { useState } from 'react'
import { getSupabaseClient } from '@/lib/supabaseClient'
import { PremiumButton } from './PremiumButton'


export function ContactFormSection() {
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

    const supabase = getSupabaseClient()
    if (!supabase) {
      setError('Connection error. Please try again.')
      setLoading(false)
      return
    }

    const { error: dbError } = await supabase.from('contacts').insert([
      {
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim(),
      },
    ])

    if (dbError) {
      console.error(dbError)
      setError('Failed to send message. Please try again.')
    } else {
      setSuccess(true)
      setName('')
      setEmail('')
      setSubject('')
      setMessage('')
      setTimeout(() => setSuccess(false), 5000)
    }

    setLoading(false)
  }

  return (
    <section
      id="contact"
      className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 transition-colors duration-300"
      style={{ background: 'var(--section-primary-bg)' }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 lg:mb-0"
        >
          <h2
  className="text-4xl lg:text-6xl font-light leading-tight mb-6 transition-colors duration-300"
            style={{ color: 'var(--text-primary)' }}
          >
            <>
  Let's build your
  <span
    className="block font-semibold"
    style={{ color: 'var(--gold-primary)' }}
  >
    next big idea.
  </span>
</>
          </h2>
          <p
            className="text-lg transition-colors duration-300"
            style={{ color: 'var(--text-secondary)' }}
          >
            Whether you're launching a startup, automating your business, or building an AI-powered product, Invenzo helps transform ambitious ideas into scalable digital experiences.
          </p>
          <div className="mt-16 space-y-5">

  {[
  {
    icon: BrainCircuit,
    title: "AI-Powered Applications",
  },
  {
    icon: Layers3,
    title: "Custom SaaS Platforms",
  },
  {
    icon: Workflow,
    title: "Business Automation",
  },
  {
    icon: Handshake,
    title: "Long-Term Technical Partnership",
  },
].map((item) => {
  const Icon = item.icon

  return (
    <div
      key={item.title}
      className="flex items-center gap-4"
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center"
        style={{
          background: 'rgba(212,175,55,0.08)',
          border: '1px solid rgba(212,175,55,0.18)',
        }}
      >
        <Icon
          className="w-5 h-5"
          style={{
            color: 'var(--gold-primary)',
          }}
        />
      </div>

      <span
        className="text-lg"
        style={{
          color: 'var(--text-primary)',
        }}
      >
        {item.title}
      </span>
    </div>
  )
})}


</div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="glass-panel-elevated rounded-3xl p-10 lg:p-14 border border-[var(--border-color)]"
        >
          <div className="grid sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-semibold mb-3 transition-colors duration-300 uppercase tracking-wide"
                style={{ color: 'var(--text-primary)', letterSpacing: '0.5px' }}
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="glass-input w-full"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold mb-3 transition-colors duration-300 uppercase tracking-wide"
                style={{ color: 'var(--text-primary)', letterSpacing: '0.5px' }}
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@company.com"
                className="glass-input w-full"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="subject"
              className="block text-xs font-semibold mb-3 transition-colors duration-300 uppercase tracking-wide"
              style={{ color: 'var(--text-primary)', letterSpacing: '0.5px' }}
            >
              Subject
            </label>
            <input
              id="subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Project Title"
              className="glass-input w-full"
              required
            />
          </div>

          <div className="mb-8">
            <label
              htmlFor="message"
              className="block text-xs font-semibold mb-3 transition-colors duration-300 uppercase tracking-wide"
              style={{ color: 'var(--text-primary)', letterSpacing: '0.5px' }}
            >
              Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us about your idea, goals, timeline, or any specific requirements..."
              className="glass-input w-full resize-none"
              rows={6}
              required
            />
          </div>

          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-lg text-sm transition-all duration-300 glass-panel"
              style={{
                borderColor: 'rgba(16, 185, 129, 0.3)',
                color: 'var(--color-success)',
              }}
            >
              ✓ Message sent successfully! We'll get back to you soon.
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-lg text-sm transition-all duration-300 glass-panel"
              style={{
                borderColor: 'rgba(239, 68, 68, 0.3)',
                color: 'var(--color-error)',
              }}
            >
              ✕ {error}
            </motion.div>
          )}

          <div className="flex justify-center">
            <PremiumButton type="submit" disabled={loading} size="lg">
              {loading ? 'Sending...' : 'Start the Conversation →'}
            </PremiumButton>
          </div>
        </motion.form>
        </div>
      </div>
    </section>
  )
}
