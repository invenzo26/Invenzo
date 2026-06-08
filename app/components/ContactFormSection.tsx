'use client'

import { motion } from 'framer-motion'
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
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2
            className="text-4xl sm:text-5xl font-bold mb-4 transition-colors duration-300"
            style={{ color: 'var(--text-primary)' }}
          >
            Get in Touch
          </h2>
          <p
            className="text-lg transition-colors duration-300"
            style={{ color: 'var(--text-secondary)' }}
          >
            Let's discuss how we can help build your next great product.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="rounded-lg p-8 lg:p-10 border transition-all duration-300"
          style={{
            background: 'var(--card-bg)',
            borderColor: 'var(--border-color)',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          <div className="grid sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium mb-2 transition-colors duration-300"
                style={{ color: 'var(--text-secondary)' }}
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="input w-full"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2 transition-colors duration-300"
                style={{ color: 'var(--text-secondary)' }}
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="input w-full"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="subject"
              className="block text-sm font-medium mb-2 transition-colors duration-300"
              style={{ color: 'var(--text-secondary)' }}
            >
              Subject
            </label>
            <input
              id="subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="What is this about?"
              className="input w-full"
              required
            />
          </div>

          <div className="mb-8">
            <label
              htmlFor="message"
              className="block text-sm font-medium mb-2 transition-colors duration-300"
              style={{ color: 'var(--text-secondary)' }}
            >
              Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us more about your project..."
              className="input w-full resize-none"
              rows={6}
              required
            />
          </div>

          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-lg text-sm transition-colors duration-300"
              style={{
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
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
              className="mb-6 p-4 rounded-lg text-sm transition-colors duration-300"
              style={{
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                borderColor: 'rgba(239, 68, 68, 0.3)',
                color: 'var(--color-error)',
              }}
            >
              ✕ {error}
            </motion.div>
          )}

          <div className="flex justify-center">
            <PremiumButton type="submit" disabled={loading} size="lg">
              {loading ? 'Sending...' : 'Send Message'}
            </PremiumButton>
          </div>
        </motion.form>
      </div>
    </section>
  )
}
