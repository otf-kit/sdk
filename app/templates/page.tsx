import type { Metadata } from 'next'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { TemplatesClient } from './TemplatesClient'

export const metadata: Metadata = {
  title: 'Templates — OTF',
  description: 'Full-stack templates with auth, payments, and AI configs pre-wired. Drop in and ship.',
}

export default function TemplatesPage() {
  return (
    <main className="min-h-dvh bg-[#0a0a0a] flex flex-col">
      <Nav />
      <div className="flex-1 max-w-7xl mx-auto px-6 pt-28 pb-24 w-full">
        <div className="mb-14">
          <p className="text-xs font-semibold text-[#f97316] uppercase tracking-widest mb-3">
            Templates
          </p>
          <div className="h-px w-16 bg-[#f97316]/40 mb-6" />
          <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-12">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-3">
                Your idea, already<br />
                <span className="text-[#f97316]">half-built.</span>
              </h1>
              <p className="text-[#525252] text-lg max-w-xl leading-relaxed">
                Open any kit in Cursor or Claude Code. Describe what your product does. Ship in days — not months.
              </p>
            </div>
            <div className="flex gap-6 shrink-0">
              {[
                { value: '4', label: 'Templates' },
                { value: '1', label: 'Available now' },
                { value: '$149', label: 'Starting at' },
              ].map(stat => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-black text-white">{stat.value}</div>
                  <div className="text-[10px] text-[#525252] uppercase tracking-widest mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 mb-10 py-4 px-5 rounded-xl bg-[#0d0d0d] border border-[#1a1a1a]">
          {[
            'Works with Cursor, Claude Code & Lovable',
            'CLAUDE.md + .cursorrules in every kit',
            'One-time payment — no subscription ever',
            '14-day refund guarantee',
          ].map(item => (
            <div key={item} className="flex items-center gap-2 text-sm text-[#737373]">
              <span className="text-[#f97316] font-bold text-xs">✓</span>
              {item}
            </div>
          ))}
        </div>

        <TemplatesClient />
      </div>
      <Footer />
    </main>
  )
}
