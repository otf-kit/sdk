import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { PostHogProvider } from '@/components/PostHogProvider'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'OTF — Open React Component Library & Full-Stack Templates',
  description: '180+ animated components and full-stack templates. Free, open source, built to drop into any React project — with AI configs pre-wired for Cursor, Claude, and Lovable.',
  openGraph: {
    title: 'OTF — Open React Component Library & Full-Stack Templates',
    description: '180+ animated components and full-stack templates. Free, open source, built to drop into any React project — with AI configs pre-wired for Cursor, Claude, and Lovable.',
    type: 'website',
  },
}

export const viewport: Viewport = { width: 'device-width', initialScale: 1 }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-dvh flex flex-col">
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  )
}
