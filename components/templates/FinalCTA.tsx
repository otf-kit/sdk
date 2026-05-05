import Link from 'next/link'
import { ArrowRight, Mail } from 'lucide-react'

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-border bg-card">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-pattern-grid opacity-[0.10]" aria-hidden />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" aria-hidden />

      <div className="relative grid gap-8 p-8 sm:p-12 md:grid-cols-[1.4fr_1fr] md:items-center">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            — More shipping soon
          </p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            We have a lot planned.<br />
            <span className="text-foreground/70">Newsletter subscribers hear it first.</span>
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            New kits, deeper AI integrations, things we're not ready to announce. Drop your email — we send when something ships, never spam.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href="/#waitlist"
            className="group inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-lg transition-all hover:scale-[1.01] hover:bg-primary/90"
          >
            <Mail className="h-4 w-4" />
            Subscribe to the newsletter
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/changelog"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary/60"
          >
            See what we shipped this week →
          </Link>
        </div>
      </div>
    </section>
  )
}
