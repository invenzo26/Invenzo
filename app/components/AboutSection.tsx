'use client'

import { motion } from 'framer-motion'
import { Check, Circle, Compass, Globe2, Rocket, Target } from 'lucide-react'
import { MotionSection } from './animations/MotionSection'
import { revealUp, staggerContainer } from './animations/motionVariants'

const principles = [
  {
    title: 'Founded',
    value: '2025',
    description: 'Building the next generation of AI-powered digital products.',
    icon: Rocket,
  },
  {
    title: 'Focus',
    value: 'AI First',
    description: 'Every product is designed with intelligence at the core, not as an afterthought.',
    icon: Target,
  },
  {
    title: 'Mission',
    value: 'Purpose',
    description: 'Every feature exists to solve a real problem and reduce operational complexity.',
    icon: Compass,
  },
  {
    title: 'Reach',
    value: 'Global',
    description: 'Built in India and designed for ambitious businesses everywhere.',
    icon: Globe2,
  },
]

const journey = [
  { title: 'Founded', subtitle: '2025', complete: true },
  { title: 'Portfolio', subtitle: 'Live', complete: true },
  { title: 'AI Products', subtitle: 'Building', active: true },
  { title: 'Global', subtitle: 'Next', complete: false },
]

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative z-10 overflow-hidden px-4 py-24 sm:px-6 lg:px-8 lg:py-36"
      style={{ background: 'var(--section-primary-bg)' }}
    >
      <div
        className="absolute right-[-12rem] top-24 h-[360px] w-[360px] rounded-full opacity-15"
        style={{ background: 'radial-gradient(circle, rgba(212, 175, 55, 0.18), transparent 70%)' }}
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <MotionSection className="lg:sticky lg:top-28">
            <p className="mb-5 text-xs font-semibold uppercase" style={{ color: 'var(--gold-primary)', letterSpacing: '0.24em' }}>
              About Invenzo
            </p>
            <h2 className="text-[clamp(2.6rem,7vw,6.3rem)] font-semibold leading-[0.98]" style={{ color: 'var(--text-primary)' }}>
              Building intelligent products that make work feel lighter.
            </h2>
            <p className="mt-8 max-w-xl text-base leading-8 sm:text-lg" style={{ color: 'var(--text-secondary)' }}>
              Invenzo is an AI-first software studio focused on scalable digital products, automation systems, and modern web experiences for companies that want to move faster with more clarity.
            </p>
          </MotionSection>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.18 }}
            className="grid gap-5 sm:grid-cols-2 lg:gap-6"
          >
            {principles.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.article
                  key={item.title}
                  variants={revealUp}
                  className="relative overflow-hidden rounded-2xl border p-6"
                  style={{ background: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
                >
                  <Icon className="mb-8 h-7 w-7" style={{ color: 'var(--gold-primary)' }} />
                  <p className="text-xs font-semibold uppercase" style={{ color: 'var(--gold-primary)', letterSpacing: '0.18em' }}>{item.title}</p>
                  <h3 className="mt-4 text-3xl font-semibold" style={{ color: 'var(--text-primary)' }}>{item.value}</h3>
                  <p className="mt-5 leading-7" style={{ color: 'var(--text-secondary)' }}>{item.description}</p>
                </motion.article>
              )
            })}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mt-24 rounded-2xl border p-6 sm:p-8 lg:p-10"
          style={{ background: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
        >
          <p className="mb-10 text-center text-xs font-semibold uppercase" style={{ color: 'var(--gold-primary)', letterSpacing: '0.24em' }}>
            Our Journey
          </p>
          <div className="relative grid gap-8 md:grid-cols-4">
            <div className="absolute left-[12%] right-[12%] top-6 hidden h-px md:block" style={{ background: 'var(--border-color)' }} />
            <div className="absolute left-[12%] top-6 hidden h-px w-[50%] md:block" style={{ background: 'var(--gold-primary)', boxShadow: '0 0 18px rgba(212,175,55,0.36)' }} />
            {journey.map((item) => (
              <div key={item.title} className="relative text-center">
                <div
                  className="mx-auto grid h-12 w-12 place-items-center rounded-full border"
                  style={{
                    background: item.active ? 'var(--hover-overlay)' : 'var(--card-bg)',
                    borderColor: item.active ? 'var(--gold-primary)' : 'var(--border-color)',
                    color: item.active ? 'var(--gold-primary)' : 'var(--text-primary)',
                    boxShadow: item.active ? 'var(--shadow-glow)' : 'none',
                  }}
                >
                  {item.complete ? <Check className="h-5 w-5" /> : <Circle className="h-4 w-4" />}
                </div>
                <h3 className="mt-5 font-semibold" style={{ color: 'var(--text-primary)' }}>{item.title}</h3>
                <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary)' }}>{item.subtitle}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
