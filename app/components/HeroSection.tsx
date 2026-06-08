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
      {/* Animated geometric background */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <svg
          className="absolute w-full h-full"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
          style={{ color: 'var(--gold-primary)' }}
        >
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="1200" height="800" fill="url(#grid)" />
        </svg>

        {/* Subtle accent shapes */}
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-20 right-1/4 w-96 h-96 rounded-full filter blur-3xl opacity-10"
          style={{ background: 'var(--metallic-highlight)' }}
        />
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 7, repeat: Infinity }}
          className="absolute -bottom-40 left-1/4 w-96 h-96 rounded-full filter blur-3xl opacity-10"
          style={{ background: 'var(--metallic-sheen)' }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-80px)] text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-6 transition-colors duration-300"
          style={{ color: 'var(--text-primary)' }}
        >
          Building Software<br />
          <span style={{ color: 'var(--gold-primary)' }}>That Matters.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-lg sm:text-xl max-w-2xl mx-auto mb-8 leading-relaxed transition-colors duration-300"
          style={{ color: 'var(--text-secondary)' }}
        >
          Invenzo designs and develops intelligent digital products, AI solutions, and scalable web applications for modern businesses that want to make an impact.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center"
        >
          <PremiumButton size="lg" onClick={() => scrollToHomepageSection('products')}>
            Explore Products
          </PremiumButton>

          <PremiumButton variant="secondary" size="lg" onClick={() => scrollToHomepageSection('contact')}>
            Contact Us
          </PremiumButton>
        </motion.div>

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
