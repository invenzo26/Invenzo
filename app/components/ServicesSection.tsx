'use client'

import { motion } from 'framer-motion'
import { PremiumCard } from './PremiumCard'
import {
  Zap,
  Globe,
  Package,
  Cog,
  Palette,
} from 'lucide-react'

const services = [
  {
    icon: Zap,
    title: 'AI Solutions',
    description:
      'Custom AI and machine learning implementations that drive automation and insights for your business.',
  },
  {
    icon: Globe,
    title: 'Web Development',
    description:
      'Modern, scalable web applications built with latest technologies and best practices.',
  },
  {
    icon: Package,
    title: 'SaaS Development',
    description:
      'End-to-end SaaS product development from concept to launch and beyond.',
  },
  {
    icon: Cog,
    title: 'Automation Solutions',
    description:
      'Streamline operations with intelligent automation tailored to your workflow.',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description:
      'Beautiful, intuitive interfaces that delight users and drive engagement.',
  },
]

export function ServicesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section
      id="services"
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
            Our Services
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto transition-colors duration-300"
            style={{ color: 'var(--text-secondary)' }}
          >
            Comprehensive solutions designed to transform your vision into reality.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
        >
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div key={index} variants={itemVariants}>
                <PremiumCard hover className="h-full">
                  <Icon
                    className="w-8 h-8 mb-4"
                    style={{ color: 'var(--gold-primary)' }}
                  />
                  <h3
                    className="text-lg font-semibold mb-3 transition-colors duration-300"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {service.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed transition-colors duration-300"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {service.description}
                  </p>
                </PremiumCard>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
