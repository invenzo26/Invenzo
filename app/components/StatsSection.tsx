'use client'

import { animate, motion, useInView, useMotionValue, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { MotionSection } from './animations/MotionSection'

interface StatProps {
  number: number
  label: string
  description: string
  suffix?: string
}

const stats: StatProps[] = [
  { number: 5, label: 'Products Built', description: 'AI products and digital platforms crafted with purpose.', suffix: '+' },
  { number: 10, label: 'Active Users', description: 'Growing adoption across intelligent solutions.', suffix: '+' },
  { number: 100, label: 'Client Satisfaction', description: 'A quality bar shaped around reliable delivery.', suffix: '%' },
  { number: 1, label: 'Years of Innovation', description: 'Continuously building, learning, and improving.', suffix: '+' },
]

function StatCounter({ number, label, description, suffix = '' }: StatProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest))
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const unsubscribe = rounded.on('change', (value) => setDisplayValue(value))
    if (inView) {
      const controls = animate(count, number, { duration: 2.2 })
      return () => {
        controls.stop()
        unsubscribe()
      }
    }
    return unsubscribe
  }, [count, inView, number, rounded])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      className="rounded-2xl border p-6 sm:p-7"
      style={{ background: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
    >
      <div className="text-5xl font-semibold sm:text-6xl" style={{ color: 'var(--gold-primary)' }}>
        {displayValue}
        {suffix}
      </div>
      <p className="mt-4 text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>{label}</p>
      <p className="mt-3 text-sm leading-6" style={{ color: 'var(--text-secondary)' }}>{description}</p>
    </motion.div>
  )
}

export function StatsSection() {
  return (
    <section
      id="stats"
      className="relative z-10 overflow-hidden px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
      style={{ background: 'var(--section-primary-bg)' }}
    >
      <div className="mx-auto max-w-7xl">
        <MotionSection className="mb-14 grid gap-8 lg:grid-cols-[0.7fr_1fr] lg:items-end">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase" style={{ color: 'var(--gold-primary)', letterSpacing: '0.24em' }}>
              Proof of Craft
            </p>
            <h2 className="text-[clamp(2.2rem,5vw,4.8rem)] font-semibold leading-none" style={{ color: 'var(--text-primary)' }}>
              Built with purpose. Improved with intent.
            </h2>
          </div>
          <p className="max-w-2xl leading-8 lg:justify-self-end" style={{ color: 'var(--text-secondary)' }}>
            Every milestone reflects progress toward useful, scalable, intelligent systems.
          </p>
        </MotionSection>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatCounter key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  )
}
