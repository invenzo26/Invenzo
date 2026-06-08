'use client'

import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useState } from 'react'

interface StatProps {
  number: number
  label: string
  suffix?: string
}

function StatCounter({ number, label, suffix = '' }: StatProps) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest))
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const unsubscribe = rounded.onChange((value) => {
      setDisplayValue(value as number)
    })
    const controls = animate(count, number, { duration: 2.5 })
    return () => {
      controls.stop()
      unsubscribe()
    }
  }, [count, number, rounded])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <motion.div
        className="text-5xl sm:text-6xl font-bold mb-2 transition-colors duration-300"
        style={{ color: 'var(--gold-primary)' }}
      >
        {displayValue}
        {suffix}
      </motion.div>
      <p
        className="text-lg transition-colors duration-300"
        style={{ color: 'var(--text-secondary)' }}
      >
        {label}
      </p>
    </motion.div>
  )
}

export function StatsSection() {
  return (
    <section
      id="stats"
      className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 transition-colors duration-300"
      style={{ background: 'var(--section-primary-bg)' }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl sm:text-5xl font-bold mb-4 transition-colors duration-300"
            style={{ color: 'var(--text-primary)' }}
          >
            Why Invenzo
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto transition-colors duration-300"
            style={{ color: 'var(--text-secondary)' }}
          >
            Trusted by businesses to deliver results that matter.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          <StatCounter number={50} label="Products Built" suffix="+" />
          <StatCounter number={1000} label="Active Users" suffix="+" />
          <StatCounter number={98} label="Client Satisfaction" suffix="%" />
          <StatCounter number={8} label="Years of Innovation" suffix="+" />
        </div>
      </div>
    </section>
  )
}
