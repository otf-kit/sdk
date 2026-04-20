'use client'

import { useState } from 'react'

const templates = [
  {
    name: 'SaaS Dashboard Kit',
    subtitle: 'Full-stack SaaS with auth, billing, and team management',
    platform: 'Expo + Next.js',
    tags: ['TypeScript', 'Tamagui', 'Radix', 'Hono', 'Supabase', 'Polar'],
    price: '$149',
    status: 'In Development',
    category: 'Full-stack',
  },
  {
    name: 'Marketplace Kit',
    subtitle: 'Buy/sell platform with listings, search, and payments',
    platform: 'Expo + Next.js',
    tags: ['TypeScript', 'Tamagui', 'Stripe'],
    price: '$149',
    status: 'Coming Soon',
    category: 'Full-stack',
  },
  {
    name: 'Fitness App',
    subtitle: 'Workout tracker with progress charts and social features',
    platform: 'Expo',
    tags: ['TypeScript', 'Tamagui', 'NativeWind'],
    price: '$99',
    status: 'Coming Soon',
    category: 'Mobile',
  },
  {
    name: 'Delivery App',
    subtitle: 'On-demand delivery with maps, tracking, and driver app',
    platform: 'Expo',
    tags: ['TypeScript', 'Maps', 'Realtime'],
    price: '$99',
    status: 'Coming Soon',
    category: 'Mobile',
  },
  {
    name: 'E-commerce Kit',
    subtitle: 'Shopify-style store with cart, checkout, and inventory',
    platform: 'Expo + Next.js',
    tags: ['TypeScript', 'Tamagui', 'Stripe', 'Radix'],
    price: '$149',
    status: 'Coming Soon',
    category: 'Full-stack',
  },
  {
    name: 'AI Wrapper Kit',
    subtitle: 'LLM-powered app with streaming chat, tools, and billing',
    platform: 'Expo + Next.js',
    tags: ['TypeScript', 'AI SDK', 'Streaming', 'Polar'],
    price: '$149',
    status: 'Coming Soon',
    category: 'Full-stack',
  },
]

const filters = ['All', 'Mobile', 'Web', 'Full-stack'] as const
type Filter = (typeof filters)[number]

export function TemplatesClient() {
  const [activeFilter, setActiveFilter] = useState<Filter>('All')

  const filtered = templates.filter((t) => {
    if (activeFilter === 'All') return true
    if (activeFilter === 'Mobile') return t.platform === 'Expo'
    if (activeFilter === 'Web') return t.platform === 'Next.js'
    if (activeFilter === 'Full-stack') return t.category === 'Full-stack'
    return true
  })

  return (
    <>
      <div className="flex gap-2 flex-wrap mb-10">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
              activeFilter === f
                ? 'bg-indigo-600 border-indigo-500 text-white'
                : 'border-zinc-700 text-[#a1a1aa] hover:border-zinc-500 hover:text-[#fafafa]'
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
            className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 flex flex-col gap-4"
            style={{ boxShadow: 'var(--shadow-card)' }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-[#fafafa] text-lg">{t.name}</h3>
                </div>
                <p className="text-sm text-[#a1a1aa]">{t.subtitle}</p>
              </div>
              <span className="font-bold text-[#fafafa] text-xl shrink-0">{t.price}</span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs px-2.5 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400">
                {t.platform}
              </span>
              {t.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded border border-zinc-700 text-zinc-400"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div>
              <span
                className={`text-xs px-2.5 py-1 rounded-full border font-medium ${
                  t.status === 'In Development'
                    ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                    : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                }`}
              >
                {t.status}
              </span>
            </div>
            <div className="flex gap-3 mt-auto">
              <button
                disabled
                className="flex-1 text-sm text-center px-4 py-2 border border-zinc-800 text-zinc-600 rounded-lg cursor-not-allowed"
              >
                View Demo
              </button>
              <a
                href="/#waitlist"
                className="flex-1 text-sm text-center px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors"
              >
                Join Waitlist
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
