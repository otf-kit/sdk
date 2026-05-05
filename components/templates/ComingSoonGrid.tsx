'use client'

import { useMemo, useState } from 'react'
import { Mail } from 'lucide-react'
import { soonTemplates } from '@/data/templates/list'

const filters = ['All', 'SaaS', 'Mobile', 'Services', 'Events', 'Directory', 'Creator'] as const
type Filter = typeof filters[number]

export function ComingSoonGrid() {
  const [active, setActive] = useState<Filter>('All')

  const visible = useMemo(
    () => (active === 'All' ? soonTemplates : soonTemplates.filter((t) => t.category === active)),
    [active],
  )

  const counts = useMemo(() => {
    const m: Record<Filter, number> = { All: soonTemplates.length, SaaS: 0, Mobile: 0, Services: 0, Events: 0, Directory: 0, Creator: 0 }
    soonTemplates.forEach((t) => { m[t.category as Filter] = (m[t.category as Filter] ?? 0) + 1 })
    return m
  }, [])

  // Hide categories with zero coming-soon entries to keep the bar clean.
  const activeFilters = filters.filter((f) => counts[f] > 0)

  return (
    <section className="space-y-6">
      {/* Section header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            — Coming next
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Vote with the waitlist.
          </h2>
          <p className="mt-2 max-w-xl text-muted-foreground">
            What ships next is decided by the kits with the most waitlist signups. Pick the one you'd buy.
          </p>
        </div>
      </div>

      {/* Category filter pills */}
      <div className="flex flex-wrap items-center gap-1.5">
        {activeFilters.map((f) => {
          const isActive = active === f
          return (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`flex shrink-0 items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
                isActive
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border bg-secondary/40 text-muted-foreground hover:border-border/80 hover:text-foreground'
              }`}
            >
              {f}
              <span className="font-mono text-[10px] opacity-60">{counts[f]}</span>
            </button>
          )
        })}
      </div>

      {/* 3-col grid of compressed cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((t) => (
          <div
            key={t.name}
            className="group relative flex flex-col gap-3 overflow-hidden rounded-xl border border-border bg-card p-5 transition-all hover:border-border/80"
          >
            {/* Accent dot */}
            <span className="absolute right-5 top-5 h-2 w-2 rounded-full" style={{ background: t.accent, opacity: 0.5 }} aria-hidden />

            <div className="flex items-center gap-2">
              <span className="rounded-full border border-border bg-secondary/60 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
                Soon
              </span>
              <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground/60">
                {t.platform}
              </span>
            </div>

            <div>
              <h3 className="font-semibold text-foreground">{t.name}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">{t.subtitle}</p>
            </div>

            <ul className="mt-1 space-y-1.5">
              {t.highlights.slice(0, 2).map((h) => (
                <li key={h} className="flex items-start gap-2 text-xs text-muted-foreground/85">
                  <span className="mt-1 inline-block h-1 w-1 shrink-0 rounded-full bg-muted-foreground/40" />
                  <span className="line-clamp-1">{h}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto flex items-center justify-between border-t border-border pt-3">
              <span className="font-mono text-[11px] text-muted-foreground/70">{t.price} expected</span>
              <a
                href="/#waitlist"
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-secondary/40 px-2.5 py-1 text-xs font-medium text-foreground/85 transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
              >
                <Mail className="h-3 w-3" />
                Vote
              </a>
            </div>
          </div>
        ))}
      </div>

      {visible.length === 0 && (
        <div className="rounded-xl border border-border bg-card/40 p-8 text-center text-sm text-muted-foreground">
          No coming-soon kits in this category yet. Check back as new ones get scoped.
        </div>
      )}
    </section>
  )
}
