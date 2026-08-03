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
  number: '01',
  title: 'AI Solutions',
  description: 'Custom AI systems and intelligent workflows designed to automate operations and accelerate growth.'
},
{
  number: '02',
  title: 'SaaS Products',
  description: 'Scalable cloud software engineered for performance and long-term growth.'
},
{
  number: '03',
  title: 'Automation Systems',
  description: 'Reduce repetitive work through smart business process automation.'
},
{
  number: '04',
  title: 'Custom Platforms',
  description: 'Tailor-made digital platforms built around unique operational requirements.'
},
{
  number: '05',
  title: 'Experience Design',
  description: 'User experiences that feel intuitive, premium, and conversion-focused.'
}
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
            className="text-4xl sm:text-3xl
sm:text-4xl
lg:text-6xl font-bold mb-4 transition-colors duration-300"
            style={{ color: 'var(--text-primary)' }}
          >
            What We Build
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto transition-colors duration-300"
            style={{ color: 'var(--text-secondary)' }}
          >
            Engineering Intelligent
            Digital Products
            From AI-powered systems to scalable SaaS platforms, we build technology that solves real business challenges.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6"
        >
          {services.map((service, index) => {
            return (
              <motion.div key={index} variants={itemVariants}>
                <PremiumCard hover className="transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02]">
                  <div
                    className="text-3xl
sm:text-4xl
lg:text-6xl font-bold mb-6 opacity-20"
                    style={{color: 'var(--gold-primary)'}}
                  >
                    {service.number}
                  </div>
                  <h3
                    className="text-2xl font-bold mb-4 transition-colors duration-300"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {service.title}
                  </h3>
                  <p
                    className="leading-relaxed text-base"
                    style={{color: 'var(--text-secondary)',}}
                  >
                  {service.description}
                  </p>
                </PremiumCard>
              </motion.div>
            )
          })}
        </motion.div>
        <div className="mt-20 flex flex-wrap justify-center items-center gap-4 text-sm">
        <span>Discover</span>
        <span style={{ color: 'var(--gold-primary)' }}>
           →
        </span>
        <span>Design</span>
        <span style={{ color: 'var(--gold-primary)' }}>
           →
        </span>
        <span>Develop</span>
        <span style={{ color: 'var(--gold-primary)' }}>
           →
        </span>
        <span>Deploy</span>
        </div>
      </div>
    </section>
  )
}
