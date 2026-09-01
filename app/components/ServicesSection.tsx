'use client'

import { motion } from 'framer-motion'
import { Bot, Layers3, Palette, Workflow, Zap } from 'lucide-react'
import { MotionSection } from './animations/MotionSection'
import { revealUp, staggerContainer } from './animations/motionVariants'

const services = [
  {
    number: '01',
    title: 'AI Solutions',
    description: 'Custom AI systems and intelligent workflows designed to automate operations and accelerate growth.',
    icon: Bot,
  },
  {
    number: '02',
    title: 'SaaS Products',
    description: 'Scalable cloud software engineered for performance, usability, and long-term product evolution.',
    icon: Layers3,
  },
  {
    number: '03',
    title: 'Automation Systems',
    description: 'Practical business automation that removes repetitive work and keeps teams focused on higher-value action.',
    icon: Workflow,
  },
  {
    number: '04',
    title: 'Custom Platforms',
    description: 'Tailor-made digital platforms built around unique operational requirements and growth plans.',
    icon: Zap,
  },
  {
    number: '05',
    title: 'Experience Design',
    description: 'Premium user experiences that feel intuitive, confident, conversion-focused, and effortless to operate.',
    icon: Palette,
  },
]

export function ServicesSection() {
  return (
    <section
      id="services"
      className="relative z-10 overflow-hidden px-4 py-24 sm:px-6 lg:px-8 lg:py-36"
      style={{ background: 'var(--section-surface-bg)' }}
    >
      <div
        className="absolute left-1/2 top-20 h-[420px] w-[420px] -translate-x-1/2 rounded-full opacity-12"
        style={{ background: 'radial-gradient(circle, rgba(212, 175, 55, 0.16), transparent 72%)' }}
      />

      <div className="relative mx-auto max-w-7xl">
        <MotionSection className="mb-16 grid gap-8 lg:grid-cols-[0.72fr_1fr] lg:items-end">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase" style={{ color: 'var(--gold-primary)', letterSpacing: '0.24em' }}>
              Capability System
            </p>
            <h2 className="text-[clamp(2.4rem,6vw,5.4rem)] font-semibold leading-none" style={{ color: 'var(--text-primary)' }}>
              Designed services for intelligent product momentum.
            </h2>
          </div>
          <p className="max-w-2xl leading-8 lg:justify-self-end" style={{ color: 'var(--text-secondary)' }}>
            From early strategy to shipped systems, Invenzo blends AI thinking, software engineering, and polished experience design into one delivery rhythm.
          </p>
        </MotionSection>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
          className="grid gap-4"
        >
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.article
                key={service.title}
                variants={revealUp}
                whileHover={{ x: 8 }}
                className="group grid gap-6 rounded-2xl border p-5 transition-colors duration-300 sm:grid-cols-[0.18fr_0.32fr_1fr] sm:items-center sm:p-7"
                style={{
                  background: index % 2 === 0 ? 'var(--card-bg)' : 'transparent',
                  borderColor: 'var(--border-color)',
                }}
              >
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold" style={{ color: 'var(--gold-primary)' }}>{service.number}</span>
                  <div className="grid h-12 w-12 place-items-center rounded-xl border transition-transform duration-300 group-hover:rotate-3" style={{ borderColor: 'var(--border-color)', background: 'var(--hover-overlay)' }}>
                    <Icon className="h-5 w-5" style={{ color: 'var(--gold-primary)' }} />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>{service.title}</h3>
                <p className="leading-7" style={{ color: 'var(--text-secondary)' }}>{service.description}</p>
              </motion.article>
            )
          })}
        </motion.div>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-3 text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
          {['Discover', 'Design', 'Develop', 'Deploy'].map((step, index) => (
            <span key={step} className="flex items-center gap-3">
              <span>{step}</span>
              {index < 3 && <span style={{ color: 'var(--gold-primary)' }}>/</span>}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
