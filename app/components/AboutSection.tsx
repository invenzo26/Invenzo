'use client'

import { motion } from 'framer-motion'

export function AboutSection() {
  return (
    <section
      id="about"
      className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{ background: 'var(--background)' }}
    >
      <div className="max-w-7xl mx-auto grid gap-16 lg:grid-cols-2 gap-20 items-start">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-20"
        >
          <span
            className="uppercase tracking-[0.3em] text-sm font-semibold"
            style={{ color: 'var(--gold-primary)' }}
          >
            About Invenzo
          </span>

          <h2
            className="mt-6 text-3xl
sm:text-4xl
lg:text-6xl md:text-6xl font-light leading-tight"
            style={{ color: 'var(--text-primary)' }}
          >
            Building intelligent
            <span
              className="block font-semibold"
              style={{ color: 'var(--gold-primary)' }}
            >
              digital products
            </span>
            that create real impact.
          </h2>

          <p
            className="mt-8 text-lg leading-8 max-w-xl"
            style={{ color: 'var(--text-secondary)' }}
          >
            Invenzo is an AI-first software company focused on creating
            scalable digital products, automation systems, and modern
            web experiences that help businesses move faster and grow
            smarter.
          </p>
        </motion.div>
        <motion.div
  initial={{ opacity: 0, x: 30 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.7 }}
  viewport={{ once: true }}
  className="grid grid-cols-1 sm:grid-cols-2 gap-6"
>

  {[
    {
      title: "Founded",
      value: "2025",
      desc: "Building the next generation of AI-powered digital products."
    },
    {
      title: "Focus",
      value: "AI First",
      desc: "We design every product with artificial intelligence at its core-not as an afterthought.."
    },
    {
      title: "Mission",
      value: "Purpose",
      desc: "Every feature exists to solve a real problem—not to increase complexity."
    },
    {
      title: "Reach",
      value: "Global",
      desc: "Built in India. Designed for businesses everywhere."
    }
  ].map((item) => (
    <div
      key={item.title}
      className="rounded-3xl border p-8 hover:-translate-y-2 hover:border-[var(--gold-primary)] transition-all duration-300"
      style={{
        borderColor: 'var(--border-color)',
        background: 'var(--card-bg)'
      }}
    >
      <p
        className="text-sm uppercase tracking-widest mb-6"
        style={{ color: 'var(--gold-primary)' }}
      >
        {item.title}
      </p>

      <h3
        className="text-3xl font-semibold mb-4"
        style={{ color: 'var(--text-primary)' }}
      >
        {item.value}
      </h3>

      <p
        className="leading-7"
        style={{ color: 'var(--text-secondary)' }}
      >
        {item.desc}
      </p>
    </div>
  ))}

</motion.div>
  <motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7 }}
  viewport={{ once: true }}
  className="mt-24 col-span-full"
>

  <p
    className="uppercase tracking-[0.3em] text-sm text-center mb-12"
    style={{ color: 'var(--gold-primary)' }}
  >
    OUR JOURNEY
  </p>
  <div className="relative w-full max-w-5xl mx-auto">

  <div
  className="absolute top-6 left-[12%] right-[12%] h-[2px] rounded-full"
  style={{
    background: 'var(--border-color)',
  }}
/>

<div
  className="absolute top-6 left-[12%] h-[2px] rounded-full"
  style={{
    width: '58%',
    background: 'var(--gold-primary)',
    boxShadow: '0 0 12px rgba(212,175,55,.35)',
  }}
/>
<div className="relative max-w-5xl mx-auto">
  <div className="grid grid-cols-1 md:grid-cols-4 gap-12 justify-items-center items-start w-full">

  {[
    {
      icon: "✓",
      title: "Founded",
      subtitle: "2025",
      active: false,
    },
    {
      icon: "✓",
      title: "Portfolio",
      subtitle: "Live",
      active: false,
    },
    {
      icon: "●",
      title: "AI Products",
      subtitle: "Building",
      active: true,
    },
    {
      icon: "○",
      title: "Global",
      subtitle: "Next",
      active: false,
    },
  ].map((item) => (
    <div
      key={item.title}
      className="flex flex-col items-center justify-start text-center"
    >

      <div
        className="w-12 h-12 rounded-full flex items-center justify-center border text-lg font-semibold mb-6 transition-all duration-300 hover:scale-110"
        style={{
          background: 'var(--card-bg)',
          borderColor: item.active
            ? 'var(--gold-primary)'
            : 'var(--border-color)',
          color: item.active
            ? 'var(--gold-primary)'
            : 'var(--text-primary)',
          boxShadow: item.active
            ? '0 0 18px rgba(212,175,55,.35)'
            : 'none',
        }}
      >
        {item.icon}
      </div>

      <h3
        className="text-lg font-semibold"
        style={{ color: 'var(--text-primary)' }}
      >
        {item.title}
      </h3>

      <p
        className="mt-2 text-sm"
        style={{ color: 'var(--text-secondary)' }}
      >
        {item.subtitle}
      </p>

    </div>
  ))}
  </div>
</div>
</div>
</motion.div>
      </div>
    </section>
  )
}