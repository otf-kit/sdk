'use client'

import React, { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { COMPONENTS, CATEGORIES, type ComponentCategory } from '@/lib/components-registry'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const ALL = 'All' as const
type Filter = ComponentCategory | typeof ALL

function ComponentCard({ def }: { def: (typeof COMPONENTS)[number] }) {
  return (
    <div className="component-card group flex flex-col bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl overflow-hidden hover:border-[#2a2a2a] hover:shadow-[0_0_30px_rgba(249,115,22,0.04)] transition-all duration-300 cursor-pointer opacity-0">
      <div className="h-[180px] border-b border-[#111] bg-[#080808] relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid opacity-20 pointer-events-none" />
        {def.preview}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b from-transparent via-transparent to-[#f97316]/3 pointer-events-none" />
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-white text-sm font-semibold leading-snug">{def.name}</h3>
          <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#111] border border-[#1f1f1f] text-[#525252] uppercase tracking-wider shrink-0 font-medium">
            {def.category}
          </span>
        </div>
        <p className="text-[#525252] text-[11px] leading-relaxed line-clamp-2">{def.description}</p>
        <div className="flex flex-wrap gap-1 mt-auto pt-1">
          {def.tags.map(tag => (
            <span key={tag} className="text-[9px] px-2 py-0.5 rounded border border-[#1a1a1a] text-[#333] font-mono">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function AnimatedCount({ to, duration = 1.2 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    if (!ref.current) return
    const obj = { val: 0 }
    gsap.to(obj, {
      val: to,
      duration,
      ease: 'power2.out',
      onUpdate() {
        if (ref.current) ref.current.textContent = Math.floor(obj.val).toString()
      },
    })
  }, [to, duration])
  return <span ref={ref}>0</span>
}

export function ComponentsClient() {
  const [filter, setFilter] = useState<Filter>(ALL)
  const [search, setSearch] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)

  const visible = COMPONENTS.filter(c => {
    const matchCat = filter === ALL || c.category === filter
    const matchSearch = search === '' || c.name.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase()) || c.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
    return matchCat && matchSearch
  })

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.set('.component-card', { y: 24, opacity: 0 })
      ScrollTrigger.batch('.component-card', {
        onEnter: (batch) =>
          gsap.to(batch, { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: 'power2.out', overwrite: true }),
        onLeaveBack: (batch) =>
          gsap.set(batch, { opacity: 0, y: 24 }),
        start: 'top 92%',
      })
    }, containerRef)
    return () => ctx.revert()
  }, { scope: containerRef, dependencies: [filter, search] })

  return (
    <div ref={containerRef}>
      <div className="flex flex-wrap items-center gap-6 mb-8">
        {CATEGORIES.map(cat => {
          const count = COMPONENTS.filter(c => c.category === cat).length
          return (
            <button
              key={cat}
              onClick={() => setFilter(filter === cat ? ALL : cat)}
              className={`flex items-center gap-2 transition-colors ${filter === cat ? 'text-[#f97316]' : 'text-[#525252] hover:text-[#a3a3a3]'}`}
            >
              <span className="text-xl font-black tabular-nums">{count}</span>
              <span className="text-xs uppercase tracking-widest font-medium">{cat}</span>
            </button>
          )
        })}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-10">
        <div className="relative flex-1 max-w-sm">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#525252]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          <input
            type="text"
            placeholder="Search components…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full h-9 bg-[#0d0d0d] border border-[#1f1f1f] focus:border-[#f97316]/40 rounded-lg pl-9 pr-3 text-sm text-white placeholder:text-[#333] focus:outline-none transition-colors"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#525252] hover:text-white">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setFilter(ALL)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${filter === ALL ? 'bg-[#f97316]/10 border-[#f97316]/30 text-[#f97316]' : 'border-[#1a1a1a] text-[#525252] hover:text-white hover:border-[#2a2a2a]'}`}
          >
            All
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(filter === cat ? ALL : cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${filter === cat ? 'bg-[#f97316]/10 border-[#f97316]/30 text-[#f97316]' : 'border-[#1a1a1a] text-[#525252] hover:text-white hover:border-[#2a2a2a]'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-12 h-12 rounded-xl bg-[#111] border border-[#1f1f1f] flex items-center justify-center mb-4">
            <svg className="w-5 h-5 text-[#525252]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </div>
          <p className="text-white text-sm font-semibold mb-1">No components found</p>
          <p className="text-[#525252] text-xs">Try a different search or category</p>
          <button onClick={() => { setSearch(''); setFilter(ALL) }} className="mt-4 text-xs text-[#f97316] hover:text-[#fb923c]">Clear filters</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {visible.map(def => <ComponentCard key={def.name} def={def} />)}
        </div>
      )}

      {visible.length > 0 && (
        <p className="text-center text-[#333] text-xs mt-12 font-mono">
          Showing {visible.length} of {COMPONENTS.length} components
        </p>
      )}
    </div>
  )
}

export { AnimatedCount }
