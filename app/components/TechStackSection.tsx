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

const technologies = [
  { name: 'React', icon: Code2 },
  { name: 'Next.js', icon: Zap },
  { name: 'Node.js', icon: Code2 },
  { name: 'TypeScript', icon: Braces },
  { name: 'Python', icon: Code2 },
  { name: 'PostgreSQL', icon: Database },
  { name: 'AI/ML', icon: Brain },
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
            className="text-lg max-w-2xl mx-auto transition-colors duration-300"
            style={{ color: 'var(--text-secondary)' }}
          >
            Built with modern tools and frameworks trusted by leading companies worldwide.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6"
        >
          {technologies.map((tech, index) => {
            const Icon = tech.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.1 }}
                className="group"
              >
                <div
                  className="
                    h-20 rounded-lg
                    flex items-center justify-center
                    group-hover:shadow-lg transition-all duration-300 border
                  "
                  style={{
                    background: 'var(--card-bg)',
                    borderColor: 'var(--border-color)',
                    boxShadow: 'var(--shadow-card)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--gold-primary)'
                    e.currentTarget.style.background = 'var(--metallic-highlight)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-color)'
                    e.currentTarget.style.background = 'var(--card-bg)'
                  }}
                >
                  <Icon
                    className="w-8 h-8"
                    style={{ color: 'var(--gold-primary)' }}
                  />
                </div>
                <p
                  className="text-center text-sm mt-3 font-medium transition-colors duration-300"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {tech.name}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
