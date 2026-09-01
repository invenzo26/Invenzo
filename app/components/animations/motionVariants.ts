import type { Variants } from 'framer-motion'

export const cinematicEase = [0.22, 1, 0.36, 1] as const
export const springEase = { type: 'spring', stiffness: 180, damping: 22, mass: 0.8 } as const

export const revealUp: Variants = {
  hidden: { opacity: 0, y: 48, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.85, ease: cinematicEase },
  },
}

export const revealLeft: Variants = {
  hidden: { opacity: 0, x: -48, scale: 0.98 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.85, ease: cinematicEase },
  },
}

export const revealRight: Variants = {
  hidden: { opacity: 0, x: 48, scale: 0.98 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.85, ease: cinematicEase },
  },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.75, ease: cinematicEase },
  },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
}

export const productSlide: Variants = {
  enter: { opacity: 0, x: 80, rotateY: -8, scale: 0.96 },
  center: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    scale: 1,
    transition: { duration: 0.65, ease: cinematicEase },
  },
  exit: {
    opacity: 0,
    x: -80,
    rotateY: 8,
    scale: 0.96,
    transition: { duration: 0.45, ease: cinematicEase },
  },
}
