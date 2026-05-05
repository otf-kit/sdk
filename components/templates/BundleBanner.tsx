'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { liveTemplates } from '@/data/templates/list'

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

export function BundleBanner() {
  const [purchasing, setPurchasing] = useState(false)

  return (
    <section className="relative overflow-hidden rounded-2xl border border-primary/30 bg-foreground text-background shadow-xl">
      {/* Animated sweep */}
      <div
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-primary/15 to-transparent transition-transform duration-1000"
        style={{ animation: 'bundle-sweep 6s ease-in-out infinite' }}
        aria-hidden
      />
      <div className="relative grid gap-6 p-8 sm:p-10 lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-10">
        {/* Stacked kit thumbnails */}
        <div className="hidden lg:flex">
          <div className="flex -space-x-4">
            {liveTemplates.map((t, i) => (
              <div
                key={t.name}
                className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 shadow-lg ring-2 ring-foreground/40"
                style={{
                  background: t.accent,
                  borderColor: 'rgb(var(--background))',
                  zIndex: liveTemplates.length - i,
                }}
              >
                <span className="text-2xl font-black text-white">
                  {t.name.charAt(0)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Copy */}
        <div className="min-w-0">
          <p className="font-mono text-xs uppercase tracking-widest text-background/60">
            — Starter Bundle
          </p>
          <h3 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Get both kits — save $49.
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-background/70 sm:text-base">
            SaaS Dashboard Kit + Fitness & Wellness Kit. One payment, ship both. Web + native + AI configs included.
          </p>
        </div>

        {/* CTA */}
        <div className="flex shrink-0 flex-col items-stretch gap-2 sm:flex-row sm:items-center lg:flex-col lg:items-end">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black">$249</span>
            <span className="text-xl text-background/40 line-through">$298</span>
          </div>
          <button
            onClick={async () => { setPurchasing(true); await startCheckout('starter-bundle'); setPurchasing(false) }}
            disabled={purchasing}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-background px-5 py-3 text-sm font-bold text-foreground shadow-lg transition-all hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {purchasing ? (
              <>
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-foreground/30 border-t-foreground" />
                Redirecting…
              </>
            ) : (
              <>Get the bundle <ArrowRight className="h-3.5 w-3.5" /></>
            )}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes bundle-sweep {
          0%   { transform: translateX(-100%); }
          50%  { transform: translateX(100%); }
          100% { transform: translateX(100%); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="bundle-sweep"] { animation: none !important; }
        }
      `}</style>
    </section>
  )
}
