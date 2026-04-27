'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ArrowRight, Calendar, GanttChart, KanbanSquare, Code2, Palette, QrCode, BarChart3, Layers, Zap } from 'lucide-react'
import { GithubIcon as Github } from './icons'
import { MagneticCTA } from './MagneticCTA'

const floatingCards = [
  { Icon: GanttChart,   label: 'Gantt',    x: 8,  y: 22, rotate: -8, depth: 60 },
  { Icon: KanbanSquare, label: 'Kanban',   x: 88, y: 18, rotate:  6, depth: 80 },
  { Icon: Code2,        label: 'Sandbox',  x: 4,  y: 64, rotate:  5, depth: 45 },
  { Icon: Palette,      label: 'Themes',   x: 92, y: 60, rotate: -7, depth: 70 },
  { Icon: Calendar,     label: 'Calendar', x: 14, y: 88, rotate:  4, depth: 55 },
  { Icon: QrCode,       label: 'QR',       x: 82, y: 88, rotate: -5, depth: 65 },
  { Icon: BarChart3,    label: 'Charts',   x: 22, y: 12, rotate:  3, depth: 35 },
  { Icon: Layers,       label: 'Stack',    x: 76, y: 40, rotate: -4, depth: 90 },
  { Icon: Zap,          label: 'AI',       x: 26, y: 50, rotate:  8, depth: 50 },
]

export function Hero() {
  const sectionRef  = useRef<HTMLElement>(null)
  const spotlightRef = useRef<HTMLDivElement>(null)
  const blobRef     = useRef<HTMLDivElement>(null)
  const gridRef     = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subheadRef  = useRef<HTMLParagraphElement>(null)
  const cardsRef    = useRef<(HTMLDivElement | null)[]>([])
  const orbRefs     = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from(cardsRef.current.filter(Boolean), {
        opacity: 0, scale: 0.6, y: 40, filter: 'blur(20px)',
        duration: 1.1, stagger: { each: 0.06, from: 'random' },
      }, 0)

      tl.from(headlineRef.current, {
        opacity: 0, y: 30, scale: 0.9, filter: 'blur(12px)',
        duration: 1.1, ease: 'power3.out', transformOrigin: '50% 50%',
      }, 0.15)

      tl.from(subheadRef.current, {
        opacity: 0, y: 20, filter: 'blur(8px)', duration: 0.8,
      }, 0.35)

      cardsRef.current.forEach((el, i) => {
        if (!el) return
        gsap.to(el, {
          y: '+=14', rotation: `+=${(i % 2 === 0 ? 2 : -2)}`,
          duration: 3 + (i % 4) * 0.6, ease: 'sine.inOut',
          yoyo: true, repeat: -1, delay: i * 0.15,
        })
      })

      orbRefs.current.forEach((el, i) => {
        if (!el) return
        gsap.to(el, { scale: 1.3, opacity: 0.5, duration: 3 + i * 0.5, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: i * 0.4 })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const spotX  = gsap.quickTo(spotlightRef.current, '--mx', { duration: 0.8, ease: 'power3.out' }) as any
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const spotY  = gsap.quickTo(spotlightRef.current, '--my', { duration: 0.8, ease: 'power3.out' }) as any
      const gridX  = gsap.quickTo(gridRef.current, 'x', { duration: 1.2, ease: 'power3.out' })
      const gridY  = gsap.quickTo(gridRef.current, 'y', { duration: 1.2, ease: 'power3.out' })
      const blobX  = gsap.quickTo(blobRef.current, 'x', { duration: 1.5, ease: 'power3.out' })
      const blobY  = gsap.quickTo(blobRef.current, 'y', { duration: 1.5, ease: 'power3.out' })
      const headX  = gsap.quickTo(headlineRef.current, 'x', { duration: 1, ease: 'power3.out' })
      const headY  = gsap.quickTo(headlineRef.current, 'y', { duration: 1, ease: 'power3.out' })
      const subX   = gsap.quickTo(subheadRef.current, 'x', { duration: 1, ease: 'power3.out' })
      const subY   = gsap.quickTo(subheadRef.current, 'y', { duration: 1, ease: 'power3.out' })

      const cardMovers = cardsRef.current.map((el) => {
        if (!el) return null
        return {
          x:   gsap.quickTo(el, 'x',        { duration: 1.4, ease: 'power3.out' }),
          y:   gsap.quickTo(el, 'y',        { duration: 1.4, ease: 'power3.out' }),
          rot: gsap.quickTo(el, 'rotation', { duration: 1.6, ease: 'power3.out' }),
        }
      })

      const onMove = (e: MouseEvent) => {
        const r  = section.getBoundingClientRect()
        const px = (e.clientX - r.left) / r.width
        const py = (e.clientY - r.top)  / r.height
        const dx = px - 0.5
        const dy = py - 0.5

        spotX(`${px * 100}%`); spotY(`${py * 100}%`)
        gridX(dx * -24);       gridY(dy * -24)
        blobX(dx * 60);        blobY(dy * 40)
        headX(dx * -10);       headY(dy * -8)
        subX(dx * -6);         subY(dy * -4)

        cardMovers.forEach((m, i) => {
          if (!m) return
          const card = floatingCards[i]
          const factor = card.depth / 50
          m.x(dx * 30 * factor); m.y(dy * 30 * factor); m.rot(card.rotate + dx * 6)
        })
      }

      const onLeave = () => {
        spotX('50%'); spotY('50%')
        gridX(0); gridY(0); blobX(0); blobY(0)
        headX(0); headY(0); subX(0); subY(0)
        cardMovers.forEach((m, i) => { if (!m) return; m.x(0); m.y(0); m.rot(floatingCards[i].rotate) })
      }

      section.addEventListener('mousemove', onMove)
      section.addEventListener('mouseleave', onLeave)
      return () => { section.removeEventListener('mousemove', onMove); section.removeEventListener('mouseleave', onLeave) }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative isolate overflow-hidden border-b border-border">
      {/* Photo backdrop */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/hero-bg.png)', filter: 'saturate(0.7) contrast(1.05) brightness(0.92)' }} aria-hidden />
      {/* Brand tint */}
      <div className="absolute inset-0 mix-blend-color" style={{ backgroundColor: 'hsl(20 70% 35%)', opacity: 0.14 }} aria-hidden />
      {/* Bokeh */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {[
          { left: '8%',  top: '18%', size: 90,  blur: 28, opacity: 0.35, delay: '0s' },
          { left: '22%', top: '70%', size: 140, blur: 36, opacity: 0.28, delay: '1.2s' },
          { left: '38%', top: '12%', size: 60,  blur: 22, opacity: 0.45, delay: '0.6s' },
          { left: '55%', top: '80%', size: 110, blur: 30, opacity: 0.30, delay: '2s' },
          { left: '68%', top: '22%', size: 80,  blur: 26, opacity: 0.40, delay: '0.9s' },
          { left: '82%', top: '62%', size: 130, blur: 34, opacity: 0.25, delay: '1.6s' },
          { left: '92%', top: '30%', size: 70,  blur: 24, opacity: 0.38, delay: '0.3s' },
          { left: '14%', top: '45%', size: 50,  blur: 18, opacity: 0.50, delay: '2.4s' },
          { left: '46%', top: '52%', size: 40,  blur: 14, opacity: 0.55, delay: '1.8s' },
        ].map((b, i) => (
          <span key={i} className="absolute rounded-full bg-primary"
            style={{ left: b.left, top: b.top, width: `${b.size}px`, height: `${b.size}px`, filter: `blur(${b.blur}px)`, opacity: b.opacity, animation: `bokehFloat ${8 + (i % 4) * 2}s ease-in-out ${b.delay} infinite alternate` }} />
        ))}
      </div>
      {/* Vignette */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 35%, transparent 0%, rgba(10,10,10,0.55) 55%, rgba(10,10,10,0.92) 90%)' }} aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background" aria-hidden />
      <div className="absolute inset-0 bg-hero-glow bg-drift opacity-40" aria-hidden />

      {/* Orbs */}
      <div ref={(el) => { orbRefs.current[0] = el }} className="pointer-events-none absolute left-[15%] top-[30%] h-72 w-72 rounded-full bg-primary/30 blur-3xl" style={{ opacity: 0.25 }} aria-hidden />
      <div ref={(el) => { orbRefs.current[1] = el }} className="pointer-events-none absolute right-[18%] top-[55%] h-96 w-96 rounded-full bg-orange-500/20 blur-3xl" style={{ opacity: 0.2 }} aria-hidden />
      <div ref={(el) => { orbRefs.current[2] = el }} className="pointer-events-none absolute left-1/2 bottom-[10%] h-80 w-80 -translate-x-1/2 rounded-full bg-amber-500/15 blur-3xl" style={{ opacity: 0.2 }} aria-hidden />

      {/* Parallax grid */}
      <div ref={gridRef} className="absolute inset-0 grid-bg opacity-40" aria-hidden />

      {/* Spotlight */}
      <div ref={spotlightRef} className="pointer-events-none absolute inset-0"
        style={{ ['--mx' as string]: '50%', ['--my' as string]: '50%', background: 'radial-gradient(500px circle at var(--mx) var(--my), rgba(249,115,22,0.25), transparent 60%)' }} aria-hidden />

      {/* Blob */}
      <div ref={blobRef} className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" aria-hidden />

      {/* Floating cards */}
      {floatingCards.map(({ Icon, label, x, y, rotate }, i) => (
        <div key={label} ref={(el) => { cardsRef.current[i] = el }}
          className="pointer-events-none absolute hidden md:block"
          style={{ left: `${x}%`, top: `${y}%`, transform: `translate(-50%, -50%) rotate(${rotate}deg)` }} aria-hidden>
          <div className="flex items-center gap-2 rounded-lg border border-border bg-card/80 px-3 py-2 shadow-2xl shadow-primary/10 backdrop-blur-md">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/15 text-primary">
              <Icon className="h-4 w-4" strokeWidth={1.75} />
            </div>
            <span className="font-mono text-xs">{label}</span>
          </div>
        </div>
      ))}

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-3xl text-center">
          <a href="/templates" className="group inline-flex items-center gap-2 rounded-full border border-border bg-background/40 px-3.5 py-1 text-xs backdrop-blur-md transition-all hover:scale-[1.03] hover:bg-secondary">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="font-mono uppercase tracking-widest text-foreground/90">SaaS Kit now live</span>
          </a>

          <h1 ref={headlineRef} className="mt-8 text-balance text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
            Ship faster,{' '}
            <span className="relative inline-block">
              <span className="font-mono italic text-foreground">look better</span>
              <span className="absolute -bottom-1 left-0 h-[3px] w-full origin-left scale-x-0 bg-primary"
                style={{ animation: 'underline 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.6s forwards' }} aria-hidden />
            </span>
          </h1>

          <p ref={subheadRef} className="mx-auto mt-6 max-w-2xl text-balance text-lg text-muted-foreground sm:text-xl">
            Production-ready UI components and full-stack kits for Expo + Next.js — with AI configs for Cursor, Claude Code, and Lovable pre-wired.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <MagneticCTA href="/templates" pill>Browse templates</MagneticCTA>
            <a href="https://github.com/open-template-forest" target="_blank" rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-5 py-2.5 text-sm font-medium backdrop-blur-md transition-all hover:scale-[1.02] hover:border-primary/40 hover:bg-card">
              <Github className="h-4 w-4" />
              Star on GitHub
              <span className="font-mono text-xs text-muted-foreground">1.2k</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>

          <div className="group mt-10 inline-flex items-center gap-3 rounded-full border border-border bg-card/70 px-5 py-2.5 font-mono text-sm shadow-lg backdrop-blur-md transition-all hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10">
            <span className="text-muted-foreground">$</span>
            <span>pnpm dlx shadcn@latest add</span>
            <span className="text-primary">otf.sh/r/button.json</span>
            <span className="ml-1 h-4 w-px bg-border" />
            <span className="font-mono text-xs text-muted-foreground transition-colors group-hover:text-foreground">⌘C</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes underline { to { transform: scaleX(1); } }
        @keyframes bokehFloat {
          0%   { transform: translate(0, 0) scale(1); }
          50%  { transform: translate(12px, -16px) scale(1.08); }
          100% { transform: translate(-10px, 14px) scale(0.95); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="bokehFloat"] { animation: none !important; }
        }
      `}</style>
    </section>
  )
}
