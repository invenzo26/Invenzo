'use client'

import { motion } from 'framer-motion'

export default function BackgroundGrid() {
  return (
    <motion.div
      animate={{
        backgroundPosition: ['0px 0px', '60px 60px'],
      }}
      transition={{
        duration: 40,
        repeat: Infinity,
        ease: 'linear',
      }}
      className="absolute inset-0 pointer-events-none opacity-[0.03]"
      style={{
        backgroundImage: `
          linear-gradient(var(--border-color) 1px, transparent 1px),
          linear-gradient(90deg, var(--border-color) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }}
    />
  )
}