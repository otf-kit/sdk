'use client'

import { useEffect } from 'react'
import { Reveal } from '@/components/otf/Reveal'
import { liveTemplates, soonTemplates } from '@/data/templates/list'
import { LiveKitCard } from '@/components/templates/LiveKitCard'
import { BundleBanner } from '@/components/templates/BundleBanner'
import { ComingSoonGrid } from '@/components/templates/ComingSoonGrid'
import { DifferentiatorStrip } from '@/components/templates/DifferentiatorStrip'
import { FinalCTA } from '@/components/templates/FinalCTA'

const TRUST_PILLS = [
  'CLAUDE.md in every kit',
  'Custom domain in 90 sec',
  'One-time payment',
  '14-day refund',
  'MIT license',
]

export function TemplatesClient() {
  // Scroll to top on every mount so back-navigation always starts at the hero.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  return (
    <div className="flex-1 flex flex-col">
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-pattern-grid opacity-[0.12]" aria-hidden />
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(249,115,22,0.10) 0%, transparent 60%)' }}
          aria-hidden
        />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" aria-hidden />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24">
          <Reveal direction="up" distance={20}>
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">— Templates</p>
          </Reveal>
          <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <Reveal direction="up" distance={20} delay={60}>
              <div>
                <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                  Your AI already knows<br />
                  <span className="text-primary">this codebase.</span>
                </h1>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                  Every kit ships pre-loaded with CLAUDE.md, .cursorrules, and 20+ tested prompts. Open in Cursor, Claude, or Lovable — and just describe what to build.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {TRUST_PILLS.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border bg-secondary/40 px-3 py-1 font-mono text-xs text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal direction="up" distance={20} delay={140}>
              <div className="flex shrink-0 items-end gap-8">
                {[
                  { value: String(liveTemplates.length + soonTemplates.length), label: 'Templates' },
                  { value: String(liveTemplates.length), label: 'Live now' },
                  { value: '$149', label: 'Starting at' },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="text-3xl font-black text-foreground sm:text-4xl">{s.value}</div>
                    <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Live kits — featured ─────────────────────────────────────── */}
      <section className="relative border-b border-border">
        <div className="mx-auto max-w-7xl space-y-8 px-4 py-16 sm:px-6 sm:py-20">
          <Reveal direction="up" distance={20}>
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  — Live now
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                  Buy. Clone. Ship today.
                </h2>
              </div>
              <span className="hidden font-mono text-xs text-muted-foreground sm:inline">
                {liveTemplates.length} kits live
              </span>
            </div>
          </Reveal>

          <div className="space-y-6">
            {liveTemplates.map((t, i) => (
              <Reveal key={t.name} direction="up" distance={28} delay={i * 80}>
                <LiveKitCard template={t} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bundle banner ─────────────────────────────────────────────── */}
      <section className="relative border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
          <Reveal direction="up" distance={20}>
            <BundleBanner />
          </Reveal>
        </div>
      </section>

      {/* ── Differentiator strip ─────────────────────────────────────── */}
      <section className="relative border-b border-border bg-secondary/20">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <Reveal direction="up" distance={20}>
            <DifferentiatorStrip />
          </Reveal>
        </div>
      </section>

      {/* ── Coming soon ──────────────────────────────────────────────── */}
      <section className="relative border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <Reveal direction="up" distance={20}>
            <ComingSoonGrid />
          </Reveal>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────── */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <Reveal direction="up" distance={20}>
            <FinalCTA />
          </Reveal>
        </div>
      </section>
    </div>
  )
}
