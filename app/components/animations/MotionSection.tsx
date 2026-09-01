'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { revealLeft, revealRight, revealUp, scaleIn } from './motionVariants'

type Direction = 'up' | 'left' | 'right' | 'scale'

interface MotionSectionProps {
  children: ReactNode
  className?: string
  direction?: Direction
  delay?: number
}

export function MotionSection({
  children,
  className = '',
  direction = 'up',
  delay = 0,
}: MotionSectionProps) {
  const reduceMotion = useReducedMotion()
  const variants = {
    up: revealUp,
    left: revealLeft,
    right: revealRight,
    scale: scaleIn,
  }[direction]

  if (reduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.22 }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
