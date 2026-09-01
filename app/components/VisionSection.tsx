'use client'

import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { MotionSection } from './animations/MotionSection'

export function VisionSection() {
  return (
    <section
      id="vision"
      className="relative z-10 overflow-hidden px-4 py-24 sm:px-6 lg:px-8 lg:py-36"
      style={{ background: 'var(--section-primary-bg)' }}
    >
      <div
        className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full opacity-12"
        style={{ background: 'radial-gradient(circle, rgba(212, 175, 55, 0.16), transparent 72%)' }}
      />

      <div className="relative mx-auto max-w-5xl text-center">
        <MotionSection>
          <p className="mb-6 text-xs font-semibold uppercase" style={{ color: 'var(--gold-primary)', letterSpacing: '0.24em' }}>
            Our Vision
          </p>
          <h2 className="text-[clamp(2.6rem,7vw,6.2rem)] font-semibold leading-none" style={{ color: 'var(--text-primary)' }}>
            We do not just build software. We build intelligent systems.
          </h2>
          <p className="mx-auto mt-8 max-w-3xl text-base leading-8 sm:text-lg" style={{ color: 'var(--text-secondary)' }}>
            Technology should simplify complexity. Every product we build is designed to solve real business problems, empower teams, and create lasting value through careful engineering.
          </p>
        </MotionSection>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="mx-auto mt-16 max-w-3xl rounded-2xl border p-7 sm:p-10"
          style={{ background: 'var(--card-bg)', borderColor: 'var(--border-color)', boxShadow: 'var(--shadow-card)' }}
        >
          <Quote className="mx-auto mb-6 h-8 w-8" style={{ color: 'var(--gold-primary)' }} />
          <p className="text-xl leading-9 sm:text-2xl" style={{ color: 'var(--text-primary)' }}>
            Technology should empower people, not overwhelm them.
          </p>
          <div className="mx-auto my-7 h-px w-16" style={{ background: 'var(--gold-primary)' }} />
          <p className="text-xs font-semibold uppercase" style={{ color: 'var(--text-secondary)', letterSpacing: '0.2em' }}>
            Invenzo Philosophy
          </p>
        </motion.div>
      </div>
    </section>
  )
}
