'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Check, ChevronRight, Code2, Copy, Eye, Maximize2, Search, Sparkles, Wrench, Zap } from 'lucide-react'
import { components, componentBySlug, type ComponentMeta } from '@/data/component-registry'
import { examples } from '@/data/component-examples'

type Props = { slug: string }

export function ComponentDetail({ slug }: Props) {
  const meta    = componentBySlug(slug)
  const example = examples[slug]

  const [tab,     setTab]     = useState<'preview' | 'code'>('preview')
  const [copied,  setCopied]  = useState(false)
  const [filter,  setFilter]  = useState('')
  const sidebarRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    sidebarRef.current?.scrollIntoView({ block: 'nearest' })
    setTab('preview')
    window.scrollTo({ top: 0 })
  }, [slug])

  const filteredComponents = useMemo(() => {
    const q = filter.trim().toLowerCase()
    if (!q) return components
    return components.filter((c) => c.name.toLowerCase().includes(q) || c.tags.some((t) => t.includes(q)))
  }, [filter])

  const currentIdx = components.findIndex((c) => c.slug === slug)
  const prev = currentIdx > 0 ? components[currentIdx - 1] : null
  const next = currentIdx < components.length - 1 ? components[currentIdx + 1] : null

  const handleCopy = () => {
    if (!example) return
    navigator.clipboard.writeText(example.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  if (!meta) {
    return (
      <div className="flex flex-1 items-center justify-center py-32 text-center">
        <div>
          <p className="text-sm text-muted-foreground">Component not found</p>
          <Link href="/components" className="mt-3 inline-block text-sm font-medium text-primary hover:underline">
            ← Back to components
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto flex max-w-7xl gap-8 px-4 py-8 sm:px-6">
      {/* ── Sidebar ─────────────────────────────────────────────────────── */}
      <aside className="sticky top-24 hidden h-[calc(100vh-7rem)] w-60 shrink-0 flex-col gap-3 lg:flex">
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
          Components ({filteredComponents.length})
        </div>
        <nav className="flex-1 overflow-y-auto pb-6 [scrollbar-width:thin]">
          {filteredComponents.map((c) => {
            const active = c.slug === slug
            return (
              <Link
                key={c.slug}
                ref={active ? sidebarRef : null}
                href={`/components/${c.slug}`}
                className={`flex items-center justify-between rounded-md px-2.5 py-1.5 text-sm transition-colors ${
                  active ? 'bg-primary/15 text-primary' : 'text-foreground/75 hover:bg-secondary hover:text-foreground'
                }`}
              >
                <span>{c.name}</span>
                {c.hasExample && (
                  <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(249,115,22,0.7)]" title="Live demo available" />
                )}
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* ── Main ────────────────────────────────────────────────────────── */}
      <main className="flex min-w-0 flex-1 flex-col gap-8 pb-20">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/components" className="hover:text-foreground">Components</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">{meta.name}</span>
        </nav>

        {/* Header */}
        <header>
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{meta.name}</h1>
            <span className="rounded-md border border-border bg-secondary/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              {meta.category}
            </span>
          </div>
          <p className="mt-3 max-w-2xl text-base text-muted-foreground">{meta.description}</p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {meta.tags.map((t) => (
              <span key={t} className="rounded-full border border-border bg-secondary/30 px-2 py-0.5 font-mono text-[10px] text-muted-foreground">#{t}</span>
            ))}
            <a
              href={`https://otf-storybook.pages.dev/?path=/docs/${meta.slug}`}
              target="_blank"
              rel="noreferrer"
              className="ml-auto inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
            >
              View in Storybook <Zap className="h-3 w-3" />
            </a>
          </div>
        </header>

        {/* Preview / Code tabs */}
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-lg">
          <div className="flex items-center justify-between border-b border-border bg-secondary/30 px-3 py-2">
            <div className="flex gap-1">
              <button onClick={() => setTab('preview')}
                className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${tab === 'preview' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>
                <Eye className="h-3 w-3" /> Preview
              </button>
              <button onClick={() => setTab('code')}
                className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${tab === 'code' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>
                <Code2 className="h-3 w-3" /> Code
              </button>
            </div>
            <div className="flex items-center gap-1">
              {tab === 'code' && (
                <button onClick={handleCopy}
                  className="flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs text-muted-foreground hover:bg-secondary hover:text-foreground">
                  {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              )}
              {tab === 'preview' && (
                <span className="flex items-center gap-1 font-mono text-[10px] text-muted-foreground/60">
                  <Sparkles className="h-3 w-3 text-primary" />
                  live
                </span>
              )}
            </div>
          </div>

          {tab === 'preview' ? (
            <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden bg-pattern-grid p-6 sm:p-10">
              <div className="absolute inset-0 bg-gradient-to-b from-background/20 to-background/60" aria-hidden />
              <div className="relative z-10 flex w-full items-center justify-center">
                {example
                  ? <example.Demo />
                  : <ComingSoon meta={meta} />
                }
              </div>
            </div>
          ) : (
            <pre className="max-h-[480px] overflow-x-auto bg-[#0d0d0d] p-5 font-mono text-xs leading-relaxed">
              <code className="text-foreground/90 whitespace-pre">
                {example?.code ?? generateCodeStub(meta)}
              </code>
            </pre>
          )}
        </div>

        {/* Installation */}
        <section>
          <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Installation</h3>
          <InstallSnippet slug={meta.slug} />
        </section>

        {/* Import */}
        <section>
          <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Import</h3>
          <div className="mt-3 rounded-md border border-border bg-card/80 px-4 py-2.5 font-mono text-sm">
            <span className="text-primary">import</span>
            {' { '}<span className="text-foreground">{meta.name.replace(/\s+/g, '')}</span>{' } '}
            <span className="text-primary">from</span>
            {' '}<span className="text-emerald-400">&apos;@otf/ui&apos;</span>
          </div>
        </section>

        {/* Prev / Next */}
        <nav className="grid gap-3 border-t border-border pt-8 sm:grid-cols-2">
          {prev ? (
            <Link href={`/components/${prev.slug}`}
              className="group flex flex-col rounded-lg border border-border bg-card/40 p-4 transition-colors hover:border-primary/40 hover:bg-card">
              <span className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" /> Previous
              </span>
              <span className="mt-1 font-medium">{prev.name}</span>
            </Link>
          ) : <div />}
          {next ? (
            <Link href={`/components/${next.slug}`}
              className="group flex flex-col items-end rounded-lg border border-border bg-card/40 p-4 text-right transition-colors hover:border-primary/40 hover:bg-card sm:col-start-2">
              <span className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Next <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </span>
              <span className="mt-1 font-medium">{next.name}</span>
            </Link>
          ) : null}
        </nav>
      </main>
    </div>
  )
}

// ── Install snippet with copy ─────────────────────────────────────────────────
function InstallSnippet({ slug }: { slug: string }) {
  const [copied, setCopied] = useState(false)
  const cmd = `pnpm dlx shadcn@latest add https://otf.sh/r/${slug}.json`
  return (
    <div className="mt-3 flex items-center gap-3 rounded-md border border-border bg-card/80 px-4 py-2.5 font-mono text-sm shadow-md">
      <span className="text-muted-foreground">$</span>
      <span className="flex-1 truncate">{cmd}</span>
      <button
        onClick={() => { navigator.clipboard.writeText(cmd); setCopied(true); setTimeout(() => setCopied(false), 1500) }}
        className="flex h-6 w-6 items-center justify-center rounded text-muted-foreground hover:bg-secondary hover:text-foreground"
        aria-label="Copy install command"
      >
        {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
      </button>
    </div>
  )
}

// ── Coming soon state ─────────────────────────────────────────────────────────
function ComingSoon({ meta }: { meta: ComponentMeta }) {
  const initials = meta.name.split(' ').map((w) => w[0]).slice(0, 2).join('')
  return (
    <div className="relative w-full max-w-2xl">
      <div className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)', backgroundSize: '20px 20px' }} aria-hidden />
      <div className="relative grid w-full gap-6 sm:grid-cols-[auto_1fr]">
        <div className="flex shrink-0 items-start">
          <div className="relative">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-border bg-card font-mono text-2xl font-semibold uppercase tracking-tight text-muted-foreground shadow-lg"
              style={{ animation: 'comingFloat 4s ease-in-out infinite' }}>
              {initials}
            </div>
            <div className="pointer-events-none absolute -inset-1.5 rounded-2xl border border-primary/40"
              style={{ animation: 'comingPulse 2.4s ease-in-out infinite' }} aria-hidden />
            <div className="absolute -bottom-1.5 -right-1.5 flex h-7 w-7 items-center justify-center rounded-full border border-border bg-primary text-primary-foreground shadow-md">
              <Wrench className="h-3.5 w-3.5" strokeWidth={2.25} />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary">
              <Sparkles className="h-3 w-3" strokeWidth={2.25} /> In progress
            </span>
            <span className="rounded-full border border-border bg-secondary/60 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              {meta.category}
            </span>
          </div>
          <div>
            <h3 className="text-xl font-semibold tracking-tight">{meta.name} preview</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              We&apos;re polishing the live demo. The code snippet and install command below are ready — copy and paste into your project.
            </p>
          </div>
          <div className="flex flex-col gap-2 rounded-lg border border-border bg-card/60 p-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-muted-foreground/30" style={{ animation: 'comingSkel 1.6s ease-in-out infinite' }} />
              <span className="h-2 w-2 rounded-full bg-muted-foreground/30" style={{ animation: 'comingSkel 1.6s ease-in-out 0.2s infinite' }} />
              <span className="h-2 w-2 rounded-full bg-muted-foreground/30" style={{ animation: 'comingSkel 1.6s ease-in-out 0.4s infinite' }} />
              <span className="ml-auto font-mono text-[10px] text-muted-foreground/70">building.tsx</span>
            </div>
            <div className="space-y-2 pt-2">
              <div className="h-2.5 w-3/4 rounded bg-gradient-to-r from-muted-foreground/20 via-primary/30 to-muted-foreground/20 bg-[length:200%_100%]" style={{ animation: 'comingShimmer 1.8s linear infinite' }} />
              <div className="h-2.5 w-1/2 rounded bg-gradient-to-r from-muted-foreground/20 via-primary/30 to-muted-foreground/20 bg-[length:200%_100%]" style={{ animation: 'comingShimmer 1.8s linear 0.2s infinite' }} />
              <div className="h-2.5 w-5/6 rounded bg-gradient-to-r from-muted-foreground/20 via-primary/30 to-muted-foreground/20 bg-[length:200%_100%]" style={{ animation: 'comingShimmer 1.8s linear 0.4s infinite' }} />
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 self-start rounded-md border border-border bg-secondary/40 px-3 py-1.5 text-xs text-muted-foreground">
            Code &amp; install ready below ↓
          </span>
        </div>
      </div>

      <style>{`
        @keyframes comingFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes comingPulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0; transform: scale(1.06); }
        }
        @keyframes comingSkel {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        @keyframes comingShimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  )
}

// ── Code stub for components without examples ─────────────────────────────────
function generateCodeStub(meta: ComponentMeta): string {
  const pascal = meta.name.replace(/\s+/g, '')
  return `// ${meta.name} — ${meta.description}
import { ${pascal} } from '@otf/ui'

export function Example() {
  return (
    <${pascal}
      // ${meta.tags.map((t) => `${t}`).join(', ')}
    >
      {/* your content */}
    </${pascal}>
  )
}

// Install via shadcn CLI:
// pnpm dlx shadcn@latest add https://otf.sh/r/${meta.slug}.json
//
// Or install the full SDK:
// pnpm add @otf/ui`
}
