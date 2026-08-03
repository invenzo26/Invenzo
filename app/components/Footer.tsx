'use client'

import { motion } from 'framer-motion'
import {
  Github,
  Linkedin,
  Instagram,
  ArrowUp,
} from 'lucide-react'

export function Footer() {
  return (
    <footer
      className="relative overflow-hidden pt-24 pb-10 px-4 sm:px-6 lg:px-8"
      style={{ background: 'var(--background)' }}
    >
      {/* Watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{
          color: 'var(--gold-primary)',
          opacity: 0.03,
          fontSize: 'clamp(6rem, 18vw, 16rem)',
          fontWeight: 800,
        }}
      >
        INVENZO
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >

          <div
            className="h-px mb-16"
            style={{
              background:
                'linear-gradient(to right, transparent, var(--gold-primary), transparent)',
            }}
          />
          <div className="grid lg:grid-cols-3 gap-16">

  {/* Left */}
  <div>

    <h2
      className="text-4xl font-bold mb-6"
      style={{ color: 'var(--text-primary)' }}
    >
      Invenzo
    </h2>

    <p
      className="leading-8 max-w-sm"
      style={{ color: 'var(--text-secondary)' }}
    >
      Building AI-powered products, automation systems,
      and scalable SaaS platforms for ambitious businesses.
    </p>

  </div>

  {/* Middle */}
  <div>

    <p
      className="uppercase tracking-[0.3em] text-sm mb-6"
      style={{ color: 'var(--gold-primary)' }}
    >
      Quick Links
    </p>

    <div className="space-y-4">

      <a href="#home" className="block hover:text-yellow-400 transition-colors">
        Home
      </a>

      <a href="#products" className="block hover:text-yellow-400 transition-colors">
        Products
      </a>

      <a href="#services" className="block hover:text-yellow-400 transition-colors">
        Services
      </a>

      <a href="#contact" className="block hover:text-yellow-400 transition-colors">
        Contact
      </a>

    </div>

  </div>

  {/* Right */}
  <div>

    <p
      className="uppercase tracking-[0.3em] text-sm mb-6"
      style={{ color: 'var(--gold-primary)' }}
    >
      Contact
    </p>

    <p
      className="mb-4"
      style={{ color: 'var(--text-primary)' }}
    >
      invenzo26@gmail.com
    </p>

    <p
      style={{ color: 'var(--text-secondary)' }}
    >
      Coimbatore, Tamil Nadu, India
    </p>
    <div className="flex gap-4 mt-8">

  {[
    {
      icon: Github,
      href: "https://github.com/Invenzo26",
    },
    {
      icon: Linkedin,
      href: "#",
    },
    {
      icon: Instagram,
      href: "#",
    },
  ].map((item, index) => {

    const Icon = item.icon

    return (

      <a
        key={index}
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
        style={{
          background: 'var(--card-bg)',
          border: '1px solid var(--border-color)',
        }}
      >

        <Icon
          className="w-5 h-5"
          style={{
            color: 'var(--gold-primary)',
          }}
        />

      </a>

    )

  })}

</div>
  </div>

</div>
<div
  className="mt-20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
  style={{
    borderTop: '1px solid var(--border-color)',
  }}
>

  <p
    style={{ color: 'var(--text-secondary)' }}
  >
    © 2026 Invenzo AI Solutions. All rights reserved.
  </p>

  <p
    style={{ color: 'var(--text-secondary)' }}
  >
    Built with 💛 in India
  </p>

</div>
        </motion.div>
      </div>
      <button
  onClick={() =>
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
  className="fixed right-5 bottom-5 z-[9999] w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-2"
  style={{
    background: 'var(--gold-primary)',
    color: '#000',
  }}
>

  <ArrowUp className="w-5 h-5" />

</button>
    </footer>
  )
}