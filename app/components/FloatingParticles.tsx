'use client'

import { motion } from 'framer-motion'

const particles = [
  { x: '8%', y: '18%', size: 6, duration: 12, shape: 'circle' },
  { x: '20%', y: '70%', size: 4, duration: 16, shape: 'diamond' },
  { x: '35%', y: '30%', size: 5, duration: 14, shape: 'circle' },
  { x: '52%', y: '82%', size: 7, duration: 18, shape: 'sparkle' },
  { x: '68%', y: '22%', size: 4, duration: 13, shape: 'diamond' },
  { x: '82%', y: '65%', size: 6, duration: 15, shape: 'circle' },
  { x: '92%', y: '38%', size: 5, duration: 17, shape: 'sparkle' },
  { x: '58%', y: '10%', size: 3, duration: 11, shape: 'circle' },
]

export default function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
    animate={{
      y: [0, -25, 0],
      x: [0, 10, -10, 0],
      rotate: [0, 180, 360],
      opacity: [0.08, 0.18, 0.08],
    }}
    transition={{
      duration: particle.duration,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  >
    {particle.shape === 'circle' && (
      <div
        className="rounded-full"
        style={{
          width: particle.size,
          height: particle.size,
          background: 'var(--gold-primary)',
        }}
      />
    )}

    {particle.shape === 'diamond' && (
      <div
        style={{
          width: particle.size,
          height: particle.size,
          background: 'var(--gold-primary)',
          transform: 'rotate(45deg)',
        }}
      />
    )}

    {particle.shape === 'sparkle' && (
      <div
        style={{
          color: 'var(--gold-primary)',
          fontSize: particle.size * 2,
          lineHeight: 1,
        }}
      >
        ✦
      </div>
    )}
  </motion.div>
))}
    </div>
  )
}