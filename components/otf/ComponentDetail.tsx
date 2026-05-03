'use client'

import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Check, ChevronRight, Code2, Copy, ExternalLink, Eye, Search, Sparkles, Wrench } from 'lucide-react'
import { components, componentBySlug, type ComponentMeta, STORYBOOK_URL, NATIVE_STORYBOOK_URL } from '@/data/component-registry'
import { examples } from '@/data/component-examples'

// HSL token set that @otf/ui components expect (matches storybook preview.tsx)
const OTF_DARK_THEME: CSSProperties = {
  '--background':            '25 12% 8%',
  '--foreground':            '35 15% 90%',
  '--card':                  '25 12% 10%',
  '--card-foreground':       '35 15% 90%',
  '--popover':               '25 12% 11%',
  '--popover-foreground':    '35 15% 90%',
  '--primary':               '25 95% 58%',
  '--primary-foreground':    '0 0% 100%',
  '--secondary':             '25 12% 15%',
  '--secondary-foreground':  '35 15% 80%',
  '--muted':                 '25 12% 14%',
  '--muted-foreground':      '25 10% 55%',
  '--accent':                '25 12% 15%',
  '--accent-foreground':     '25 95% 58%',
  '--destructive':           '0 84% 60%',
  '--destructive-foreground':'0 0% 100%',
  '--border':                '25 12% 18%',
  '--input':                 '25 12% 18%',
  '--ring':                  '25 95% 58%',
  '--radius':                '0.5rem',
  '--radius-sm':             '0.375rem',
  '--radius-md':             '0.625rem',
  '--radius-lg':             '1rem',
  '--radius-xl':             '1.5rem',
} as CSSProperties

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
    // Unknown slug — synthesize a placeholder meta and show coming-soon state
    const placeholderMeta: ComponentMeta = {
      slug,
      name: slug.split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join(' '),
      description: 'This component is on the roadmap. Check back soon.',
      category: 'Display',
      tags: [slug],
      stack: 'web',
      hasExample: false,
    }
    return (
      <div className="mx-auto flex max-w-7xl gap-8 px-4 py-8 sm:px-6">
        <aside className="sticky top-24 hidden h-[calc(100vh-7rem)] w-60 shrink-0 flex-col gap-3 lg:flex">
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Components ({components.length})</div>
          <nav className="flex-1 overflow-y-auto pb-6 [scrollbar-width:thin]">
            {components.map((c) => (
              <Link key={c.slug} href={`/components/${c.slug}`}
                className="flex items-center justify-between rounded-md px-2.5 py-1.5 text-sm text-foreground/75 transition-colors hover:bg-secondary hover:text-foreground">
                <span>{c.name}</span>
                {c.hasExample && <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(249,115,22,0.7)]" />}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="flex min-w-0 flex-1 flex-col gap-8 pb-20">
          <nav className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/components" className="hover:text-foreground">Components</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">{placeholderMeta.name}</span>
          </nav>
          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-lg">
            <div className="border-b border-border bg-secondary/30 px-3 py-2">
              <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <Eye className="h-3 w-3" /> Preview
              </div>
            </div>
            <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden bg-pattern-grid p-6 sm:p-10">
              <div className="absolute inset-0 bg-gradient-to-b from-background/20 to-background/60" aria-hidden />
              <div className="relative z-10 flex w-full items-center justify-center" style={OTF_DARK_THEME}>
                <ComingSoon meta={placeholderMeta} />
              </div>
            </div>
          </div>
          <section>
            <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Installation</h3>
            <InstallSnippet slug={slug} />
          </section>
        </main>
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
            {meta.stack === 'mobile' && meta.nativeCategory && meta.nativeSlug ? (
              <a
                href={`${NATIVE_STORYBOOK_URL}/${meta.nativeCategory}/${meta.nativeSlug}`}
                target="_blank"
                rel="noreferrer"
                className="ml-auto inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                View in Mobile Storybook <ExternalLink className="h-3 w-3" />
              </a>
            ) : meta.storybookId && (
              <a
                href={`${STORYBOOK_URL}/?path=/story/${meta.storybookId}`}
                target="_blank"
                rel="noreferrer"
                className="ml-auto inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                View in Storybook <ExternalLink className="h-3 w-3" />
              </a>
            )}
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
            <div className="relative overflow-hidden">
              {meta.stack === 'mobile' && meta.nativeCategory && meta.nativeSlug ? (
                // iPhone SVG mockup wrapping the @otf/ui-native storybook route
                <MobilePreview category={meta.nativeCategory} slug={meta.nativeSlug} title={meta.name} />
              ) : meta.storybookId ? (
                // Storybook iframe — exact same rendering as deployed Storybook
                <StorybookPreview storybookId={meta.storybookId} />
              ) : example ? (
                // Inline demo fallback
                <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden bg-pattern-grid p-6 sm:p-10">
                  <div className="absolute inset-0 bg-gradient-to-b from-background/20 to-background/60" aria-hidden />
                  <div className="relative z-10 flex w-full items-center justify-center" style={OTF_DARK_THEME}>
                    <example.Demo />
                  </div>
                </div>
              ) : (
                // Coming soon
                <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden bg-pattern-grid p-6 sm:p-10">
                  <div className="absolute inset-0 bg-gradient-to-b from-background/20 to-background/60" aria-hidden />
                  <div className="relative z-10 flex w-full items-center justify-center" style={OTF_DARK_THEME}>
                    <ComingSoon meta={meta} />
                  </div>
                </div>
              )}
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
          <InstallSnippet slug={meta.slug} stack={meta.stack} />
        </section>

        {/* Import */}
        <section>
          <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Import</h3>
          <div className="mt-3 rounded-md border border-border bg-card/80 px-4 py-2.5 font-mono text-sm">
            <span className="text-primary">import</span>
            {' { '}<span className="text-foreground">{meta.name.replace(/[^A-Za-z0-9]/g, '')}</span>{' } '}
            <span className="text-primary">from</span>
            {' '}<span className="text-emerald-400">&apos;{meta.stack === 'mobile' ? '@otf/ui-native' : '@otf/ui'}&apos;</span>
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

// ── Storybook iframe embed ────────────────────────────────────────────────────
function StorybookPreview({ storybookId }: { storybookId: string }) {
  const [loaded, setLoaded] = useState(false)
  const src = `${STORYBOOK_URL}/iframe.html?id=${storybookId}&viewMode=story`
  return (
    <div className="relative w-full" style={{ height: '520px' }}>
      {!loaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-card text-muted-foreground">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <span className="font-mono text-xs">Loading Storybook preview…</span>
        </div>
      )}
      <iframe
        src={src}
        title={storybookId}
        className="h-full w-full border-0"
        onLoad={() => setLoaded(true)}
        style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.3s ease' }}
        allow="fullscreen"
      />
    </div>
  )
}

// ── Mobile preview — iPhone SVG mockup wrapping the ui-native storybook route ─
const NATIVE_IFRAME_ALLOW = 'accelerometer *; autoplay *; camera *; clipboard-read *; clipboard-write *; display-capture *; encrypted-media *; fullscreen *; gamepad *; geolocation *; gyroscope *; hid *; idle-detection *; magnetometer *; microphone *; midi *; payment *; picture-in-picture *; publickey-credentials-get *; screen-wake-lock *; serial *; storage-access *; usb *; web-share *; xr-spatial-tracking *'

function MobilePreview({ category, slug, title }: { category: string; slug: string; title: string }) {
  const [loaded, setLoaded] = useState(false)
  const src = `${NATIVE_STORYBOOK_URL}/${category}/${slug}`

  return (
    <div className="relative flex w-full items-center justify-center bg-pattern-grid px-4 py-6 sm:px-8 sm:py-10">
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 to-background/60" aria-hidden />
      {!loaded && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-card/40 text-muted-foreground backdrop-blur-sm">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <span className="font-mono text-xs">Loading mobile preview…</span>
        </div>
      )}
      {/* Manus-style sizing — height-driven so the phone never gets cut off
          by a constrained parent. max-h caps it and aspect-ratio handles
          the width. */}
      <svg
        className="relative z-10 max-h-[640px] 2xl:max-h-[820px] w-auto shrink-0"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 475 998"
        aria-label={`${title} preview`}
      >
        <defs>
          <clipPath id={`otf-phone-clip-${slug}`}>
            <rect x="13.6691" y="13.6691" width="447.662" height="970.504" rx="66.0671" fill="white" />
          </clipPath>
        </defs>
        <g clipPath={`url(#otf-phone-clip-${slug})`}>
          {/* Body */}
          <rect x="0" y="0" width="475" height="998" rx="76.8885" fill="black" />
          {/* Inner screen background */}
          <rect x="13.6691" y="13.6691" width="447.662" height="970.504" rx="66.0671" fill="black" />
          {/* Screen content — starts BELOW the dynamic island (y=78) so the
              iframe never renders behind the island. The empty 64px strip
              above the iframe is where iOS' status bar would sit. */}
          <foreignObject x="13.6691" y="78" width="447.662" height="906">
            <iframe
              src={src}
              title={`${title} mobile preview`}
              onLoad={() => setLoaded(true)}
              allow={NATIVE_IFRAME_ALLOW}
              className="h-full w-full"
              style={{ border: 0, background: 'black', transition: 'opacity 0.3s ease', opacity: loaded ? 1 : 0 }}
            />
          </foreignObject>

          {/* Dynamic island — only chrome the showcase needs.
              Status bar icons (time / battery / cellular / wifi) intentionally
              removed — the showcase content is what users came to see; chrome
              icons compete with it and feel fake. Mirrors the the SDK
              landing reference, where only the dynamic island is rendered and
              app content starts below it. */}
          <rect x="164.598" y="26.575" width="142.386" height="41.7704" rx="20.8852" fill="black" />

          {/* Bezel rings */}
          <rect x="9.68226" y="9.68226" width="455.635" height="978.477" rx="70.054" stroke="black" strokeWidth="9.97362" />
          <rect x="2.84771" y="2.84771" width="469.305" height="992.146" rx="76.8885" stroke="black" strokeWidth="5.69544" />
        </g>
      </svg>
    </div>
  )
}

// ── Install snippet with copy ─────────────────────────────────────────────────
function InstallSnippet({ slug, stack = 'web' }: { slug: string; stack?: 'web' | 'mobile' }) {
  const [copied, setCopied] = useState(false)
  const cmd = stack === 'mobile'
    ? 'pnpm add @otf/ui-native'
    : `pnpm dlx shadcn@latest add https://otf.sh/r/${slug}.json`
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
