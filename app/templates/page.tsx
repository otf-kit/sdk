import type { Metadata } from 'next'
import { Navbar } from '@/components/otf/Navbar'
import { Footer } from '@/components/otf/Footer'
import { TemplatesClient } from './TemplatesClient'

export const metadata: Metadata = {
  title: 'Templates — OTF',
  description: 'Full-stack kits pre-loaded with CLAUDE.md, .cursorrules, and 20+ tested prompts. Works with Cursor, Claude, Lovable, Bolt — your AI already knows the codebase.',
}

export default function TemplatesPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Navbar />
      <TemplatesClient />
      <Footer />
    </div>
  )
}
