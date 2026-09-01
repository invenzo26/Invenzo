'use client'

import { motion, useReducedMotion } from 'framer-motion'

const particles = [
  { x: '8%', y: '18%', size: 5, duration: 12, shape: 'circle' },
  { x: '34%', y: '30%', size: 4, duration: 14, shape: 'circle' },
  { x: '68%', y: '22%', size: 4, duration: 13, shape: 'diamond' },
  { x: '84%', y: '66%', size: 5, duration: 15, shape: 'circle' },
]

export default function FloatingParticles() {
  const reduceMotion = useReducedMotion()

  return (
    <div className="pointer-events-none absolute inset-0 hidden overflow-hidden sm:block">
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          className="absolute flex items-center justify-center"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size * 2,
            height: particle.size * 2,
          }}
          animate={reduceMotion ? undefined : { y: [0, -8, 0], x: [0, 4, 0] }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div
            className={particle.shape === 'diamond' ? '' : 'rounded-full'}
            style={{
              width: particle.size,
              height: particle.size,
              background: 'var(--gold-primary)',
              opacity: 0.18,
              transform: particle.shape === 'diamond' ? 'rotate(45deg)' : undefined,
            }}
          />
        </motion.div>
      ))}
    </div>
  )
}
