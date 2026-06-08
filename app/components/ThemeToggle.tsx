'use client'

import { useTheme } from '@/app/providers/ThemeProvider'
import { Sun, Moon } from 'lucide-react'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-lg border animate-pulse" style={{ borderColor: 'var(--border-color)' }} />
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg border transition-all duration-300 hover:-translate-y-0.5"
      aria-label="Toggle theme"
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      style={{
        background: 'var(--card-bg)',
        borderColor: 'var(--border-color)',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5" style={{ color: 'var(--gold-primary)' }} />
      ) : (
        <Moon className="w-5 h-5" style={{ color: 'var(--gold-primary)' }} />
      )}
    </button>
  )
}
