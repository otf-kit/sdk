'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Pause, Play } from 'lucide-react'
import { COMPONENTS } from '@/lib/components-registry'

// Hand-picked components that look great inside a laptop screen.
const SHOWCASE = [
  'AppShell',
  'DataGrid',
  'Kanban',
  'BarChart',
  'CommandPalette',
  'AutoForm',
  'DonutChart',
  'WorkspaceMembers',
] as const

const CYCLE_MS = 5000

export function LaptopShowcase() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (paused) return
    intervalRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % SHOWCASE.length)
    }, CYCLE_MS)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [paused])

  const activeName = SHOWCASE[index]
  const activeDef = COMPONENTS.find((c) => c.name === activeName)
  if (!activeDef) return null
  const slug = activeName.toLowerCase().replace(/\s+/g, '-')

  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 bg-pattern-grid opacity-[0.08]" aria-hidden />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/3 h-[520px] mx-auto max-w-3xl blur-3xl opacity-50"
        style={{ background: 'radial-gradient(ellipse at center, hsl(var(--primary) / 0.25), transparent 70%)' }}
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:py-28 sm:px-6">

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div className="mb-14 sm:mb-16 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-5">
            — Live in your app
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05] text-balance">
            Not a Storybook.{' '}
            <span className="italic font-light bg-gradient-to-r from-primary via-primary/70 to-primary/50 bg-clip-text text-transparent">
              a real product.
            </span>
          </h2>
          <p className="mt-5 max-w-xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed">
            Every component runs inside a working app. Cycle through the showcase or pick one to focus on.
          </p>
        </div>

        {/* ── Laptop frame ────────────────────────────────────────────────── */}
        <div className="relative mx-auto max-w-5xl">
          {/* Float wrapper */}
          <div className="laptop-float">
            {/* Display lid */}
            <div className="relative rounded-[18px] bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] p-[10px] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] ring-1 ring-white/5">
              {/* Inner bezel */}
              <div className="relative rounded-[10px] bg-black p-[3px]">
                {/* Camera dot */}
                <div className="absolute left-1/2 top-[3px] z-30 h-1 w-1 -translate-x-1/2 rounded-full bg-zinc-700" />
                {/* Screen */}
                <div className="relative aspect-[16/10] rounded-[7px] overflow-hidden bg-[#080808]">
                  {/* Faux OS chrome */}
                  <div className="absolute inset-x-0 top-0 z-30 flex items-center gap-2 px-3 py-2 border-b border-border/80 bg-background/40 backdrop-blur-sm">
                    <div className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-red-500/70" />
                      <span className="h-2 w-2 rounded-full bg-yellow-500/70" />
                      <span className="h-2 w-2 rounded-full bg-green-500/70" />
                    </div>
                    <div className="flex-1 flex justify-center">
                      <span className="rounded-md bg-background/60 border border-border/60 px-2 py-0.5 font-mono text-[10px] tracking-tight text-muted-foreground/70">
                        otf.sh/{slug}
                      </span>
                    </div>
                    <span className="h-2 w-2" aria-hidden />
                  </div>

                  {/* Dot grid backdrop */}
                  <div className="absolute inset-0 bg-dot-grid opacity-10 pointer-events-none" />
                  {/* Ambient primary glow */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -inset-x-8 -top-32 h-72 opacity-60"
                    style={{ background: 'radial-gradient(ellipse at 50% 0%, hsl(var(--primary) / 0.18), transparent 70%)' }}
                  />

                  {/* Component preview — keyed for fade-in transition */}
                  <div key={activeName} className="absolute inset-0 pt-9 laptop-screen-fade">
                    {activeDef.preview}
                  </div>

                  {/* Subtle scanline sweep on each switch */}
                  <div key={`scan-${activeName}`} className="laptop-scanline pointer-events-none" />
                </div>
              </div>

              {/* Display reflection — subtle gradient sheen */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-[10px] rounded-[10px]"
                style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 35%, transparent 65%, rgba(255,255,255,0.02) 100%)' }}
              />
            </div>

            {/* Hinge + Base */}
            <div className="relative -mt-px">
              {/* Hinge shadow strip */}
              <div className="h-[6px] bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] rounded-b-sm" />
              {/* Base trapezoid */}
              <div
                className="relative h-[18px] bg-gradient-to-b from-[#222222] to-[#111111] mx-[-6%]"
                style={{ clipPath: 'polygon(2% 0, 98% 0, 96% 100%, 4% 100%)' }}
              >
                {/* Notch (touchpad indent) */}
                <div
                  className="absolute left-1/2 top-0 -translate-x-1/2 h-[6px] w-[14%] bg-[#0a0a0a] rounded-b-md"
                />
              </div>
              {/* Base shadow */}
              <div
                className="mx-auto h-[14px] max-w-[80%] blur-md opacity-70"
                style={{ background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.6), transparent 60%)' }}
              />
            </div>
          </div>
        </div>

        {/* ── Controls + thumbnail tray ──────────────────────────────────── */}
        <div className="mt-12 flex flex-col items-center gap-5">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setPaused((p) => !p)}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/40 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
              aria-label={paused ? 'Resume cycling' : 'Pause cycling'}
            >
              {paused ? <Play className="h-3 w-3" /> : <Pause className="h-3 w-3" />}
              {paused ? 'Resume' : 'Pause'}
            </button>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">
              {String(index + 1).padStart(2, '0')} / {String(SHOWCASE.length).padStart(2, '0')} · {activeName}
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-2 max-w-3xl">
            {SHOWCASE.map((name, i) => {
              const isActive = i === index
              return (
                <button
                  key={name}
                  onClick={() => { setIndex(i); setPaused(true) }}
                  className={
                    'group relative inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium transition-all ' +
                    (isActive
                      ? 'border-primary bg-primary/15 text-primary shadow-sm'
                      : 'border-border bg-secondary/30 text-muted-foreground hover:bg-secondary hover:text-foreground')
                  }
                >
                  <span className="relative z-10">{name}</span>
                  {isActive && !paused && (
                    <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-primary laptop-progress-bar" />
                  )}
                </button>
              )
            })}
          </div>

          <Link
            href={`/components/${slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            See {activeName} live <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      <style>{`
        .laptop-float {
          animation: laptop-float 7s ease-in-out infinite;
          will-change: transform;
        }
        @keyframes laptop-float {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-8px); }
        }
        .laptop-screen-fade {
          animation: laptop-fade-in 600ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        @keyframes laptop-fade-in {
          from { opacity: 0; transform: scale(0.99); }
          to   { opacity: 1; transform: scale(1); }
        }
        .laptop-scanline {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            hsl(var(--primary) / 0.15) 50%,
            transparent 100%
          );
          height: 100%;
          animation: laptop-scanline 700ms ease-out;
          opacity: 0;
        }
        @keyframes laptop-scanline {
          0%   { opacity: 0.6; transform: translateY(-100%); }
          100% { opacity: 0;   transform: translateY(100%); }
        }
        .laptop-progress-bar {
          animation: laptop-progress ${CYCLE_MS}ms linear;
        }
        @keyframes laptop-progress {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .laptop-float,
          .laptop-screen-fade,
          .laptop-scanline,
          .laptop-progress-bar {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  )
}
