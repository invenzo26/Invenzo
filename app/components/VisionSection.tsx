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
          <p
  className="uppercase tracking-[0.3em] text-sm font-semibold mb-6"
  style={{ color: 'var(--gold-primary)' }}
>
  OUR VISION
</p>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-light leading-tight mb-8 transition-colors duration-300"
            style={{ color: 'var(--text-primary)' }}
          >
            We don't just build software.
            <span
              className="block font-semibold mt-4 transition-colors duration-300"
              style={{ color: 'var(--gold-primary)' }}
            >
              We build intelligent systems.
            </span>
          </h2>

          <p
            className="text-lg max-w-2xl mx-auto leading-relaxed transition-colors duration-300"
            style={{ color: 'var(--text-secondary)' }}
          >
            At Invenzo, we believe technology should simplify complexity—not add to it. Every product we build is designed to solve real business problems, empower teams, and create lasting value through intelligent engineering.
          </p>
        </motion.div>
        <motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.2 }}
  viewport={{ once: true }}
  className="mt-20 max-w-3xl mx-auto text-center"
>
  <div
    className="rounded-3xl border px-8 py-10"
    style={{
      borderColor: 'var(--border-color)',
      background: 'var(--card-bg)',
    }}
  >
    <p
      className="text-xl md:text-2xl italic leading-relaxed"
      style={{ color: 'var(--text-primary)' }}
    >
      “Technology should
      <span style={{ color: 'var(--gold-primary)' }}>
        {' '}empower people{' '}
      </span>
      — not overwhelm them.”
    </p>

    <div
      className="w-16 h-px mx-auto my-6"
      style={{ background: 'var(--gold-primary)' }}
    />

    <p
      className="uppercase tracking-[0.25em] text-xs"
      style={{ color: 'var(--text-secondary)' }}
    >
      Invenzo Philosophy
    </p>
  </div>
</motion.div>

        {/* Subtle decorative elements */}
        <motion.div
  animate={{
    scale: [1, 1.08, 1],
    opacity: [0.08, 0.15, 0.08],
  }}
  transition={{
    duration: 8,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  className="absolute left-1/2 bottom-10 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-3xl -z-10"
  style={{
    background: "var(--gold-primary)",
  }}
/>
      </div>
    </section>
  )
}
