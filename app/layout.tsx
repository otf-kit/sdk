import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { PostHogProvider } from '@/components/PostHogProvider'

const inter = Inter({
  variable: '--font-geist',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'OTF — Cross-platform Templates for Expo + Next.js',
  description:
    'Production-ready UI components and full-stack kits for Expo and Next.js, with AI configs for Cursor, Claude Code, and Lovable.',
  openGraph: {
    title: 'OTF — Cross-platform Templates for Expo + Next.js',
    description:
      'Production-ready UI components and full-stack kits for Expo and Next.js, with AI configs for Cursor, Claude Code, and Lovable.',
    type: 'website',
  },
}

export const viewport: Viewport = { width: 'device-width', initialScale: 1 }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
      <body className="min-h-dvh flex flex-col">
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  )
}
