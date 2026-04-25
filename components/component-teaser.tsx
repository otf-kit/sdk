'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { COMPONENTS } from '@/lib/components-registry'

gsap.registerPlugin(ScrollTrigger, useGSAP)

// Pick representative components for each marquee row
const ROW_1_NAMES = ['Button', 'DataGrid', 'Badge', 'TextureCard', 'MetricCard', 'CommandPalette', 'BarChart', 'Dialog', 'Toast']
const ROW_2_NAMES = ['Sidebar', 'Progress', 'Kanban', 'Avatar', 'DatePicker', 'Timeline', 'LineChart', 'EmptyState', 'StepForm']
const ROW_3_NAMES = ['Select', 'WorkspaceMembers', 'DonutChart', 'Checkbox', 'Alert', 'AppShell', 'FileCards', 'Tabs', 'Slider']

function getComps(names: string[]) {
  return names
    .map(n => COMPONENTS.find(c => c.name === n))
    .filter(Boolean) as typeof COMPONENTS
}

function MarqueeCard({ def }: { def: (typeof COMPONENTS)[number] }) {
  return (
    <div className="flex-shrink-0 w-[220px] group">
      <div className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl overflow-hidden group-hover:border-[#2a2a2a] group-hover:shadow-[0_0_20px_rgba(249,115,22,0.05)] transition-all duration-300">
        {/* Preview */}
        <div className="h-[140px] bg-[#080808] border-b border-[#111] relative overflow-hidden">
          <div className="absolute inset-0 bg-dot-grid opacity-15 pointer-events-none" />
          <div className="w-full h-full flex items-center justify-center p-4 scale-[0.85] origin-center">
            {def.preview}
          </div>
        </div>
        {/* Footer */}
        <div className="px-3 py-2.5 flex items-center justify-between">
          <div>
            <div className="text-white text-xs font-semibold">{def.name}</div>
            <div className="text-[#333] text-[9px] font-mono mt-0.5">{def.tags[0]}</div>
          </div>
          <span className="text-[9px] px-1.5 py-0.5 rounded border border-[#1a1a1a] text-[#333] uppercase tracking-wider">
            {def.category.split(' ')[0]}
          </span>
        </div>
      </div>
    </div>
  )
}

function MarqueeRow({ names, direction }: { names: string[]; direction: 'left' | 'right' }) {
  const comps = getComps(names)
  // Duplicate for seamless loop
  const doubled = [...comps, ...comps]

  return (
    <div className="overflow-hidden w-full">
      <div className={`flex gap-3 ${direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'}`}
        style={{ width: 'max-content' }}>
        {doubled.map((def, i) => (
          <MarqueeCard key={`${def.name}-${i}`} def={def} />
        ))}
      </div>
    </div>
  )
}

export function ComponentTeaser() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        once: true,
      },
      defaults: { ease: 'power3.out' },
    })

    tl.from('.teaser-label', { opacity: 0, y: -10, duration: 0.4 })
      .from('.teaser-title', { opacity: 0, y: 30, duration: 0.6, stagger: 0.08 }, '<0.1')
      .from('.teaser-sub', { opacity: 0, y: 12, duration: 0.5 }, '<0.3')
      .from('.teaser-cats', { opacity: 0, y: 16, duration: 0.5 }, '<0.2')
      .from('.teaser-cta', { opacity: 0, y: 10, duration: 0.4 }, '<0.2')
      .from('.teaser-row', { opacity: 0, y: 30, duration: 0.6, stagger: 0.12 }, '<0.1')
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="py-24 border-t border-[#111111] overflow-hidden">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-14">
        <div className="flex flex-col lg:flex-row lg:items-end gap-10">
          {/* Left copy */}
          <div className="lg:w-[420px] shrink-0">
            <p className="teaser-label text-xs font-semibold text-[#f97316] uppercase tracking-widest mb-4">
              Component Library
            </p>
            <div className="h-px w-16 bg-[#f97316]/40 mb-6" />

            <h2 className="mb-5">
              <span className="teaser-title inline-block text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tighter leading-[1.05] uppercase">
                180+ components.
              </span>
              <br />
              <span className="teaser-title inline-block text-3xl md:text-4xl lg:text-5xl font-black text-[#333] tracking-tighter leading-[1.05] uppercase">
                Every category covered.
              </span>
            </h2>

            <p className="teaser-sub text-[#525252] text-sm leading-relaxed mb-8">
              Buttons, data tables, charts, forms, navigation, feedback — fully typed, accessible, and built for dark UIs.
            </p>

            {/* Category list */}
            <div className="teaser-cats space-y-2.5 mb-8">
              {[
                { label: 'Primitives', count: '42', desc: 'Button, Input, Select, Dialog…' },
                { label: 'Data Display', count: '28', desc: 'Table, Chart, Timeline, Card…' },
                { label: 'Navigation', count: '18', desc: 'Sidebar, Command, Tabs…' },
                { label: 'Feedback', count: '16', desc: 'Toast, Badge, Alert, Skeleton…' },
                { label: 'Layout', count: '24', desc: 'AppShell, PageContainer, Grid…' },
                { label: 'Forms', count: '22', desc: 'AutoForm, Field, DatePicker…' },
              ].map(cat => (
                <div key={cat.label} className="flex items-center gap-3 py-2 border-b border-[#0f0f0f] last:border-0">
                  <div className="w-8 h-8 rounded-md bg-[#111] border border-[#1a1a1a] flex items-center justify-center shrink-0">
                    <span className="text-[#f97316] text-[10px] font-black">{cat.count}</span>
                  </div>
                  <div className="min-w-0">
                    <div className="text-white text-xs font-semibold">{cat.label}</div>
                    <div className="text-[#333] text-[10px]">{cat.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/components"
              className="teaser-cta inline-flex items-center gap-2 text-sm text-[#f97316] hover:text-[#fb923c] font-semibold transition-colors">
              Browse all 180+ components
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>

          {/* Right — 3-row marquee */}
          <div className="flex-1 min-w-0 space-y-3">
            <div className="teaser-row">
              <MarqueeRow names={ROW_1_NAMES} direction="left" />
            </div>
            <div className="teaser-row">
              <MarqueeRow names={ROW_2_NAMES} direction="right" />
            </div>
            <div className="teaser-row">
              <MarqueeRow names={ROW_3_NAMES} direction="left" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom strip — component count bar */}
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-[#0f0f0f]">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
          <span className="text-[#333] text-xs">Open source · MIT · Zero lock-in</span>
          <div className="flex-1 h-px bg-[#0f0f0f]" />
          <Link href="/components" className="text-xs text-[#525252] hover:text-white transition-colors flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Live previews · No screenshots
          </Link>
        </div>
      </div>
    </section>
  )
}
