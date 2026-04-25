'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { CATEGORIES, COMPONENTS, type ComponentCategory } from '@/lib/components-registry'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const CATEGORY_COLORS: Record<ComponentCategory | string, string> = {
  'Primitives': '#f97316',
  'Data Display': '#3b82f6',
  'Navigation': '#a78bfa',
  'Feedback': '#22c55e',
  'Layout': '#f59e0b',
  'Forms': '#ec4899',
  'Blocks': '#06b6d4',
  'Charts': '#f43f5e',
}

export function ComponentsHero({ total }: { total: number }) {
  const heroRef = useRef<HTMLDivElement>(null)
  const countRef = useRef<HTMLSpanElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    // Pill entrance
    tl.from('.hero-pill', { opacity: 0, y: -16, duration: 0.5 })

    // Count up animation on the number
    if (countRef.current) {
      const obj = { val: 0 }
      tl.to(obj, {
        val: total,
        duration: 1.2,
        ease: 'power2.out',
        onUpdate() {
          if (countRef.current) countRef.current.textContent = Math.floor(obj.val) + '+'
        },
      }, '<0.1')
    }

    // Title words stagger
    tl.from('.hero-word', { opacity: 0, y: 30, duration: 0.6, stagger: 0.08 }, '<0.2')

    // Subtitle
    tl.from('.hero-sub', { opacity: 0, y: 12, duration: 0.5 }, '<0.3')

    // Stat pills stagger
    tl.from('.hero-stat', { opacity: 0, y: 16, duration: 0.4, stagger: 0.06 }, '<0.1')

    // Category tags stagger
    tl.from('.cat-tag', { opacity: 0, scale: 0.85, duration: 0.35, stagger: 0.04, ease: 'back.out(1.4)' }, '<0.1')

    // Scroll-driven fade out on the hero
    ScrollTrigger.create({
      trigger: heroRef.current,
      start: 'bottom 60%',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        if (heroRef.current) {
          gsap.set(heroRef.current, { opacity: 1 - self.progress * 0.4 })
        }
      }
    })
  }, { scope: heroRef })

  return (
    <section ref={heroRef} className="relative pt-28 pb-16 px-6 overflow-hidden border-b border-[#111]">
      {/* Background dot grid */}
      <div className="absolute inset-0 bg-dot-grid opacity-30 pointer-events-none" />
      {/* Orange glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[#f97316]/5 blur-[100px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Pill */}
        <div className="hero-pill inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-[#1f1f1f] bg-[#111] text-[#525252] text-xs font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-[#f97316] animate-pulse" />
          Free & open source · MIT License
        </div>

        {/* Headline with split words */}
        <h1 ref={titleRef} className="text-5xl sm:text-7xl md:text-[7rem] font-black tracking-tighter leading-[1.0] uppercase mb-6 overflow-hidden">
          <span className="hero-word inline-block"><span ref={countRef} className="text-orange-gradient">{total}+</span></span>{' '}
          <span className="hero-word inline-block text-white">UI</span>{' '}
          <span className="hero-word inline-block text-white">Blocks</span>
        </h1>

        <p className="hero-sub text-lg text-[#737373] max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
          Live interactive previews. Copy and paste what you need. Free, open source, built for dark UIs.
        </p>

        {/* Stats row */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
          {[
            { value: total + '+', label: 'Components' },
            { value: '8', label: 'Categories' },
            { value: '5', label: 'Themes' },
            { value: 'MIT', label: 'License' },
          ].map(stat => (
            <div key={stat.label} className="hero-stat flex items-center gap-2 text-center">
              <span className="text-2xl font-black text-white">{stat.value}</span>
              <span className="text-[#525252] text-xs uppercase tracking-widest">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Category tag cloud */}
        <div className="flex flex-wrap justify-center gap-2">
          {CATEGORIES.map(cat => {
            const count = COMPONENTS.filter(c => c.category === cat).length
            const color = CATEGORY_COLORS[cat] ?? '#525252'
            return (
              <div key={cat} className="cat-tag flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium"
                style={{ borderColor: `${color}25`, background: `${color}08`, color }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
                {cat}
                <span className="opacity-50 font-mono">{count}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
