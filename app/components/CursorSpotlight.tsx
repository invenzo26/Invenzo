'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect } from 'react'

export default function CursorSpotlight() {
  const mouseX = useMotionValue(-500)
  const mouseY = useMotionValue(-500)

  const x = useSpring(mouseX, {
    stiffness: 150,
    damping: 25,
  })

  const y = useSpring(mouseY, {
    stiffness: 150,
    damping: 25,
  })

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX - 250)
      mouseY.set(e.clientY - 250)
    }

    window.addEventListener('mousemove', move)

    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <motion.div
      style={{ x, y }}
      className="fixed top-0 left-0 z-40 pointer-events-none"
    >
      <div
        className="w-[500px] h-[500px] rounded-full blur-[140px]"
        style={{
          background:
            'radial-gradient(circle, rgba(255,0,0,0.5), transparent 70%)',
        }}
      />
    </motion.div>
  )
}