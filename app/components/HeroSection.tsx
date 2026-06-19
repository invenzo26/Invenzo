'use client'

import { motion } from 'framer-motion'
import { PremiumButton } from './PremiumButton'
import { scrollToHomepageSection } from './sectionNavigation'

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden pt-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300"
      style={{ background: 'var(--hero-bg)' }}
    >

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-80px)] text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6 transition-colors duration-300 [-webkit-font-smoothing:antialiased]"
          style={{ color: 'var(--text-primary)' }}
        >
          AI Systems, SaaS Products<br />
          <span
            className="bg-gradient-to-r bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(135deg, #f2c94c 0%, #d4af37 100%)',
            }}
          >
            & Business Automation
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-lg sm:text-xl max-w-2xl mx-auto mb-8 leading-relaxed transition-colors duration-300 tracking-tight"
          style={{
            color: 'var(--text-secondary)',
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
          }}
        >
          We build AI-powered software, SaaS platforms and automation systems that help businesses scale faster.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center"
        >
          <PremiumButton size="lg" onClick={() => scrollToHomepageSection('contact')}>
            Start a Project
          </PremiumButton>

          <PremiumButton variant="secondary" size="lg" onClick={() => scrollToHomepageSection('products')}>
            View Our Work
          </PremiumButton>
        </motion.div>
        {/* <p className="text-base">Building scalable software for modern businesses.</p> */}

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.svg
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            style={{ color: 'var(--text-secondary)' }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </motion.svg>
        </motion.div>
      </div>
    </section>
  )
}
