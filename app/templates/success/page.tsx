import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/otf/Navbar'
import { Footer } from '@/components/otf/Footer'

export const metadata: Metadata = {
  title: 'Purchase Complete — OTF',
  description: 'Your license has been delivered. Welcome to OTF.',
}

export default function TemplatesSuccessPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Navbar />

      <main className="flex flex-1 items-center justify-center px-4 py-24">
        <div className="mx-auto w-full max-w-md text-center">

          {/* Icon */}
          <div className="mb-8 inline-flex h-20 w-20 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10">
            <svg className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>

          {/* Heading */}
          <h1 className="mb-3 text-3xl font-bold tracking-tight">
            You&apos;re in. 🎉
          </h1>
          <p className="mb-8 text-muted-foreground">
            Your license key and repository access instructions have been sent to your email. Check your inbox — it arrives within a minute.
          </p>

          {/* What happens next */}
          <div className="mb-8 rounded-xl border border-border bg-card p-6 text-left">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">What happens next</p>
            <ol className="space-y-4">
              {[
                { step: '01', text: 'Check your email for the license key and repository invite link.' },
                { step: '02', text: 'Clone the repo, run bun install && bun dev, and you\'re live in minutes.' },
                { step: '03', text: 'Open CLAUDE.md or .cursorrules to let your AI agent understand the codebase.' },
              ].map((s) => (
                <li key={s.step} className="flex gap-4">
                  <span className="font-mono text-xs font-bold text-primary shrink-0 mt-0.5">{s.step}</span>
                  <span className="text-sm text-muted-foreground leading-relaxed">{s.text}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* CTAs */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="https://saas-dashboard-production-ae3f.up.railway.app"
              target="_blank"
              rel="noreferrer"
              className="flex-1 rounded-md border border-border bg-secondary/40 px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              View live demo →
            </a>
            <Link
              href="/components"
              className="flex-1 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground text-center transition-all hover:opacity-90"
            >
              Browse components
            </Link>
          </div>

          {/* Support note */}
          <p className="mt-8 text-xs text-muted-foreground/60">
            Didn&apos;t receive your email?{' '}
            <a href="mailto:support@otf.dev" className="text-primary hover:underline">
              Contact support
            </a>
            {' '}· 14-day refund guarantee
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
