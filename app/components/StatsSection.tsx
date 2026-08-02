'use client'

import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useState } from 'react'

interface StatProps {
  number: number
  label: string
  description: string
  suffix?: string
}

function StatCounter({
  number,
  label,
  description,
  suffix = '',
}: StatProps) {
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
      className="rounded-2xl border p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:border-[var(--gold-primary)]"
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
      <p
  className="text-sm mt-4 leading-6"
  style={{ color: 'var(--text-secondary)' }}
>
  {description}
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
            Built with Purpose.
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto transition-colors duration-300"
            style={{ color: 'var(--text-secondary)' }}
          >
            Every milestone reflects real progress—from building intelligent products to creating meaningful impact for businesses.
          </p>
        </motion.div>

        <motion.div
  initial={{
  opacity: 0,
  y: 30,
  scale: 0.95,
}}
  whileInView={{
  opacity: 1,
  y: 0,
  scale: 1,
}}
  viewport={{ once: true }}
  variants={{
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
       duration: 0.6,
       ease: 'easeOut',
      },
    },
  }}
  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
>
          <StatCounter
  number={5}
  label="Products Built"
  description="AI products and digital platforms crafted with purpose."
  suffix="+"
/>

<StatCounter
  number={10}
  label="Active Users"
  description="Growing adoption across our intelligent solutions."
  suffix="+"
/>

<StatCounter
  number={100}
  label="Client Satisfaction"
  description="Committed to delivering quality in every project."
  suffix="%"
/>

<StatCounter
  number={1}
  label="Years of Innovation"
  description="Continuously building, learning and improving."
  suffix="+"
/>
      </motion.div>
      </div>
    </section>
  )
}
