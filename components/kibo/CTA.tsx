'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { GithubIcon as Github } from './icons'

type FormState = 'idle' | 'loading' | 'success' | 'error'

export function CTA() {
  const [formState, setFormState] = useState<FormState>('idle')
  const [name,     setName]     = useState('')
  const [email,    setEmail]    = useState('')
  const [building, setBuilding] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setFormState('loading')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, building }),
      })
      setFormState(res.ok ? 'success' : 'error')
    } catch {
      setFormState('error')
    }
  }

  return (
    <section id="waitlist" className="border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-10 sm:p-16">
          {/* Aurora background */}
          <div className="absolute inset-0 bg-cta-aurora bg-pan-slow opacity-80" aria-hidden />
          <div className="absolute inset-0 bg-gradient-to-b from-card/40 via-transparent to-card/80" aria-hidden />
          <div className="absolute inset-0 dot-bg opacity-20" aria-hidden />

          <div className="relative mx-auto max-w-2xl text-center">
            <p className="font-mono text-xs uppercase tracking-widest text-primary mb-3">Early Access</p>
            <h2 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              Be the first to ship with OTF.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Join the waitlist for early access pricing, sneak previews, and a Slack invite when new kits drop.
            </p>

            {formState === 'success' ? (
              <div className="mt-8 rounded-xl border border-primary/20 bg-primary/5 p-8">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 bg-primary/10">
                  <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-foreground font-bold text-xl mb-2">You&apos;re on the list!</p>
                <p className="text-muted-foreground">We&apos;ll reach out when new kits launch. Keep building.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-3 text-left">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground" htmlFor="cta-name">First name</label>
                    <input id="cta-name" type="text" required value={name} onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="w-full rounded-md border border-border bg-background/60 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-primary/60 backdrop-blur-sm" />
                  </div>
                  <div>
                    <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground" htmlFor="cta-email">Email address</label>
                    <input id="cta-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full rounded-md border border-border bg-background/60 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-primary/60 backdrop-blur-sm" />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground" htmlFor="cta-building">What are you building?</label>
                  <select id="cta-building" value={building} onChange={(e) => setBuilding(e.target.value)}
                    className="w-full rounded-md border border-border bg-background/60 px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary/60 backdrop-blur-sm">
                    <option value="">Select one…</option>
                    <option value="saas">SaaS</option>
                    <option value="mobile">Mobile App</option>
                    <option value="marketplace">Marketplace</option>
                    <option value="ecommerce">E-commerce</option>
                    <option value="ai">AI App</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                {formState === 'error' && <p className="text-sm text-destructive">Something went wrong. Please try again.</p>}
                <button type="submit" disabled={formState === 'loading'}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[0_8px_24px_-8px_rgba(249,115,22,0.6)] transition-all hover:scale-[1.02] hover:shadow-[0_12px_32px_-8px_rgba(249,115,22,0.7)] disabled:cursor-not-allowed disabled:opacity-60">
                  {formState === 'loading' ? 'Joining…' : <>Join the waitlist <ArrowRight className="h-4 w-4" /></>}
                </button>
                <p className="text-center font-mono text-[10px] text-muted-foreground">No spam. Unsubscribe anytime.</p>
              </form>
            )}

            {/* Secondary links */}
            <div className="mt-8 flex items-center justify-center gap-3">
              <a href="/components" className="inline-flex items-center gap-1.5 rounded-md border border-border bg-secondary/40 px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary">
                Browse components
              </a>
              <a href="https://github.com/open-template-forest" target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-secondary/40 px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary">
                <Github className="h-4 w-4" /> GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
