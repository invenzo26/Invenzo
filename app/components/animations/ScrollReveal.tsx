'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { ReactNode } from 'react'
import { cinematicEase } from './motionVariants'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'right'
}

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: ScrollRevealProps) {
  const reduceMotion = useReducedMotion()
  const hiddenPosition = {
    up: { x: 0, y: 45 },
    left: { x: -45, y: 0 },
    right: { x: 45, y: 0 },
  }

  const variants: Variants = {
    hidden: {
      opacity: 0,
      ...hiddenPosition[direction],
      scale: 0.98,
    },

    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        delay,
        ease: cinematicEase,
      },
    },
  }

  if (reduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.18,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
