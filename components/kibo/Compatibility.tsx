'use client'

import { useEffect, useRef } from 'react'
import { Reveal } from './Reveal'

const tools = [
  { id: 'react',    label: 'React',      angle: 270, slug: 'react' },
  { id: 'next',     label: 'Next.js',    angle: 310, slug: 'nextdotjs' },
  { id: 'expo',     label: 'Expo',       angle: 350, slug: 'expo' },
  { id: 'tailwind', label: 'Tailwind',   angle: 30,  slug: 'tailwindcss' },
  { id: 'radix',    label: 'Radix',      angle: 70,  slug: 'radixui' },
  { id: 'hono',     label: 'Hono',       angle: 110, slug: 'hono' },
  { id: 'shadcn',   label: 'shadcn/ui',  angle: 150, slug: 'shadcnui' },
  { id: 'ts',       label: 'TypeScript', angle: 190, slug: 'typescript' },
  { id: 'supabase', label: 'Supabase',   angle: 230, slug: 'supabase' },
]

const SIZE = 480, RADIUS = 175, TILE = 60, CENTER_TILE = 96

function angleToXY(angle: number) {
  const rad = (angle * Math.PI) / 180
  return { x: SIZE / 2 + Math.cos(rad) * RADIUS, y: SIZE / 2 + Math.sin(rad) * RADIUS }
}

export function Compatibility() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.classList.add('compat-visible'); obs.disconnect() }
    }, { threshold: 0.2 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const cx = SIZE / 2, cy = SIZE / 2

  return (
    <section ref={sectionRef} className="compat-section relative overflow-hidden border-b border-border bg-background">
      <div className="pointer-events-none absolute inset-0 opacity-60"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(249,115,22,0.10) 0%, transparent 55%)' }} aria-hidden />
      <div className="absolute inset-0 bg-pattern-grid opacity-[0.10]" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <Reveal direction="up" distance={20}>
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">— Compatibility</p>
            <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:whitespace-nowrap">
              Works with every framework.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              One registry. React, Next.js, Expo, Remix, Astro, and more. Built on Radix and Tailwind, OTF components plug into any project that supports{' '}
              <span className="rounded bg-secondary px-1.5 py-0.5 font-mono text-sm text-foreground">shadcn/ui</span>.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {['React 19', 'Next.js 16', 'Expo 54', 'Tailwind v4', 'TypeScript 5'].map((t) => (
                <span key={t} className="rounded-full border border-border bg-secondary/40 px-3 py-1 font-mono text-xs text-muted-foreground">{t}</span>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-20 relative mx-auto w-full max-w-[580px]">
          <div className="relative aspect-square">
            <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0 h-full w-full" aria-hidden>
              <defs>
                <radialGradient id="pulseGlow">
                  <stop offset="0%"   stopColor="#f97316" stopOpacity="1" />
                  <stop offset="60%"  stopColor="#f97316" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                </radialGradient>
                {tools.map((t) => {
                  const { x, y } = angleToXY(t.angle)
                  return <path key={`p-${t.id}`} id={`path-${t.id}`} d={`M ${cx} ${cy} L ${x} ${y}`} />
                })}
              </defs>

              {tools.map((t) => {
                const { x, y } = angleToXY(t.angle)
                return <line key={`l-${t.id}`} x1={cx} y1={cy} x2={x} y2={y} stroke="#1f1f1f" strokeWidth="1" strokeDasharray="2 4" opacity="0.6" />
              })}

              {tools.map((t, i) => (
                <g key={`pulse-${t.id}`}>
                  <circle r="8" fill="url(#pulseGlow)" opacity="0.7">
                    <animateMotion dur={`${2.4 + (i % 4) * 0.4}s`} repeatCount="indefinite" begin={`${i * 0.25}s`} rotate="auto">
                      <mpath href={`#path-${t.id}`} />
                    </animateMotion>
                  </circle>
                  <circle r="2.5" fill="#f97316">
                    <animateMotion dur={`${2.4 + (i % 4) * 0.4}s`} repeatCount="indefinite" begin={`${i * 0.25}s`}>
                      <mpath href={`#path-${t.id}`} />
                    </animateMotion>
                  </circle>
                </g>
              ))}
            </svg>

            {/* Center node */}
            <div className="compat-center absolute flex flex-col items-center justify-center gap-1.5 rounded-2xl border border-border bg-card shadow-2xl shadow-primary/20"
              style={{ left: `${(cx / SIZE) * 100}%`, top: `${(cy / SIZE) * 100}%`, width: `${(CENTER_TILE / SIZE) * 100}%`, height: `${(CENTER_TILE / SIZE) * 100}%`, transform: 'translate(-50%, -50%)' }}>
              <span className="pointer-events-none absolute -inset-px rounded-2xl" style={{ boxShadow: '0 0 0 1px rgba(249,115,22,0.5), 0 0 40px 8px rgba(249,115,22,0.35)' }} aria-hidden />
              <img src="/logo.svg" alt="OTF" className="relative h-10 w-10" />
              <span className="relative font-mono text-[11px] font-semibold tracking-wide text-foreground">otf</span>
            </div>

            {/* Surrounding tiles */}
            {tools.map((t, i) => {
              const { x, y } = angleToXY(t.angle)
              return (
                <div key={t.id} className="compat-tile absolute flex items-center justify-center rounded-xl border border-border bg-card shadow-lg backdrop-blur-sm"
                  style={{ left: `${(x / SIZE) * 100}%`, top: `${(y / SIZE) * 100}%`, width: `${(TILE / SIZE) * 100}%`, height: `${(TILE / SIZE) * 100}%`, transform: 'translate(-50%, -50%)', animationDelay: `${i * 80}ms` }}
                  title={t.label}>
                  <img src={`https://cdn.simpleicons.org/${t.slug}/ffffff`} alt={t.label} width={22} height={22} loading="lazy" className="opacity-90" />
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <style>{`
        .compat-tile {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.5);
        }
        .compat-center {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.6);
        }
        .compat-section.compat-visible .compat-tile {
          animation: compatTileIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .compat-section.compat-visible .compat-center {
          animation: compatCenterIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes compatTileIn {
          from { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
          to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        @keyframes compatCenterIn {
          from { opacity: 0; transform: translate(-50%, -50%) scale(0.6); }
          to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .compat-section.compat-visible .compat-tile,
          .compat-section.compat-visible .compat-center {
            animation-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  )
}
