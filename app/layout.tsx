import type { Metadata, Viewport } from 'next'
import './globals.css'
import Navbar from './components/Navbar'
import { ThemeProvider } from './providers/ThemeProvider'

export const metadata: Metadata = {
  title: 'Invenzo AI Solutions',
  description: 'Next-gen AI SaaS platform',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
