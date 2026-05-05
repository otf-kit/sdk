'use client'

import { useState } from 'react'
import { ExternalLink } from 'lucide-react'
import type { TemplateListEntry } from '@/data/templates/list'

// Loads the actual live kit demo inside a browser-chrome iframe — the same
// pattern as the components detail page Storybook embeds, but pointed at the
// kit's production URL. Phone-shape kits embed the phone-frame preview shell
// (which itself iframes the kit) so the dynamic-island layout is preserved.

const IFRAME_ALLOW = 'accelerometer; autoplay; camera; clipboard-read; clipboard-write; encrypted-media; fullscreen; geolocation; gyroscope; payment; picture-in-picture'

export function LiveIframePreview({
  template,
  height = 'clamp(420px, calc(100vh - 12rem), 540px)',
}: {
  template: TemplateListEntry
  height?: string | number
}) {
  const [loaded, setLoaded] = useState(false)
  const url = template.previewUrl ?? template.demoUrl
  if (!url) return null

  const hostname = url.replace(/^https?:\/\//, '').replace(/\/$/, '')
  const isPhone = template.previewShape === 'phone'

  const heightStyle = typeof height === 'number' ? `${height}px` : height

  return (
    <div className="flex h-full flex-col border-b border-border lg:border-b-0 lg:border-r">
      {/* Browser chrome */}
      <div className="flex h-9 shrink-0 items-center gap-2 border-b border-border bg-secondary/40 px-3">
        <div className="flex shrink-0 gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/60" />
        </div>
        <div className="flex flex-1 justify-center">
          <div className="flex w-full max-w-[280px] items-center gap-2 truncate rounded border border-border bg-background/60 px-3 py-0.5 font-mono text-[10px] text-muted-foreground">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500/70" aria-hidden />
            <span className="truncate">{hostname}</span>
          </div>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          aria-label="Open live demo in new tab"
          className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>

      {/* Iframe */}
      <div className={`relative flex-1 ${isPhone ? 'bg-pattern-grid' : ''}`} style={{ minHeight: heightStyle }}>
        {!loaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-card text-muted-foreground">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <span className="font-mono text-xs">Loading {template.name}…</span>
          </div>
        )}
        <iframe
          src={url}
          title={`${template.name} live demo`}
          onLoad={() => setLoaded(true)}
          allow={IFRAME_ALLOW}
          className="h-full w-full border-0"
          style={{ background: 'transparent', transition: 'opacity 0.3s ease', opacity: loaded ? 1 : 0 }}
        />
      </div>
    </div>
  )
}
