'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Bot, Cpu, Network, Sparkles } from 'lucide-react'
import { PremiumButton } from './PremiumButton'
import BackgroundGrid from './BackgroundGrid'
import FloatingParticles from './FloatingParticles'
import MouseParallax from './animations/MouseParallax'
import { cinematicEase } from './animations/motionVariants'
import { scrollToHomepageSection } from './sectionNavigation'

const signals = [
  { label: 'AI Systems', icon: Bot },
  { label: 'SaaS Products', icon: Cpu },
  { label: 'Automation', icon: Network },
]

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative z-10 flex min-h-screen flex-col overflow-hidden px-4 pt-28 sm:px-6 lg:px-8"
      style={{ background: 'var(--hero-bg)' }}
    >
      <BackgroundGrid />
      <FloatingParticles />

      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute left-1/2 top-20 h-[420px] w-[420px] -translate-x-1/2 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.24), transparent 68%)',
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-48"
          style={{ background: 'linear-gradient(to bottom, transparent, var(--bg-primary))' }}
        />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 items-center gap-12 py-8 lg:grid-cols-[1.08fr_0.92fr] lg:py-12">
        <div className="max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: cinematicEase }}
            className="mb-6 inline-flex items-center gap-2 text-xs font-semibold uppercase"
            style={{ color: 'var(--gold-primary)', letterSpacing: '0.24em' }}
          >
            <Sparkles className="h-4 w-4" />
            Invenzo AI Solutions
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, ease: cinematicEase }}
            className="max-w-5xl text-[clamp(3rem,8.2vw,7.4rem)] font-semibold leading-[0.95] tracking-normal"
            style={{ color: 'var(--text-primary)' }}
          >
            Intelligent software for ambitious operators.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.75, ease: cinematicEase }}
            className="mt-7 max-w-2xl text-base leading-8 sm:text-lg"
            style={{ color: 'var(--text-secondary)' }}
          >
            We design and engineer AI systems, SaaS platforms, and automation products that turn complex business workflows into refined digital experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.75, ease: cinematicEase }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <PremiumButton className="w-full sm:w-auto" size="lg" onClick={() => scrollToHomepageSection('contact')}>
              Start a Project
            </PremiumButton>
            <PremiumButton className="w-full sm:w-auto" variant="secondary" size="lg" onClick={() => scrollToHomepageSection('products')}>
              Explore Work
            </PremiumButton>
          </motion.div>
        </div>

        <MouseParallax className="relative hidden min-h-[620px] lg:block" strength={10}>
          <motion.div
            initial={{ opacity: 0, scale: 0.92, rotateX: 8 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ delay: 0.18, duration: 1, ease: cinematicEase }}
            className="absolute inset-0"
          >
            <div className="absolute left-10 top-24 h-[390px] w-[390px] rounded-full border" style={{ borderColor: 'var(--border-color)' }} />
            <div className="absolute left-20 top-32 h-[300px] w-[300px] rounded-full border opacity-70" style={{ borderColor: 'var(--border-color)' }} />
            <div
              className="absolute left-32 top-44 h-[180px] w-[180px] rounded-full opacity-45"
              style={{ background: 'radial-gradient(circle, rgba(212, 175, 55, 0.34), transparent 70%)' }}
            />

            <div className="absolute left-0 top-10">
              <SignalPanel title="Realtime intelligence" value="AI" icon={Bot} />
            </div>
            <div className="absolute right-2 top-44">
              <SignalPanel title="Scalable product layer" value="SaaS" icon={Cpu} />
            </div>
            <div className="absolute bottom-24 left-16">
              <SignalPanel title="Workflow orchestration" value="Ops" icon={Network} />
            </div>

            <div
              className="absolute left-40 top-36 h-72 w-72 rounded-[2rem] border p-5"
              style={{
                background: 'var(--card-bg)',
                borderColor: 'var(--border-color)',
                boxShadow: 'var(--shadow-card)',
                transform: 'perspective(1000px) rotateX(42deg) rotateZ(-18deg)',
              }}
            >
              <div className="grid h-full grid-cols-3 gap-3">
                {Array.from({ length: 9 }).map((_, index) => (
                  <div
                    key={index}
                    className="rounded-lg border"
                    style={{ borderColor: 'var(--border-color)', background: index % 2 ? 'var(--hover-overlay)' : 'transparent' }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </MouseParallax>
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl shrink-0 grid-cols-1 gap-3 pb-5 sm:grid-cols-3">
        {signals.map((signal, index) => {
          const Icon = signal.icon
          return (
            <motion.div
              key={signal.label}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.48 + index * 0.08, duration: 0.6, ease: cinematicEase }}
              className="flex items-center gap-3 rounded-xl border px-4 py-3"
              style={{ background: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
            >
              <Icon className="h-4 w-4" style={{ color: 'var(--gold-primary)' }} />
              <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{signal.label}</span>
            </motion.div>
          )
        })}
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={() => scrollToHomepageSection('products')}
        className="relative z-20 mx-auto mb-5 hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border sm:flex"
        style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
        aria-label="Scroll to products"
      >
        <span>
          <ArrowDown className="h-5 w-5" />
        </span>
      </motion.button>
    </section>
  )
}

function SignalPanel({
  title,
  value,
  icon: Icon,
}: {
  title: string
  value: string
  icon: typeof Bot
}) {
  return (
    <div
      className="w-56 rounded-2xl border p-4"
      style={{
        background: 'var(--card-bg)',
        borderColor: 'var(--border-color)',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      <div className="flex items-center justify-between">
        <Icon className="h-5 w-5" style={{ color: 'var(--gold-primary)' }} />
        <span className="text-xs uppercase" style={{ color: 'var(--text-secondary)', letterSpacing: '0.16em' }}>{value}</span>
      </div>
      <p className="mt-5 text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{title}</p>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full" style={{ background: 'var(--hover-overlay)' }}>
        <div className="h-full w-2/3 rounded-full" style={{ background: 'var(--gold-gradient-1)' }} />
      </div>
    </div>
  )
}
