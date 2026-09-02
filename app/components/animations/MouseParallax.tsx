'use client'

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import type { PointerEvent, ReactNode } from 'react'

interface MouseParallaxProps {
  children: ReactNode
  className?: string
  strength?: number
}

export default function MouseParallax({
  children,
  className = '',
  strength = 10,
}: MouseParallaxProps) {
  const reduceMotion = useReducedMotion()
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const rotateY = useSpring(useTransform(pointerX, [-1, 1], [-strength, strength]), { stiffness: 160, damping: 24 })
  const rotateX = useSpring(useTransform(pointerY, [-1, 1], [strength, -strength]), { stiffness: 160, damping: 24 })
  const translateX = useSpring(useTransform(pointerX, [-1, 1], [-strength * 0.55, strength * 0.55]), { stiffness: 160, damping: 24 })
  const translateY = useSpring(useTransform(pointerY, [-1, 1], [-strength * 0.55, strength * 0.55]), { stiffness: 160, damping: 24 })

  const reset = () => {
    pointerX.set(0)
    pointerY.set(0)
  }

  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion) return
    const bounds = event.currentTarget.getBoundingClientRect()
    pointerX.set(((event.clientX - bounds.left) / bounds.width) * 2 - 1)
    pointerY.set(((event.clientY - bounds.top) / bounds.height) * 2 - 1)
  }

  return (
    <div className={className} style={{ perspective: '1200px' }} onPointerMove={move} onPointerLeave={reset}>
      <motion.div
        className="h-full w-full"
        style={reduceMotion ? undefined : { rotateX, rotateY, x: translateX, y: translateY, transformStyle: 'preserve-3d' }}
      >
        {children}
      </motion.div>
    </div>
  )
}
