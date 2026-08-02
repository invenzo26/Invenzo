'use client'

import { motion } from 'framer-motion'
import {
  Code2,
  FileJson,
  Database,
  Braces,
  Brain,
  Zap,
} from 'lucide-react'

const techCategories = [
  {
    title: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript'],
    icon: Code2,
  },
  {
    title: 'Backend',
    items: ['Node.js', 'PostgreSQL', 'Supabase'],
    icon: Database,
  },
  {
    title: 'Artificial Intelligence',
    items: ['Python', 'OpenAI', 'Automation'],
    icon: Brain,
  },
  {
    title: 'Experience',
    items: ['Framer Motion', 'Responsive UI', 'Performance'],
    icon: Zap,
  },
]

export function TechStackSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
  }

  return (
    <section
      id="tech-stack"
      className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 transition-colors duration-300"
      style={{ background: 'var(--section-surface-bg)' }}
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
            Technology Stack
          </h2>
          <p
  className="text-lg max-w-3xl mx-auto leading-relaxed transition-colors duration-300"
  style={{ color: 'var(--text-secondary)' }}
>
  Every technology we choose is driven by one goal—building scalable,
  intelligent, and high-performance products that are ready for real-world
  growth.
</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 xl:grid-cols-4 gap-8"
        >
          {techCategories.map((category, index) => {
  const Icon = category.icon

  return (
    <motion.div
      key={index}
      variants={itemVariants}
      whileHover={{ y: -8 }}
    >
      <div
  className="rounded-2xl border p-7 h-full transition-all duration-300 hover:-translate-y-2 hover:border-[var(--gold-primary)]"        style={{
          background: 'var(--card-bg)',
          borderColor: 'var(--border-color)',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        <Icon
  className="w-10 h-10 mb-6"
          style={{ color: 'var(--gold-primary)' }}
        />

        <h3
          className="text-xl font-semibold mb-5"
          style={{ color: 'var(--text-primary)' }}
        >
          {category.title}
        </h3>

        <div className="space-y-3">
          {category.items.map((item) => (
            <p
              key={item}
              className="text-sm"
              style={{ color: 'var(--text-secondary)' }}
            >
              <span
  style={{ color: 'var(--gold-primary)' }}
>
  ✓
</span>{' '}
{item}
            </p>
          ))}
        </div>
      </div>
    </motion.div>
  )
})}
        </motion.div>
      </div>
    </section>
  )
}
