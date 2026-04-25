'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-24 pb-0 px-6 flex flex-col items-center justify-center min-h-[85vh]">
      {/* Dot grid background */}
      <div className="absolute inset-0 bg-dot-grid opacity-60 pointer-events-none" />

      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[600px] h-[600px] rounded-full bg-[#f97316]/8 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Status pill */}
        <div className="inline-flex items-center gap-2 mb-8 px-3 py-1.5 rounded-full border border-[#f97316]/20 bg-[#f97316]/8 text-[#f97316] text-xs font-semibold">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f97316] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#f97316]"></span>
          </span>
          Early Access · SaaS Dashboard Kit now available
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-7xl md:text-[7rem] font-black tracking-tighter text-white mb-6 leading-[1.0] uppercase">
          Open Theme,{' '}
          <br />
          <span className="text-orange-gradient">Expanded.</span>
        </h1>

        <p className="text-lg sm:text-xl text-[#737373] max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
          180+ animated components and full-stack templates. Free, open source, built to drop into any React project — with AI configs pre-wired for Cursor, Claude, and Lovable.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
          <Link href="/components"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-black hover:bg-[#f5f5f5] font-bold rounded-md transition-colors uppercase tracking-widest text-sm w-full sm:w-auto">
            Browse 180+ Components
          </Link>
          <Link href="https://github.com/open-template-forest" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-[#333333] text-white hover:bg-[#111111] font-bold rounded-md transition-colors uppercase tracking-widest text-sm w-full sm:w-auto">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            GitHub 1.2k
          </Link>
        </div>

        {/* Tech stack badges */}
        <div className="flex items-center justify-center gap-4 text-[#525252] text-[11px] font-bold tracking-[0.18em] uppercase mb-16">
          {['React', 'Tailwind CSS', 'Radix UI', 'Hono', 'Better Auth'].map((tech, i) => (
            <span key={tech} className="flex items-center gap-4">
              {i > 0 && <span className="w-1 h-1 rounded-full bg-[#333333]" />}
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Preview panel — browser chrome with actual product preview */}
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <HeroBrowserChrome />
      </div>
    </section>
  )
}

function HeroBrowserChrome() {
  return (
    <div className="relative rounded-t-xl overflow-hidden border border-[#1f1f1f] border-b-0 shadow-[0_-20px_80px_rgba(249,115,22,0.08)]">
      {/* Browser chrome header */}
      <div className="h-10 bg-[#111111] border-b border-[#1f1f1f] flex items-center px-4 gap-3 shrink-0">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-md px-4 py-1 text-[11px] text-[#525252] font-mono max-w-[300px] w-full text-center">
            saas-dashboard.otf.sh
          </div>
        </div>
        <div className="w-16" />
      </div>

      {/* App preview */}
      <div className="flex h-[480px] bg-[#0d0d0d]">
        {/* Sidebar */}
        <div className="w-[200px] shrink-0 border-r border-[#1a1a1a] flex flex-col bg-[#0d0d0d]">
          {/* Workspace header */}
          <div className="h-[52px] border-b border-[#1a1a1a] flex items-center px-3 gap-2">
            <div className="w-6 h-6 rounded-md bg-[#f97316] flex items-center justify-center shrink-0">
              <span className="text-white text-[10px] font-black leading-none">O</span>
            </div>
            <span className="text-white text-sm font-semibold truncate">OTF Workspace</span>
          </div>
          {/* Nav items */}
          <div className="flex-1 p-2 space-y-0.5">
            {[
              { label: 'Dashboard', active: true },
              { label: 'All Issues' },
              { label: 'Board' },
              { label: 'Backlog' },
              { label: 'Inbox' },
              { label: 'Projects' },
              { label: 'Teams' },
            ].map(item => (
              <div key={item.label}
                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs transition-colors ${
                  item.active ? 'bg-[#f97316]/10 text-[#f97316] font-medium border-l-2 border-[#f97316]' : 'text-[#525252] hover:text-[#a3a3a3]'
                }`}>
                <div className={`w-1.5 h-1.5 rounded-full ${item.active ? 'bg-[#f97316]' : 'bg-[#333333]'}`} />
                {item.label}
              </div>
            ))}
          </div>
          {/* Footer */}
          <div className="border-t border-[#1a1a1a] p-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#f97316]/20 flex items-center justify-center">
                <span className="text-[#f97316] text-[9px] font-bold">M</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] text-white font-medium truncate">Dave Soni</div>
                <div className="text-[9px] text-[#525252] truncate">dave@otf.sh</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Page header */}
          <div className="h-14 border-b border-[#1a1a1a] flex items-center px-6 gap-4">
            <div>
              <div className="text-white text-sm font-bold">Dashboard</div>
              <div className="text-[10px] text-[#525252]">Good morning, Dave</div>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <div className="h-7 px-3 rounded-md bg-[#f97316] text-white text-xs font-bold flex items-center gap-1">
                <span>+</span> New issue
              </div>
            </div>
          </div>

          {/* KPI row */}
          <div className="grid grid-cols-4 gap-3 p-4 border-b border-[#1a1a1a]">
            {[
              { label: 'Total Issues', value: '50', trend: '+12%' },
              { label: 'In Progress', value: '12', trend: '24%' },
              { label: 'Completed', value: '18', trend: '36%' },
              { label: 'Open', value: '32', trend: '-2%' },
            ].map(stat => (
              <div key={stat.label} className="bg-[#111111] border border-[#1f1f1f] rounded-lg p-3">
                <div className="text-[9px] text-[#525252] font-medium uppercase tracking-wider mb-1">{stat.label}</div>
                <div className="text-xl font-black text-white leading-none">{stat.value}</div>
                <div className={`text-[9px] mt-1 font-semibold ${stat.trend.startsWith('+') ? 'text-green-500' : stat.trend.startsWith('-') ? 'text-red-400' : 'text-[#f97316]'}`}>{stat.trend}</div>
              </div>
            ))}
          </div>

          {/* Chart area */}
          <div className="flex-1 p-4 grid grid-cols-2 gap-3 overflow-hidden">
            <div className="bg-[#111111] border border-[#1f1f1f] rounded-lg p-3 flex flex-col">
              <div className="text-[10px] text-[#525252] font-medium mb-2">Issue Trend</div>
              <div className="flex-1 flex items-end gap-1 pb-1">
                {[30, 45, 35, 60, 50, 75, 65, 80, 70, 85, 78, 90].map((h, i) => (
                  <div key={i} className="flex-1 rounded-sm"
                    style={{ height: `${h}%`, background: `rgba(249,115,22,${i === 11 ? 0.9 : 0.3 + i * 0.04})` }} />
                ))}
              </div>
            </div>
            <div className="bg-[#111111] border border-[#1f1f1f] rounded-lg p-3">
              <div className="text-[10px] text-[#525252] font-medium mb-3">Status Distribution</div>
              <div className="space-y-2">
                {[
                  { label: 'Done', pct: 36, color: '#22c55e' },
                  { label: 'In Progress', pct: 24, color: '#f59e0b' },
                  { label: 'Todo', pct: 24, color: '#3b82f6' },
                  { label: 'Backlog', pct: 16, color: '#525252' },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: item.color }} />
                    <div className="flex-1 h-1.5 bg-[#1f1f1f] rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${item.pct}%`, background: item.color }} />
                    </div>
                    <span className="text-[9px] text-[#525252] w-6 text-right">{item.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
