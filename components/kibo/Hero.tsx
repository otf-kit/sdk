'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ArrowRight } from 'lucide-react'
import { GithubIcon as Github } from './icons'

// ── Mini floating component cards ─────────────────────────────────────────────

function MiniButtons() {
  return (
    <div style={{ padding: '12px 14px', minWidth: 160 }}>
      <div style={{ fontSize: 9, opacity: 0.5, fontFamily: 'var(--font-geist-mono, monospace)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Buttons</div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        <span style={{ padding: '4px 10px', borderRadius: 5, background: '#f97316', color: 'white', fontSize: 10, fontWeight: 600 }}>Primary</span>
        <span style={{ padding: '4px 10px', borderRadius: 5, border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.7)', fontSize: 10 }}>Ghost</span>
        <span style={{ padding: '4px 10px', borderRadius: 5, border: '1px solid rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.1)', color: '#f87171', fontSize: 10 }}>Danger</span>
      </div>
      <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
        <span style={{ padding: '4px 10px', borderRadius: 5, background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.4)', fontSize: 10, cursor: 'not-allowed' }}>Disabled</span>
        <span style={{ padding: '4px 10px', borderRadius: 5, background: '#f97316', color: 'white', fontSize: 10, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.4)', borderTopColor: 'white', display: 'inline-block', animation: 'spin 0.8s linear infinite' }}/>
          Loading
        </span>
      </div>
    </div>
  )
}

function MiniBadges() {
  return (
    <div style={{ padding: '12px 14px', minWidth: 150 }}>
      <div style={{ fontSize: 9, opacity: 0.5, fontFamily: 'var(--font-geist-mono, monospace)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Badges</div>
      <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
        {[
          { l: 'NEW',    bg: '#f97316',             c: 'white' },
          { l: 'BETA',   bg: 'rgba(59,130,246,0.15)', c: '#60a5fa', b: 'rgba(59,130,246,0.3)' },
          { l: 'DONE',   bg: 'rgba(34,197,94,0.15)',  c: '#4ade80', b: 'rgba(34,197,94,0.3)'  },
          { l: 'PRO',    bg: 'rgba(167,139,250,0.15)',c: '#a78bfa', b: 'rgba(167,139,250,0.3)'},
        ].map(b => (
          <span key={b.l} style={{ padding: '3px 8px', borderRadius: 999, background: b.bg, color: b.c, fontSize: 9, fontWeight: 700, fontFamily: 'var(--font-geist-mono, monospace)', letterSpacing: '0.06em', border: `1px solid ${b.b ?? 'transparent'}` }}>
            {b.l}
          </span>
        ))}
      </div>
      <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
        {[{ l: 'Active', c: '#4ade80' }, { l: 'In Progress', c: '#fbbf24' }, { l: 'Blocked', c: '#f87171' }].map(s => (
          <div key={s.l} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10, color: 'rgba(255,255,255,0.7)' }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: s.c, boxShadow: `0 0 5px ${s.c}` }} />{s.l}
          </div>
        ))}
      </div>
    </div>
  )
}

function MiniChart() {
  const pts = [30, 45, 38, 60, 52, 72, 65, 80, 74, 88, 82, 100]
  const mx = 100, mn = 0
  const norm = (v: number) => ((v - mn) / (mx - mn)) * 100
  const svgPts = pts.map((p, i) => `${(i / (pts.length - 1)) * 100},${100 - norm(p)}`).join(' ')
  return (
    <div style={{ padding: '12px 14px', minWidth: 180 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <div>
          <div style={{ fontSize: 9, opacity: 0.5, fontFamily: 'var(--font-geist-mono, monospace)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 3 }}>Revenue</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: 'white', letterSpacing: '-0.02em', lineHeight: 1 }}>$84.2k</div>
          <div style={{ fontSize: 10, color: '#4ade80', marginTop: 2 }}>↑ +22.8% vs last year</div>
        </div>
        <span style={{ fontSize: 9, padding: '2px 6px', borderRadius: 4, background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-geist-mono, monospace)' }}>2025</span>
      </div>
      <svg viewBox="0 0 100 40" preserveAspectRatio="none" style={{ width: '100%', height: 48 }}>
        <defs>
          <linearGradient id="hg" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0.35"/>
            <stop offset="100%" stopColor="#f97316" stopOpacity="0"/>
          </linearGradient>
        </defs>
        <polygon points={`0,40 ${svgPts} 100,40`} fill="url(#hg)"/>
        <polyline points={svgPts} fill="none" stroke="#f97316" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="100" cy={40 - norm(pts[pts.length - 1]) * 0.4} r="2.5" fill="#f97316" filter="drop-shadow(0 0 3px #f97316)"/>
      </svg>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
        {['J','F','M','A','M','J','J','A','S','O','N','D'].map(m => (
          <span key={m} style={{ fontSize: 7.5, color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-geist-mono, monospace)' }}>{m}</span>
        ))}
      </div>
    </div>
  )
}

function MiniCommand() {
  return (
    <div style={{ padding: '10px 12px', minWidth: 200 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 8, padding: '6px 8px', background: 'rgba(255,255,255,0.04)', borderRadius: 6, border: '1px solid rgba(255,255,255,0.08)' }}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', flex: 1 }}>Search or jump to…</span>
        <span style={{ fontSize: 8.5, border: '1px solid rgba(255,255,255,0.12)', borderRadius: 3, padding: '1px 5px', color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-geist-mono, monospace)' }}>⌘K</span>
      </div>
      <div style={{ fontSize: 8.5, color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-geist-mono, monospace)', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '2px 4px 5px' }}>Navigate</div>
      {[
        { ic: '→', l: 'Go to Dashboard',   active: false },
        { ic: '◎', l: 'All Issues',         active: true  },
        { ic: '+', l: 'New Issue',           active: false },
      ].map(item => (
        <div key={item.l} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 6px', borderRadius: 5, background: item.active ? 'rgba(249,115,22,0.12)' : 'transparent', marginBottom: 1 }}>
          <span style={{ fontSize: 10, color: item.active ? '#f97316' : 'rgba(255,255,255,0.3)', width: 14 }}>{item.ic}</span>
          <span style={{ fontSize: 11, color: item.active ? 'white' : 'rgba(255,255,255,0.5)' }}>{item.l}</span>
        </div>
      ))}
    </div>
  )
}

function MiniKanban() {
  return (
    <div style={{ padding: '12px 14px', minWidth: 210 }}>
      <div style={{ fontSize: 9, opacity: 0.5, fontFamily: 'var(--font-geist-mono, monospace)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Kanban board</div>
      <div style={{ display: 'flex', gap: 7 }}>
        {[
          { l: 'Todo',  c: '#60a5fa', cards: ['Design login', 'API docs'] },
          { l: 'Doing', c: '#fbbf24', cards: ['Auth flow'] },
          { l: 'Done',  c: '#4ade80', cards: ['CI/CD', 'Schema'] },
        ].map(col => (
          <div key={col.l} style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 5 }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: col.c }} />
              <span style={{ fontSize: 8.5, color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>{col.l}</span>
            </div>
            {col.cards.map(c => (
              <div key={c} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 5, padding: '5px 6px', marginBottom: 4, borderLeft: `2px solid ${col.c}40` }}>
                <div style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.7)', lineHeight: 1.3 }}>{c}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function MiniMetrics() {
  return (
    <div style={{ padding: '12px 14px', minWidth: 170 }}>
      <div style={{ fontSize: 9, opacity: 0.5, fontFamily: 'var(--font-geist-mono, monospace)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>KPI cards</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
        {[
          { l: 'MRR',    v: '$4.8k', t: '+18%', c: '#f97316' },
          { l: 'Users',  v: '2,340', t: '+7%',  c: '#60a5fa' },
          { l: 'Churn',  v: '2.1%',  t: '-0.4%',c: '#4ade80' },
          { l: 'Issues', v: '12',     t: '+3',   c: '#fbbf24' },
        ].map(m => (
          <div key={m.l} style={{ padding: '7px 9px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 7 }}>
            <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-geist-mono, monospace)', marginBottom: 3 }}>{m.l}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'white', lineHeight: 1 }}>{m.v}</div>
            <div style={{ fontSize: 8.5, color: m.c, marginTop: 3, fontWeight: 600 }}>↗ {m.t}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Card shell ────────────────────────────────────────────────────────────────
function FloatCard({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: 'rgba(17,14,10,0.85)',
      border: '1px solid rgba(249,115,22,0.15)',
      borderRadius: 12,
      backdropFilter: 'blur(12px)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(249,115,22,0.08)',
      ...style,
    }}>
      {children}
    </div>
  )
}

// ── Floating card configs ─────────────────────────────────────────────────────
const FLOAT_CARDS = [
  { id: 'buttons',  side: 'left',  x:  '3%', y: '14%', rotate: -5, depth: 0.5, node: <MiniButtons /> },
  { id: 'badges',   side: 'left',  x:  '1%', y: '58%', rotate:  3, depth: 0.4, node: <MiniBadges /> },
  { id: 'metrics',  side: 'left',  x:  '6%', y: '82%', rotate: -3, depth: 0.35, node: <MiniMetrics /> },
  { id: 'chart',    side: 'right', x: '66%', y: '10%', rotate:  5, depth: 0.6, node: <MiniChart /> },
  { id: 'command',  side: 'right', x: '68%', y: '55%', rotate: -4, depth: 0.5, node: <MiniCommand /> },
  { id: 'kanban',   side: 'right', x: '63%', y: '80%', rotate:  3, depth: 0.4, node: <MiniKanban /> },
]

// ── Hero ──────────────────────────────────────────────────────────────────────
export function Hero() {
  const sectionRef  = useRef<HTMLElement>(null)
  const cardsRef    = useRef<(HTMLDivElement | null)[]>([])
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subRef      = useRef<HTMLParagraphElement>(null)
  const badgeRef    = useRef<HTMLAnchorElement>(null)
  const ctaRef      = useRef<HTMLDivElement>(null)
  const installRef  = useRef<HTMLDivElement>(null)

  // Entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from(badgeRef.current,   { opacity: 0, y: -12, duration: 0.5 }, 0)
      tl.from(headlineRef.current,{ opacity: 0, y: 28, filter: 'blur(10px)', duration: 0.9 }, 0.15)
      tl.from(subRef.current,     { opacity: 0, y: 16, duration: 0.7 }, 0.35)
      tl.from(ctaRef.current,     { opacity: 0, y: 12, duration: 0.6 }, 0.5)
      tl.from(installRef.current, { opacity: 0, y: 8,  duration: 0.5 }, 0.65)

      tl.from(cardsRef.current.filter(Boolean), {
        opacity: 0, scale: 0.85, filter: 'blur(8px)',
        duration: 0.9, stagger: { each: 0.08, from: 'random' },
      }, 0.2)

      // Idle float animation for cards
      cardsRef.current.forEach((el, i) => {
        if (!el) return
        gsap.to(el, {
          y: `+=${10 + (i % 3) * 4}`,
          rotation: `+=${(i % 2 === 0 ? 1.5 : -1.5)}`,
          duration: 4 + i * 0.4,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: i * 0.3,
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Mouse parallax
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const movers = cardsRef.current.map((el, i) => {
        if (!el) return null
        return {
          x: gsap.quickTo(el, 'x', { duration: 1.6, ease: 'power3.out' }),
          y: gsap.quickTo(el, 'y', { duration: 1.6, ease: 'power3.out' }),
        }
      })

      const onMove = (e: MouseEvent) => {
        const r = section.getBoundingClientRect()
        const dx = (e.clientX - r.left) / r.width  - 0.5
        const dy = (e.clientY - r.top)  / r.height - 0.5
        movers.forEach((m, i) => {
          if (!m) return
          const depth = FLOAT_CARDS[i]?.depth ?? 0.5
          m.x(dx * 28 * depth)
          m.y(dy * 20 * depth)
        })
      }
      const onLeave = () => movers.forEach(m => m && (m.x(0), m.y(0)))

      section.addEventListener('mousemove', onMove)
      section.addEventListener('mouseleave', onLeave)
      return () => {
        section.removeEventListener('mousemove', onMove)
        section.removeEventListener('mouseleave', onLeave)
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden border-b border-border"
      style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}
    >
      {/* ── Background ──────────────────────────────────────────────────── */}
      {/* Radial orange glow from top-center */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[70%]"
        style={{ background: 'radial-gradient(ellipse 90% 60% at 50% -10%, rgba(249,115,22,0.22) 0%, transparent 70%)' }}
        aria-hidden />
      {/* Dot grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden
      />
      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent" aria-hidden />
      {/* Side vignettes */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-[30%] bg-gradient-to-r from-background/80 to-transparent" aria-hidden />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[30%] bg-gradient-to-l from-background/80 to-transparent" aria-hidden />

      {/* ── Floating component cards ──────────────────────────────────── */}
      {FLOAT_CARDS.map((card, i) => (
        <div
          key={card.id}
          ref={(el) => { cardsRef.current[i] = el }}
          className="pointer-events-none absolute hidden lg:block"
          style={{ left: card.x, top: card.y, transform: `rotate(${card.rotate}deg)`, zIndex: 1 }}
          aria-hidden
        >
          <FloatCard>
            {card.node}
          </FloatCard>
        </div>
      ))}

      {/* ── Center content ────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto w-full max-w-3xl px-4 py-24 text-center sm:px-6 lg:py-32">

        {/* Badge */}
        <a
          ref={badgeRef}
          href="/templates"
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-4 py-1.5 text-xs backdrop-blur-md transition-all hover:border-primary/40 hover:bg-secondary"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          <span className="font-mono uppercase tracking-widest text-foreground/80">Works with every AI tool — Cursor · Claude · Lovable · Bolt</span>
        </a>

        {/* Headline */}
        <h1 ref={headlineRef} className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          <span className="block text-foreground">Describe your idea.</span>
          <span className="block font-mono italic text-foreground" style={{ fontStyle: 'italic' }}>
            Your AI already knows.
          </span>
        </h1>

        {/* Subtitle */}
        <p ref={subRef} className="mx-auto mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
          Every kit ships with CLAUDE.md, .cursorrules, and 20+ tested prompts. Open in Cursor, Claude, Lovable, Bolt, or any AI coding tool — it already understands your entire codebase.
        </p>

        {/* Stats row */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {[
            { value: '180+', label: 'components' },
            { value: '5',    label: 'themes'     },
            { value: 'MIT',  label: 'license'    },
            { value: 'All',  label: 'AI tools'   },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-3.5 py-1.5 backdrop-blur-sm">
              <span className="text-sm font-bold text-foreground">{s.value}</span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{s.label}</span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div ref={ctaRef} className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="/templates"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground shadow-[0_8px_32px_-8px_rgba(249,115,22,0.7)] transition-all hover:scale-[1.03] hover:shadow-[0_12px_40px_-8px_rgba(249,115,22,0.8)] active:scale-[0.98]"
          >
            Browse templates <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
          </a>
          <a
            href="https://github.com/open-template-forest"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-5 py-2.5 text-sm font-medium backdrop-blur-md transition-all hover:scale-[1.02] hover:border-primary/30 hover:bg-card"
          >
            <Github className="h-4 w-4" />
            Star on GitHub
            <span className="font-mono text-xs text-muted-foreground">1.2k</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

        {/* Install command */}
        <div ref={installRef} className="mt-8 inline-flex items-center gap-3 rounded-full border border-border bg-card/70 px-5 py-2.5 font-mono text-sm shadow-lg backdrop-blur-md transition-all hover:border-primary/30">
          <span className="text-muted-foreground">$</span>
          <span className="text-foreground/80">pnpm dlx shadcn@latest add</span>
          <span className="text-primary">otf.sh/r/button.json</span>
          <span className="mx-1 h-4 w-px bg-border" />
          <span className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground cursor-pointer">⌘C</span>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg) } }
      `}</style>
    </section>
  )
}
