'use client'

import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, ChevronRight, Eye, ExternalLink, FileText, Search, Smartphone } from 'lucide-react'
import { templateList, getTemplateListEntry, type TemplateListEntry } from '@/data/templates/list'
import { getTemplate } from '@/data/templates'
import { CheckoutButton } from './CheckoutButton'
import type { TemplateConfig } from '@/lib/template-config'

type Props = { slug: string }

export function TemplateDetail({ slug }: Props) {
  const meta   = getTemplateListEntry(slug)
  const config = getTemplate(slug)

  const [tab,    setTab]    = useState<'preview' | 'details'>('preview')
  const [filter, setFilter] = useState('')
  const sidebarRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    sidebarRef.current?.scrollIntoView({ block: 'nearest' })
    setTab('preview')
    window.scrollTo({ top: 0 })
  }, [slug])

  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase()
    if (!q) return templateList
    return templateList.filter((t) => t.name.toLowerCase().includes(q) || t.platform.toLowerCase().includes(q) || t.category.toLowerCase().includes(q))
  }, [filter])

  // Prev / Next — only across LIVE templates (skip "soon")
  const liveOnly  = templateList.filter((t) => t.detailSlug)
  const currentIdx = liveOnly.findIndex((t) => t.detailSlug === slug)
  const prev = currentIdx > 0 ? liveOnly[currentIdx - 1] : null
  const next = currentIdx < liveOnly.length - 1 ? liveOnly[currentIdx + 1] : null

  if (!meta) {
    // Unknown slug — show coming-soon shell
    return (
      <ShellWithSidebar slug={slug} filter={filter} setFilter={setFilter} filtered={filtered} sidebarRef={sidebarRef} placeholderName={slug.replace(/-/g, ' ')}>
        <ComingSoonCard name={slug.replace(/-/g, ' ')} />
      </ShellWithSidebar>
    )
  }

  return (
    <ShellWithSidebar slug={slug} filter={filter} setFilter={setFilter} filtered={filtered} sidebarRef={sidebarRef} currentName={meta.name}>
      {/* Tabs container */}
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-lg">
        <div className="flex items-center justify-between border-b border-border bg-secondary/30 px-3 py-2">
          <div className="flex gap-1">
            <button onClick={() => setTab('preview')}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                tab === 'preview' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
              }`}>
              <Eye className="h-3 w-3" /> Preview
            </button>
            <button onClick={() => setTab('details')}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                tab === 'details' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
              }`}>
              <FileText className="h-3 w-3" /> Details
            </button>
          </div>
          <div className="flex items-center gap-1">
            {meta.demoUrl && (
              <a
                href={meta.demoUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Open live demo in a new tab"
                className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground sm:px-2.5"
              >
                <span className="hidden sm:inline">Open live demo</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
        </div>

        {tab === 'preview' ? (
          <PreviewIframe meta={meta} />
        ) : config ? (
          <DetailsContent config={config} meta={meta} />
        ) : (
          <ComingSoonCard name={meta.name} />
        )}
      </div>

      {/* Sticky CTA strip — only on live kits with kitSlug */}
      {meta.kitSlug && config && (
        <section className="rounded-xl border border-primary/20 bg-primary/[0.04] p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <div>
              <h3 className="text-lg font-semibold tracking-tight text-foreground">
                Get the {meta.name} — {meta.price}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                One-time payment · 12 months of updates · MIT-licensed SDK included · 14-day refund.
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Link
                href="/pricing"
                className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                Bundle deal
              </Link>
              <CheckoutButton
                kitSlug={meta.kitSlug}
                label={`Get this kit — ${meta.price}`}
                className="rounded-md bg-primary px-4 py-2 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
              />
            </div>
          </div>
        </section>
      )}

      {/* Prev / Next — only between live kits */}
      {(prev || next) && (
        <nav className="grid gap-3 border-t border-border pt-8 sm:grid-cols-2">
          {prev ? (
            <Link href={`/templates/${prev.detailSlug}`}
              className="group flex flex-col rounded-lg border border-border bg-card/40 p-4 transition-colors hover:border-primary/40 hover:bg-card">
              <span className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" /> Previous
              </span>
              <span className="mt-1 font-medium">{prev.name}</span>
            </Link>
          ) : <div />}
          {next ? (
            <Link href={`/templates/${next.detailSlug}`}
              className="group flex flex-col items-end rounded-lg border border-border bg-card/40 p-4 text-right transition-colors hover:border-primary/40 hover:bg-card sm:col-start-2">
              <span className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Next <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </span>
              <span className="mt-1 font-medium">{next.name}</span>
            </Link>
          ) : null}
        </nav>
      )}
    </ShellWithSidebar>
  )
}

// ── Shell ────────────────────────────────────────────────────────────────────
function ShellWithSidebar({
  slug, filter, setFilter, filtered, sidebarRef, children, currentName, placeholderName,
}: {
  slug: string
  filter: string
  setFilter: (v: string) => void
  filtered: TemplateListEntry[]
  sidebarRef: React.RefObject<HTMLAnchorElement | null>
  children: React.ReactNode
  currentName?: string
  placeholderName?: string
}) {
  const displayName = currentName ?? placeholderName ?? slug
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="flex gap-8">
        {/* Sidebar */}
        <aside className="sticky top-24 hidden h-[calc(100vh-7rem)] w-72 shrink-0 flex-col gap-3 lg:flex">
          <nav className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/templates" className="hover:text-foreground">Templates</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="truncate text-foreground capitalize">{displayName}</span>
          </nav>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Filter..."
              className="w-full rounded-md border border-border bg-secondary/40 py-1.5 pl-8 pr-2.5 text-sm outline-none focus:border-primary/40"
            />
          </div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Templates ({filtered.length})
          </div>
          <nav className="flex-1 overflow-y-auto pb-6 [scrollbar-width:thin]">
            {filtered.map((t) => {
              const active = t.detailSlug === slug
              const disabled = t.status === 'soon'
              const Wrapper = disabled ? 'div' : Link
              return (
                <Wrapper
                  key={t.name}
                  // @ts-expect-error — Wrapper is conditionally a div or Link
                  ref={active ? sidebarRef : null}
                  // @ts-expect-error — href only on Link
                  href={!disabled ? `/templates/${t.detailSlug}` : undefined}
                  className={`flex items-center justify-between rounded-md px-2.5 py-1.5 text-sm transition-colors ${
                    active
                      ? 'bg-primary/15 text-primary'
                      : disabled
                        ? 'cursor-not-allowed text-muted-foreground/50'
                        : 'text-foreground/75 hover:bg-secondary hover:text-foreground'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: disabled ? 'currentColor' : t.accent, opacity: disabled ? 0.4 : 1 }} aria-hidden />
                    <span className="flex-1">{t.name}</span>
                  </span>
                  {disabled ? (
                    <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground/40">Soon</span>
                  ) : (
                    <span className="font-mono text-[10px] text-muted-foreground/70">{t.price}</span>
                  )}
                </Wrapper>
              )
            })}
          </nav>
        </aside>

        {/* Main */}
        <main className="flex min-w-0 flex-1 flex-col gap-8 pb-20">{children}</main>
      </div>
    </div>
  )
}

// ── Preview iframe — desktop with browser chrome OR phone-frame embed ──────
function PreviewIframe({ meta }: { meta: TemplateListEntry }) {
  const [loaded, setLoaded] = useState(false)
  const url = meta.previewUrl ?? meta.demoUrl
  if (!url) return <ComingSoonCard name={meta.name} />

  // Phone-shape kits: the previewUrl is already a phone-frame shell, so embed
  // edge-to-edge over the dotted grid bg (same pattern the components page uses).
  if (meta.previewShape === 'phone') {
    return (
      <div
        className="relative w-full bg-pattern-grid"
        style={{ height: 'clamp(560px, calc(100vh - 11rem), 860px)' }}
      >
        {!loaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-muted-foreground">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <span className="font-mono text-xs">Loading phone preview…</span>
          </div>
        )}
        <iframe
          src={url}
          title={`${meta.name} preview`}
          onLoad={() => setLoaded(true)}
          allow="accelerometer; autoplay; camera; clipboard-write; encrypted-media; fullscreen; geolocation; gyroscope; payment"
          className="h-full w-full border-0"
          style={{ background: 'transparent', transition: 'opacity 0.3s ease', opacity: loaded ? 1 : 0 }}
        />
      </div>
    )
  }

  // Desktop kits: wrap the live demo in a browser-chrome shell — traffic lights,
  // URL pill, refresh — so the embed reads as "real product window" not "raw iframe".
  const hostname = url.replace(/^https?:\/\//, '').replace(/\/$/, '')
  return (
    <div
      className="relative flex w-full flex-col overflow-hidden bg-pattern-grid"
      style={{ height: 'clamp(620px, calc(100vh - 11rem), 920px)' }}
    >
      {/* Browser chrome */}
      <div className="flex h-9 shrink-0 items-center gap-2 border-b border-border bg-secondary/40 px-3">
        <div className="flex shrink-0 gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/60" />
        </div>
        <div className="flex flex-1 justify-center">
          <div className="flex max-w-md items-center gap-2 truncate rounded-md border border-border bg-background/60 px-3 py-0.5 font-mono text-[11px] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/70" aria-hidden />
            <span className="truncate">{hostname}</span>
          </div>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          aria-label="Open in new tab"
          className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>

      {/* Live iframe */}
      <div className="relative flex-1">
        {!loaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-card text-muted-foreground">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <span className="font-mono text-xs">Loading {meta.name}…</span>
          </div>
        )}
        <iframe
          src={url}
          title={`${meta.name} preview`}
          onLoad={() => setLoaded(true)}
          allow="accelerometer; autoplay; camera; clipboard-write; encrypted-media; fullscreen; geolocation; gyroscope; payment"
          className="h-full w-full border-0"
          style={{ background: 'transparent', transition: 'opacity 0.3s ease', opacity: loaded ? 1 : 0 }}
        />
      </div>
    </div>
  )
}

// ── Coming Soon card ────────────────────────────────────────────────────────
function ComingSoonCard({ name }: { name: string }) {
  return (
    <div className="relative flex min-h-[420px] items-center justify-center overflow-hidden bg-pattern-grid p-6 sm:p-10">
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 to-background/60" aria-hidden />
      <div className="relative z-10 flex flex-col items-center gap-4 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground">
          <Smartphone className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground capitalize">{name}</h2>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            This kit is on the roadmap. Subscribe to the newsletter to be the first to know when it ships.
          </p>
        </div>
        <Link
          href="/#waitlist"
          className="rounded-md bg-primary px-4 py-2 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Join waitlist →
        </Link>
      </div>
    </div>
  )
}

// ── Details tab — rich kit info ─────────────────────────────────────────────
function DetailsContent({ config, meta }: { config: TemplateConfig; meta: TemplateListEntry }) {
  return (
    <div className="flex flex-col gap-8 p-6 sm:p-8">
      {/* Title row */}
      <div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{config.name}</h1>
          <span className="rounded-md border border-border bg-secondary/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {meta.platform}
          </span>
          <span className="rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-emerald-400">
            Live
          </span>
          <span className="ml-auto text-2xl font-black text-foreground">{meta.price}</span>
        </div>
        <p className="mt-3 max-w-2xl text-base text-muted-foreground">{config.hero.description}</p>
      </div>

      {/* Quick stats grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Screens',        value: String(meta.screens) },
          { label: 'Stack',          value: meta.platform },
          { label: 'License',        value: 'Per-developer' },
          { label: 'Updates',        value: '12 months' },
        ].map((s) => (
          <div key={s.label} className="rounded-md border border-border bg-secondary/30 px-3 py-2.5">
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{s.label}</div>
            <div className="mt-1 text-sm font-semibold text-foreground truncate">{s.value}</div>
          </div>
        ))}
      </div>

      {/* What's included */}
      <section>
        <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">What&rsquo;s included</h3>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {config.components.items.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-foreground/85">
              <span className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Tech stack */}
      <section>
        <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{config.techStack.title}</h3>
        {config.techStack.description && (
          <p className="mt-2 text-sm text-muted-foreground">{config.techStack.description}</p>
        )}
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {config.techStack.items.map((item) => (
            <div key={item.title} className="flex items-start gap-3 rounded-md border border-border bg-card/40 p-3">
              <img src={item.icon} alt={item.title} width={24} height={24} className="mt-0.5 shrink-0 opacity-90" />
              <div className="min-w-0">
                <div className="text-sm font-semibold text-foreground">{item.title}</div>
                <div className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AI tools */}
      {config.claudeCursor && (
        <section className="rounded-md border border-border bg-secondary/20 p-5">
          <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{config.claudeCursor.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-foreground/85">{config.claudeCursor.description}</p>
          {config.claudeCursor.description2 && (
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{config.claudeCursor.description2}</p>
          )}
        </section>
      )}
    </div>
  )
}
