'use client'

import { motion } from 'framer-motion'

export function VisionSection() {
  return (
    <section
      id="vision"
      className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300"
      style={{ background: 'var(--section-surface-bg)' }}
    >
      {/* Subtle accent line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-transparent via-gold-primary to-transparent"
        style={{
          background: `linear-gradient(to right, transparent, var(--gold-primary), transparent)`,
        }}
      />

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2
            className="text-5xl sm:text-6xl lg:text-7xl font-light leading-tight mb-8 transition-colors duration-300"
            style={{ color: 'var(--text-primary)' }}
          >
            We believe technology should solve real problems,
            <span
              className="block font-semibold mt-4 transition-colors duration-300"
              style={{ color: 'var(--gold-primary)' }}
            >
              not create more complexity.
            </span>
          </h2>

          <p
            className="text-lg max-w-2xl mx-auto leading-relaxed transition-colors duration-300"
            style={{ color: 'var(--text-secondary)' }}
          >
            At Invenzo, we partner with visionary companies to build products that matter. Every line of code, every design decision, and every feature is crafted with purpose—to deliver genuine value and drive meaningful impact.
          </p>
        </motion.div>

        {/* Subtle decorative elements */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute bottom-20 right-10 w-32 h-32 rounded-full filter blur-3xl opacity-10"
          style={{ background: 'var(--metallic-highlight)' }}
        />
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-40 left-10 w-32 h-32 rounded-full filter blur-3xl opacity-10"
          style={{ background: 'var(--metallic-sheen)' }}
        />
      </div>
    </section>
  )
}
