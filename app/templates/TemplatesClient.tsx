'use client'

import { useState } from 'react'

const templates = [
  {
    name: 'SaaS Dashboard Kit',
    subtitle: 'Linear-class project tracker with auth, payments, and team management',
    platform: 'Vite + Hono',
    tags: ['TypeScript', 'React 19', 'Hono', 'Drizzle', 'Better Auth', 'Polar'],
    price: '$149',
    status: 'available',
    category: 'Full-stack',
    demo: 'https://saas-dashboard-production-ae3f.up.railway.app',
    purchase: '/templates/saas-dashboard',
    accent: '#f97316',
    screens: 11,
    description: 'Full-stack SaaS starter with 11 screens, real Postgres data, auth, and AI configs pre-wired.',
    preview: {
      sidebar: ['Dashboard', 'Issues', 'Board', 'Backlog', 'Projects', 'Teams'],
      stat: { label: 'Issues', value: '50', trend: '+12%', trendColor: 'text-green-400' },
    },
  },
  {
    name: 'AI Wrapper Kit',
    subtitle: 'LLM-powered app with streaming chat, tools, and usage billing',
    platform: 'Next.js + Hono',
    tags: ['TypeScript', 'AI SDK', 'Streaming', 'Polar', 'Drizzle'],
    price: '$149',
    status: 'soon',
    category: 'Full-stack',
    demo: null,
    purchase: null,
    accent: '#a78bfa',
    screens: 8,
    description: 'Chat interface, tool calls, streaming responses, and credit-based billing out of the box.',
    preview: null,
  },
  {
    name: 'Marketplace Kit',
    subtitle: 'Buy/sell platform with listings, search, reviews, and Stripe Connect',
    platform: 'Next.js + Hono',
    tags: ['TypeScript', 'Stripe Connect', 'Search', 'S3'],
    price: '$199',
    status: 'soon',
    category: 'Full-stack',
    demo: null,
    purchase: null,
    accent: '#22c55e',
    screens: 12,
    description: 'Full marketplace with seller onboarding, listings, search, and split payments.',
    preview: null,
  },
  {
    name: 'E-commerce Kit',
    subtitle: 'Shopify-style store with cart, checkout, and inventory management',
    platform: 'Next.js + Hono',
    tags: ['TypeScript', 'Stripe', 'Inventory', 'Cart'],
    price: '$149',
    status: 'soon',
    category: 'Full-stack',
    demo: null,
    purchase: null,
    accent: '#f59e0b',
    screens: 10,
    description: 'Product catalog, cart, checkout, and admin inventory panel — all type-safe.',
    preview: null,
  },
]

const filters = ['All', 'Full-stack', 'Available'] as const
type Filter = typeof filters[number]

function SaasDashboardPreview({ accent }: { accent: string }) {
  return (
    <div className="h-[200px] bg-[#0a0a0a] flex overflow-hidden rounded-t-lg">
      {/* Mini sidebar */}
      <div className="w-[110px] shrink-0 border-r border-[#1a1a1a] flex flex-col">
        <div className="h-8 border-b border-[#1a1a1a] flex items-center px-2 gap-1.5">
          <div className="w-4 h-4 rounded-sm flex items-center justify-center" style={{ background: accent }}>
            <span className="text-white text-[7px] font-black">O</span>
          </div>
          <span className="text-white text-[9px] font-semibold truncate">OTF</span>
        </div>
        <div className="flex-1 p-1.5 space-y-0.5">
          {['Dashboard', 'Issues', 'Board', 'Projects', 'Teams'].map((item, i) => (
            <div key={item} className={`flex items-center gap-1.5 px-2 py-1 rounded text-[8px] transition-colors ${
              i === 0 ? 'text-white font-medium' : 'text-[#525252]'
            }`} style={i === 0 ? { background: `${accent}15`, borderLeft: `1.5px solid ${accent}` } : {}}>
              <div className="w-1 h-1 rounded-full" style={{ background: i === 0 ? accent : '#333333' }} />
              {item}
            </div>
          ))}
        </div>
      </div>
      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="h-8 border-b border-[#1a1a1a] flex items-center px-3">
          <span className="text-white text-[9px] font-bold">Dashboard</span>
          <div className="ml-auto h-5 px-2 rounded text-[8px] text-white font-bold flex items-center" style={{ background: accent }}>
            + New
          </div>
        </div>
        <div className="grid grid-cols-2 gap-1.5 p-2 border-b border-[#1a1a1a]">
          {[
            { label: 'Total', value: '50', trend: '+12%' },
            { label: 'Done', value: '18', trend: '36%' },
            { label: 'Active', value: '12', trend: '24%' },
            { label: 'Open', value: '32', trend: '-2%' },
          ].map(stat => (
            <div key={stat.label} className="bg-[#111111] border border-[#1a1a1a] rounded p-1.5">
              <div className="text-[7px] text-[#525252] uppercase">{stat.label}</div>
              <div className="text-xs font-black text-white">{stat.value}</div>
            </div>
          ))}
        </div>
        <div className="flex-1 p-2 flex gap-2">
          <div className="flex-1 bg-[#111111] border border-[#1a1a1a] rounded p-1.5 flex flex-col">
            <div className="text-[7px] text-[#525252] mb-1">Trend</div>
            <div className="flex-1 flex items-end gap-0.5">
              {[30,45,35,60,50,75,65,80,70,85,78,90].map((h,i) => (
                <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: i===11?accent:`rgba(249,115,22,0.2)` }} />
              ))}
            </div>
          </div>
          <div className="flex-1 bg-[#111111] border border-[#1a1a1a] rounded p-1.5">
            <div className="text-[7px] text-[#525252] mb-1.5">Status</div>
            <div className="space-y-1">
              {[{p:36,c:'#22c55e'},{p:24,c:'#f59e0b'},{p:24,c:'#3b82f6'},{p:16,c:'#525252'}].map((s,i)=>(
                <div key={i} className="flex items-center gap-1">
                  <div className="flex-1 h-1 bg-[#1f1f1f] rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{width:`${s.p}%`,background:s.c}} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ComingSoonPreview({ accent, name }: { accent: string; name: string }) {
  return (
    <div className="h-[200px] bg-[#0a0a0a] flex items-center justify-center rounded-t-lg">
      <div className="text-center">
        <div className="w-10 h-10 rounded-xl border border-[#1f1f1f] flex items-center justify-center mx-auto mb-3" style={{ background: `${accent}10`, borderColor: `${accent}20` }}>
          <svg className="w-5 h-5" style={{ color: accent }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z"/></svg>
        </div>
        <div className="text-[#525252] text-xs">{name}</div>
        <div className="text-[#333333] text-[10px] mt-0.5">Coming soon</div>
      </div>
    </div>
  )
}

export function TemplatesClient() {
  const [activeFilter, setActiveFilter] = useState<Filter>('All')

  const filtered = templates.filter((t) => {
    if (activeFilter === 'All') return true
    if (activeFilter === 'Full-stack') return t.category === 'Full-stack'
    if (activeFilter === 'Available') return t.status === 'available'
    return true
  })

  return (
    <>
      {/* Filter chips */}
      <div className="flex gap-2 flex-wrap mb-10">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors border ${
              activeFilter === f
                ? 'bg-[#f97316] border-[#f97316] text-white'
                : 'border-[#1f1f1f] text-[#737373] hover:border-[#333333] hover:text-white'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filtered.map((t) => (
          <div
            key={t.name}
            className={`flex flex-col rounded-xl border overflow-hidden transition-all hover:border-opacity-60 ${
              t.status === 'available'
                ? 'border-[#f97316]/20 bg-[#0d0d0d] hover:shadow-[0_0_30px_rgba(249,115,22,0.06)]'
                : 'border-[#1a1a1a] bg-[#0a0a0a]'
            }`}
          >
            {/* App preview panel */}
            <div className="border-b border-[#1a1a1a]">
              {/* Chrome bar */}
              <div className="h-8 flex items-center px-3 gap-2 bg-[#111111] border-b border-[#1a1a1a]">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded px-3 py-0.5 text-[10px] text-[#525252] font-mono max-w-[200px] w-full text-center truncate">
                    {t.demo ? t.demo.replace('https://', '') : `${t.name.toLowerCase().replace(/\s+/g, '-')}.otf.sh`}
                  </div>
                </div>
                <div className="w-10" />
              </div>

              {t.status === 'available' ? (
                <SaasDashboardPreview accent={t.accent} />
              ) : (
                <ComingSoonPreview accent={t.accent} name={t.name} />
              )}
            </div>

            {/* Card body */}
            <div className="p-5 flex flex-col gap-3 flex-1">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="font-bold text-white text-base">{t.name}</h3>
                    {t.status === 'available' ? (
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 font-bold uppercase tracking-wide">Live</span>
                    ) : (
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#1f1f1f] text-[#525252] border border-[#333333] font-bold uppercase tracking-wide">Soon</span>
                    )}
                  </div>
                  <p className="text-sm text-[#525252]">{t.subtitle}</p>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xl font-black text-white">{t.price}</div>
                  <div className="text-[10px] text-[#525252]">one-time</div>
                </div>
              </div>

              <p className="text-[#737373] text-xs leading-relaxed">{t.description}</p>

              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] px-2 py-0.5 rounded border border-[#1f1f1f] text-[#525252]">{t.screens} screens</span>
                <span className="text-[10px] px-2 py-0.5 rounded border" style={{ borderColor: `${t.accent}30`, color: t.accent, background: `${t.accent}08` }}>
                  {t.platform}
                </span>
                {t.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 rounded border border-[#1a1a1a] text-[#525252]">
                    {tag}
                  </span>
                ))}
                {t.tags.length > 3 && (
                  <span className="text-[10px] text-[#333333]">+{t.tags.length - 3}</span>
                )}
              </div>

              <div className="flex gap-2 mt-auto pt-1">
                {t.demo ? (
                  <a
                    href={t.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-sm text-center px-4 py-2.5 border border-[#333333] text-white hover:bg-[#111111] rounded-md transition-colors font-medium"
                  >
                    View demo →
                  </a>
                ) : (
                  <button
                    disabled
                    className="flex-1 text-sm text-center px-4 py-2.5 border border-[#1a1a1a] text-[#333333] rounded-md cursor-not-allowed"
                  >
                    Demo soon
                  </button>
                )}
                {t.status === 'available' ? (
                  <a
                    href={t.purchase ?? '#'}
                    className="flex-1 text-sm text-center px-4 py-2.5 rounded-md transition-colors font-bold text-white"
                    style={{ background: t.accent }}
                  >
                    Get template →
                  </a>
                ) : (
                  <a
                    href="/#waitlist"
                    className="flex-1 text-sm text-center px-4 py-2.5 rounded-md bg-[#111111] border border-[#1f1f1f] text-[#737373] hover:text-white hover:border-[#333333] transition-colors font-medium"
                  >
                    Join waitlist
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
