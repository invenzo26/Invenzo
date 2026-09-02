'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Brain, Code2, Database, Gauge, Workflow } from 'lucide-react'
import FloatingWrapper from './animations/FloatingWrapper'
import { MotionSection } from './animations/MotionSection'

const techCategories = [
  {
    title: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript'],
    icon: Code2,
    position: 'lg:left-0 lg:top-10',
  },
  {
    title: 'Backend',
    items: ['Node.js', 'PostgreSQL', 'Supabase'],
    icon: Database,
    position: 'lg:right-0 lg:top-16',
  },
  {
    title: 'Artificial Intelligence',
    items: ['Python', 'OpenAI', 'Automation'],
    icon: Brain,
    position: 'lg:left-16 lg:bottom-4',
  },
  {
    title: 'Experience',
    items: ['Framer Motion', 'Responsive UI', 'Performance'],
    icon: Gauge,
    position: 'lg:right-14 lg:bottom-0',
  },
]

export function TechStackSection() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="tech-stack"
      className="relative z-10 overflow-hidden px-4 py-24 sm:px-6 lg:px-8 lg:py-36"
      style={{ background: 'var(--section-surface-bg)' }}
    >
      <div className="relative mx-auto max-w-7xl">
        <MotionSection className="mx-auto mb-14 max-w-4xl text-center">
          <p className="mb-5 text-xs font-semibold uppercase" style={{ color: 'var(--gold-primary)', letterSpacing: '0.24em' }}>
            Technology Stack
          </p>
          <h2 className="text-[clamp(2.4rem,6vw,5.6rem)] font-semibold leading-none" style={{ color: 'var(--text-primary)' }}>
            A precise stack for intelligent, durable products.
          </h2>
          <p className="mx-auto mt-7 max-w-3xl leading-8" style={{ color: 'var(--text-secondary)' }}>
            Every technology choice is made for speed, scalability, maintainability, and the kind of refined product experience that teams can trust in production.
          </p>
        </MotionSection>

        <div className="relative mx-auto max-w-6xl lg:min-h-[640px]">
          <div className="absolute left-1/2 top-1/2 hidden h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border lg:block" style={{ borderColor: 'var(--border-color)' }} />
          <div className="absolute left-1/2 top-1/2 hidden h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full border lg:block" style={{ borderColor: 'var(--border-color)' }} />

          <FloatingWrapper className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block" amount={8} duration={7}>
            <div
              className="grid h-64 w-64 place-items-center rounded-[2rem] border p-7 text-center"
              style={{
                background: 'var(--card-bg)',
                borderColor: 'var(--gold-primary)',
                boxShadow: 'var(--shadow-card)',
                transform: 'perspective(1000px) rotateX(3deg) rotateY(-3deg)',
              }}
            >
              <Workflow className="mx-auto mb-5 h-10 w-10" style={{ color: 'var(--gold-primary)' }} />
              <h3 className="text-3xl font-semibold" style={{ color: 'var(--text-primary)' }}>Engineering Core</h3>
              <p className="mt-4 text-sm leading-6" style={{ color: 'var(--text-secondary)' }}>
                AI, data, interface, and operations moving as one system.
              </p>
            </div>
          </FloatingWrapper>

          <div className="grid gap-5 lg:block">
            {techCategories.map((category, index) => {
              const Icon = category.icon
              return (
                <motion.article
                  key={category.title}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.18 }}
                  transition={{ duration: 0.75, delay: index * 0.08 }}
                  whileHover={reduceMotion ? undefined : { y: -8, rotateX: 2, rotateY: index % 2 === 0 ? -2 : 2 }}
                  className={`rounded-2xl border p-6 lg:absolute lg:w-80 ${category.position}`}
                  style={{
                    background: 'var(--card-bg)',
                    borderColor: 'var(--border-color)',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <div className="mb-7 flex items-center justify-between">
                    <Icon className="h-8 w-8" style={{ color: 'var(--gold-primary)' }} />
                    <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>{category.title}</h3>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {category.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border px-3 py-1.5 text-sm"
                        style={{ color: 'var(--text-secondary)', borderColor: 'var(--border-color)', background: 'var(--hover-overlay)' }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
