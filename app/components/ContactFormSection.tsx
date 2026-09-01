'use client'

import { motion } from 'framer-motion'
import { BrainCircuit, CheckCircle2, Handshake, Layers3, Workflow, XCircle } from 'lucide-react'
import { type FormEvent, type ReactNode, useState } from 'react'
import { getSupabaseClient } from '@/lib/supabaseClient'
import { PremiumButton } from './PremiumButton'
import { MotionSection } from './animations/MotionSection'

const contactSignals = [
  { icon: BrainCircuit, title: 'AI-Powered Applications' },
  { icon: Layers3, title: 'Custom SaaS Platforms' },
  { icon: Workflow, title: 'Business Automation' },
  { icon: Handshake, title: 'Long-Term Technical Partnership' },
]

export function ContactFormSection() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent) => {
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
      className="relative z-10 overflow-hidden px-4 py-24 sm:px-6 lg:px-8 lg:py-36"
      style={{ background: 'var(--section-primary-bg)' }}
    >
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(to right, transparent, var(--gold-primary), transparent)' }} />
      <div
        className="absolute right-[-10rem] top-20 h-[400px] w-[400px] rounded-full opacity-12"
        style={{ background: 'radial-gradient(circle, rgba(212, 175, 55, 0.16), transparent 72%)' }}
      />

      <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <MotionSection className="max-w-2xl">
          <p className="mb-5 text-xs font-semibold uppercase" style={{ color: 'var(--gold-primary)', letterSpacing: '0.24em' }}>
            Start the Build
          </p>
          <h2 className="text-[clamp(2.6rem,7vw,6.4rem)] font-semibold leading-[0.96]" style={{ color: 'var(--text-primary)' }}>
            Let us turn the next big idea into a working system.
          </h2>
          <p className="mt-8 text-base leading-8 sm:text-lg" style={{ color: 'var(--text-secondary)' }}>
            Whether you are launching a startup, automating operations, or building an AI-powered product, Invenzo helps shape the idea, engineer the platform, and polish the experience.
          </p>

          <div className="mt-12 grid gap-3 sm:grid-cols-2">
            {contactSignals.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="flex items-center gap-3 rounded-xl border px-4 py-3" style={{ background: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
                  <Icon className="h-5 w-5" style={{ color: 'var(--gold-primary)' }} />
                  <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{item.title}</span>
                </div>
              )
            })}
          </div>
        </MotionSection>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 34, rotateX: 4 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="relative rounded-2xl border p-5 sm:p-8 lg:p-10"
          style={{
            background: 'var(--card-bg)',
            borderColor: 'var(--border-color)',
            boxShadow: 'var(--shadow-card)',
            transformStyle: 'preserve-3d',
          }}
        >
          <div className="absolute right-6 top-6 h-2 w-2 rounded-full" style={{ background: 'var(--gold-primary)', boxShadow: '0 0 18px rgba(212,175,55,0.8)' }} />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FormField label="Name" htmlFor="name">
              <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" className="glass-input w-full" required />
            </FormField>

            <FormField label="Email" htmlFor="email">
              <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@company.com" className="glass-input w-full" required />
            </FormField>
          </div>

          <FormField label="Subject" htmlFor="subject" className="mt-5">
            <input id="subject" type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Project title" className="glass-input w-full" required />
          </FormField>

          <FormField label="Message" htmlFor="message" className="mt-5">
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us about your idea, goals, timeline, or any specific requirements..."
              className="glass-input w-full resize-none"
              rows={6}
              required
            />
          </FormField>

          {success && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 flex items-center gap-3 rounded-xl border p-4 text-sm" style={{ borderColor: 'rgba(16,185,129,0.35)', color: 'var(--color-success)', background: 'var(--card-bg)' }}>
              <CheckCircle2 className="h-5 w-5" />
              Message sent successfully. We will get back to you soon.
            </motion.div>
          )}

          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 flex items-center gap-3 rounded-xl border p-4 text-sm" style={{ borderColor: 'rgba(239,68,68,0.35)', color: 'var(--color-error)', background: 'var(--card-bg)' }}>
              <XCircle className="h-5 w-5" />
              {error}
            </motion.div>
          )}

          <div className="mt-8">
            <PremiumButton className="w-full sm:w-auto" type="submit" disabled={loading} size="lg">
              {loading ? 'Sending...' : 'Start the Conversation'}
            </PremiumButton>
          </div>
        </motion.form>
      </div>
    </section>
  )
}

function FormField({
  label,
  htmlFor,
  children,
  className = '',
}: {
  label: string
  htmlFor: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={className}>
      <label
        htmlFor={htmlFor}
        className="mb-3 block text-xs font-semibold uppercase"
        style={{ color: 'var(--text-primary)', letterSpacing: '0.12em' }}
      >
        {label}
      </label>
      {children}
    </div>
  )
}
