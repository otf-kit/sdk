'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Check, ExternalLink } from 'lucide-react'
import type { TemplateListEntry } from '@/data/templates/list'
import { LiveIframePreview } from './LiveIframePreview'

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

export function LiveKitCard({ template }: { template: TemplateListEntry }) {
  const [purchasing, setPurchasing] = useState(false)
  const accent = template.accent

  return (
    <article
      className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 hover:border-border/80 hover:shadow-[0_0_60px_-20px_rgba(249,115,22,0.18)]"
      style={{
        // Soft accent vignette in the corner — adds visual identity per kit
        // without overpowering the preview content.
        backgroundImage: `radial-gradient(circle at 100% 0%, ${accent}10, transparent 35%), radial-gradient(circle at 0% 100%, ${accent}06, transparent 35%)`,
      }}
    >
      <div className="grid lg:grid-cols-12">
        {/* ── Preview side (60%) — actual live demo iframe ────────────── */}
        <div className="lg:col-span-7">
          <LiveIframePreview template={template} />
        </div>

        {/* ── Info side (40%) ──────────────────────────────────────────── */}
        <div className="flex flex-col gap-5 border-t border-border p-6 sm:p-8 lg:col-span-5 lg:border-t-0">
          {/* Title block */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                Live
              </span>
              <span className="rounded-full border border-border bg-secondary/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                {template.platform}
              </span>
              <span className="rounded-full border border-border bg-secondary/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                {template.screens} screens
              </span>
            </div>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {template.name}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {template.subtitle}
            </p>
          </div>

          {/* What's wired — 3 bullets */}
          <ul className="space-y-2">
            {template.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2.5 text-sm">
                <span
                  className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                  style={{ background: `${accent}1f`, color: accent }}
                >
                  <Check className="h-2.5 w-2.5" strokeWidth={3} />
                </span>
                <span className="text-foreground/85">{h}</span>
              </li>
            ))}
          </ul>

          {/* Example prompt — terminal-style */}
          <div className="rounded-lg border border-border bg-secondary/30 px-3 py-2.5">
            <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground/70">
              Example prompt
            </p>
            <p className="mt-1.5 font-mono text-xs italic leading-relaxed text-foreground/80">
              {template.claudePrompt}
            </p>
          </div>

          {/* Price + CTAs — pinned to bottom of card */}
          <div className="mt-auto flex flex-col gap-3 pt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-foreground">{template.price}</span>
              <span className="font-mono text-xs text-muted-foreground">one-time · 12mo updates</span>
            </div>
            <div className="flex gap-2">
              {template.kitSlug ? (
                <button
                  onClick={async () => { setPurchasing(true); await startCheckout(template.kitSlug!); setPurchasing(false) }}
                  disabled={purchasing}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-bold text-white shadow-lg transition-all hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
                  style={{ background: accent, boxShadow: `0 8px 28px -8px ${accent}66` }}
                >
                  {purchasing ? (
                    <>
                      <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Redirecting…
                    </>
                  ) : (
                    <>Get this kit — {template.price}</>
                  )}
                </button>
              ) : null}

              {template.detailSlug ? (
                <Link
                  href={`/templates/${template.detailSlug}`}
                  className="flex items-center justify-center gap-1.5 rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary/60"
                >
                  Details <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              ) : null}

              {template.demoUrl ? (
                <a
                  href={template.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 rounded-lg border border-border bg-card px-3 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary/60"
                  aria-label="Open live demo in new tab"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
