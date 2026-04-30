'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Pause, Play } from 'lucide-react'
import { COMPONENTS } from '@/lib/components-registry'

// ── Scenes ────────────────────────────────────────────────────────────────────
// Each scene composes 4 real component previews into a 2×2 grid inside the
// laptop screen. Same components used in saas-dashboard kit + Storybook.

interface Scene {
  name: string
  caption: string
  /** Pretty path shown in the fake browser URL bar */
  path: string
  /** Component names — must exist in COMPONENTS registry. Exactly 4. */
  components: [string, string, string, string]
}

const SCENES: Scene[] = [
  {
    name: 'Analytics',
    caption: 'KPIs · charts · activity feed',
    path: 'analytics/overview',
    components: ['MetricCard', 'LineChart', 'DonutChart', 'Timeline'],
  },
  {
    name: 'Workflow',
    caption: 'Boards · members · progress',
    path: 'workflow/projects',
    components: ['Kanban', 'WorkspaceMembers', 'Progress', 'FileCards'],
  },
  {
    name: 'Forms',
    caption: 'Schema-driven inputs',
    path: 'forms/onboarding',
    components: ['AutoForm', 'DatePicker', 'StepForm', 'Select'],
  },
  {
    name: 'Building blocks',
    caption: 'Surfaces · feedback · search',
    path: 'kit/blocks',
    components: ['CommandPalette', 'TextureCard', 'Toast', 'EmptyState'],
  },
]

const CYCLE_MS = 7000

function getPreview(name: string) {
  return COMPONENTS.find((c) => c.name === name)
}

// ── Section ───────────────────────────────────────────────────────────────────
export function ComponentTeaser() {
  const total = COMPONENTS.length
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setIndex((i) => (i + 1) % SCENES.length), CYCLE_MS)
    return () => clearInterval(id)
  }, [paused])

  const active = SCENES[index]
  const cells = active.components.map(getPreview).filter(Boolean) as ReturnType<typeof getPreview>[]

  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* ambient bg — match Components.tsx for visual consistency */}
      <div className="absolute inset-0 bg-pattern-grid opacity-[0.18]" aria-hidden />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/3 h-[520px] mx-auto max-w-3xl blur-3xl opacity-40"
        style={{ background: 'radial-gradient(ellipse at center, hsl(var(--primary) / 0.18), transparent 70%)' }}
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6">

        {/* ── Header ── shared layout with Components section ─────────────── */}
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">— Component Library</p>
            <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              Real components, shipping together
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              {total}+ typed, accessible, dark-mode native pieces. Cycle the scenes to see them composed inside a real product.
            </p>
          </div>
          <Link
            href="/components"
            className="group inline-flex items-center gap-2 font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Browse all components
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* ── Laptop frame ────────────────────────────────────────────────── */}
        <div className="relative mx-auto max-w-5xl">
          <div className="laptop-float">
            {/* lid */}
            <div className="relative rounded-[18px] bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] p-[10px] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] ring-1 ring-white/5">
              {/* inner bezel */}
              <div className="relative rounded-[10px] bg-black p-[3px]">
                <div className="absolute left-1/2 top-[3px] z-30 h-1 w-1 -translate-x-1/2 rounded-full bg-zinc-700" />
                {/* screen */}
                <div className="relative aspect-[16/10] rounded-[7px] overflow-hidden bg-[#0a0907]">
                  {/* OS chrome */}
                  <div className="absolute inset-x-0 top-0 z-30 flex items-center gap-2 px-3 py-2 border-b border-white/5 bg-black/55 backdrop-blur-md">
                    <div className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-red-500/70" />
                      <span className="h-2 w-2 rounded-full bg-yellow-500/70" />
                      <span className="h-2 w-2 rounded-full bg-green-500/70" />
                    </div>
                    <div className="flex-1 flex justify-center">
                      <Link
                        href="/components"
                        className="rounded-md bg-white/5 border border-white/10 px-2.5 py-0.5 font-mono text-[10px] tracking-tight text-white/55 hover:text-white/85 hover:border-primary/40 transition-colors"
                      >
                        otf.sh/{active.path}
                      </Link>
                    </div>
                    <span className="h-2 w-2" aria-hidden />
                  </div>

                  {/* scene grid (2×2, real previews — no iframes) */}
                  <div
                    key={active.name}
                    className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-3 px-3 pb-3 pt-12 laptop-scene-fade"
                  >
                    {cells.map((c) => c && (
                      <div
                        key={c.name}
                        className="relative overflow-hidden rounded-md border border-white/5 bg-black/30 ring-1 ring-white/[0.02] transition-all duration-300 hover:border-primary/25"
                      >
                        <div className="absolute inset-0">{c.preview}</div>
                        <span className="pointer-events-none absolute left-2 top-2 z-10 rounded-sm bg-black/60 backdrop-blur-sm px-1.5 py-0.5 font-mono text-[8.5px] uppercase tracking-widest text-white/55 border border-white/5">
                          {c.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* sheen */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-[10px] rounded-[10px]"
                style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 35%, transparent 65%, rgba(255,255,255,0.02) 100%)' }}
              />
            </div>

            {/* hinge + base */}
            <div className="relative -mt-px">
              <div className="h-[6px] bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] rounded-b-sm" />
              <div
                className="relative h-[18px] bg-gradient-to-b from-[#222222] to-[#111111] mx-[-6%]"
                style={{ clipPath: 'polygon(2% 0, 98% 0, 96% 100%, 4% 100%)' }}
              >
                <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[6px] w-[14%] bg-[#0a0a0a] rounded-b-md" />
              </div>
              <div
                className="mx-auto h-[14px] max-w-[80%] blur-md opacity-70"
                style={{ background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.6), transparent 60%)' }}
              />
            </div>
          </div>
        </div>

        {/* ── Scene picker ──────────────────────────────────────────────── */}
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
              Scene {String(index + 1).padStart(2, '0')} / {String(SCENES.length).padStart(2, '0')} · {active.caption}
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-2 max-w-3xl">
            {SCENES.map((scene, i) => {
              const isActive = i === index
              return (
                <button
                  key={scene.name}
                  onClick={() => { setIndex(i); setPaused(true) }}
                  className={
                    'group relative inline-flex items-center gap-1.5 rounded-md border px-3.5 py-1.5 text-xs font-medium transition-all overflow-hidden ' +
                    (isActive
                      ? 'border-primary bg-primary/15 text-primary shadow-sm'
                      : 'border-border bg-secondary/30 text-muted-foreground hover:bg-secondary hover:text-foreground')
                  }
                >
                  <span className="relative z-10">{scene.name}</span>
                  {isActive && !paused && (
                    <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-primary laptop-progress-bar" />
                  )}
                </button>
              )
            })}
          </div>
        </div>

      </div>

      <style>{`
        .laptop-float {
          animation: laptop-float 9s ease-in-out infinite;
          will-change: transform;
        }
        @keyframes laptop-float {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-5px); }
        }
        .laptop-scene-fade {
          animation: laptop-scene-fade 450ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        @keyframes laptop-scene-fade {
          from { opacity: 0; }
          to   { opacity: 1; }
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
          .laptop-scene-fade,
          .laptop-progress-bar {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  )
}
