'use client'

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const storageKey = 'invenzo-theme'

function getSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyTheme(nextTheme: Theme) {
  document.documentElement.setAttribute('data-theme', nextTheme)
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')

  useEffect(() => {
    const stored = (localStorage.getItem(storageKey) || localStorage.getItem('theme')) as Theme | null
    const initialTheme = stored === 'dark' || stored === 'light' ? stored : getSystemTheme()

    setTheme(initialTheme)
    applyTheme(initialTheme)

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleSystemThemeChange = () => {
      if (localStorage.getItem(storageKey)) {
        return
      }

      const systemTheme = getSystemTheme()
      document.documentElement.setAttribute('data-theme', systemTheme)
      setTheme(systemTheme)
    }

    mediaQuery.addEventListener('change', handleSystemThemeChange)

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange)
    }
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const newTheme = prev === 'dark' ? 'light' : 'dark'
      localStorage.setItem(storageKey, newTheme)
      applyTheme(newTheme)
      return newTheme
    })
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    // During SSR or if not wrapped in provider, return default
    return {
      theme: 'dark' as const,
      toggleTheme: () => {},
    }
  }
  return context
}
