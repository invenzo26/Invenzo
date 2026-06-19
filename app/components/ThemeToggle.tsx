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
      <div className="w-11 h-11 rounded-lg border animate-pulse" style={{ borderColor: 'var(--border-color)' }} />
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-11 w-11 items-center justify-center rounded-lg border transition-all duration-300 hover:-translate-y-1 active:scale-95 focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg-primary theme-toggle-button"
      aria-label="Toggle theme"
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 transition-all duration-300" style={{ color: 'var(--gold-primary)' }} />
      ) : (
        <Moon className="w-5 h-5 transition-all duration-300" style={{ color: 'var(--gold-primary)' }} />
      )}
    </button>
  )
}
