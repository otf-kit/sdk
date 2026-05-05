'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'

async function startCheckout(kitSlug: string): Promise<void> {
  const res = await fetch('/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ kit: kitSlug }),
  })
  const { url, error } = await res.json()
  if (error || !url) { alert(`Checkout error: ${error ?? 'Please try again'}`); return }
  window.location.href = url
}

type Tier = {
  name: string
  price: string
  oldPrice?: string
  period: string
  description: string
  badge?: string
  features: string[]
  cta: string
  href: string
  kitSlug?: string
  highlight: boolean
  external?: boolean
  soon?: boolean
}

const tiers: Tier[] = [
  {
    name: 'Free SDK',
    price: '$0',
    period: 'forever',
    description: 'Everything you need to build beautiful UIs.',
    features: [
      '180+ UI components',
      '5 design themes (dark + light)',
      'Full TypeScript source',
      'MIT license',
      'AI configs (Cursor, Claude, Lovable)',
      'Community support',
    ],
    cta: 'Get on GitHub →',
    href: 'https://github.com/open-template-forest',
    highlight: false,
    external: true,
  },
  {
    name: 'Starter Bundle',
    price: '$249',
    oldPrice: '$298',
    period: 'both kits',
    description: 'Fitness Kit + SaaS Dashboard Kit. One payment, ship everything.',
    badge: 'Best value',
    features: [
      'OTF Fitness Kit (Expo + React Native)',
      'OTF SaaS Dashboard Kit (Vite + Hono)',
      'iOS, Android + web from one codebase',
      'Auth, payments, Postgres — all wired',
      'AI configs for Cursor, Claude & Bolt',
      'AI prompts library (40+ tested)',
      '1 year of updates on both kits',
    ],
    cta: 'Get the bundle →',
    href: '/api/checkout',
    kitSlug: 'starter-bundle',
    highlight: true,
    external: false,
  },
  {
    name: 'All Kits Bundle',
    price: '$399',
    period: 'lifetime',
    description: 'Every kit, every update, forever.',
    features: [
      'Everything in Starter Bundle',
      'All future kits included',
      'Lifetime access — no renewal',
      'Priority support + Slack channel',
      'Early access to new kits',
    ],
    cta: 'Join waitlist →',
    href: '/#waitlist',
    highlight: false,
    external: false,
    soon: true,
  },
]

function TierCard({ tier }: { tier: Tier }) {
  const [loading, setLoading] = useState(false)

  const btnClass = `block w-full text-center px-5 py-2.5 rounded-md text-sm font-bold transition-colors ${
    tier.highlight
      ? 'bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-60 disabled:cursor-not-allowed'
      : tier.soon
      ? 'border border-border text-muted-foreground hover:text-foreground hover:border-border/60'
      : 'border border-border text-foreground hover:bg-secondary/40'
  }`

  return (
    <div className={`relative flex flex-col rounded-xl border p-6 transition-all ${
      tier.highlight
        ? 'bg-card border-primary/30 shadow-[0_0_40px_hsl(var(--primary)/0.08)]'
        : 'bg-card border-border hover:border-border/80'
    }`}>
      {tier.highlight && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-primary text-primary-foreground text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
            Most Popular
          </span>
        </div>
      )}
      {tier.badge && !tier.highlight && (
        <div className="absolute -top-3 left-4">
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold px-2.5 py-1 rounded-full">
            {tier.badge}
          </span>
        </div>
      )}

      <div className="mb-5">
        <div className="text-muted-foreground text-xs font-semibold uppercase tracking-widest mb-2">{tier.name}</div>
        <div className="flex items-baseline gap-1 mb-1">
          <span className="text-4xl font-black text-foreground">{tier.price}</span>
          {tier.oldPrice && (
            <span className="text-muted-foreground/50 text-xl line-through ml-1">{tier.oldPrice}</span>
          )}
          <span className="text-muted-foreground text-sm">/ {tier.period}</span>
        </div>
        <p className="text-muted-foreground text-sm">{tier.description}</p>
      </div>

      <ul className="space-y-2.5 mb-6 flex-1">
        {tier.features.map(f => (
          <li key={f} className="flex items-start gap-2">
            <svg className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
            </svg>
            <span className="text-foreground/75 text-sm">{f}</span>
          </li>
        ))}
      </ul>

      {tier.kitSlug ? (
        <button
          disabled={loading}
          onClick={async () => { setLoading(true); await startCheckout(tier.kitSlug!); setLoading(false) }}
          className={btnClass}
        >
          {loading ? 'Redirecting…' : tier.cta}
        </button>
      ) : (
        <Link
          href={tier.href}
          {...(tier.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className={btnClass}
        >
          {tier.cta}
        </Link>
      )}
    </div>
  )
}

interface PricingSectionProps {
  /** Hide the section eyebrow/heading — use when the page already has its own header */
  showHeader?: boolean
}

export function PricingSection({ showHeader = true }: PricingSectionProps) {
  return (
    <section className="relative overflow-hidden border-t border-border">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6">
        {showHeader && (
          <div className="mb-14 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">— Pricing</p>
              <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
                Simple, honest pricing.
              </h2>
              <p className="mt-3 max-w-xl text-muted-foreground">
                Free SDK forever. Pay once for full-stack templates — no subscriptions, no seats per month.
              </p>
            </div>
            <a
              href="#faq"
              className="group inline-flex items-center gap-2 font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Read the FAQ
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {tiers.map((tier) => <TierCard key={tier.name} tier={tier} />)}
        </div>

        <p className="text-center text-muted-foreground text-xs mt-8">
          All kit licenses are per-developer, commercial use included.{' '}
          <Link href="/pricing" className="text-foreground/70 hover:text-foreground underline transition-colors">
            Full pricing details →
          </Link>
        </p>
      </div>
    </section>
  )
}
