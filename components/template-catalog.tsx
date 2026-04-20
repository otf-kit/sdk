const templates = [
  {
    name: 'SaaS Dashboard Kit',
    description: 'Full-stack SaaS with auth, billing, and team management',
    tags: ['TypeScript', 'Tamagui', 'Radix', 'Hono', 'Supabase'],
    platform: 'Expo + Next.js',
    price: '$149',
    status: 'In Development' as const,
  },
  {
    name: 'Marketplace Kit',
    description: 'Buy/sell platform with listings, search, and payments',
    tags: ['TypeScript', 'Tamagui', 'Stripe'],
    platform: 'Expo + Next.js',
    price: '$149',
    status: 'Coming Soon' as const,
  },
  {
    name: 'Fitness App',
    description: 'Workout tracker with progress charts and social features',
    tags: ['TypeScript', 'Tamagui', 'NativeWind'],
    platform: 'Expo',
    price: '$99',
    status: 'Coming Soon' as const,
  },
  {
    name: 'Delivery App',
    description: 'On-demand delivery with maps, tracking, and driver app',
    tags: ['TypeScript', 'Maps', 'Realtime'],
    platform: 'Expo',
    price: '$99',
    status: 'Coming Soon' as const,
  },
  {
    name: 'E-commerce Kit',
    description: 'Shopify-style store with cart, checkout, and inventory',
    tags: ['TypeScript', 'Tamagui', 'Stripe'],
    platform: 'Expo + Next.js',
    price: '$149',
    status: 'Coming Soon' as const,
  },
  {
    name: 'AI Wrapper Kit',
    description: 'LLM-powered app with streaming chat, tools, and billing',
    tags: ['TypeScript', 'AI SDK', 'Streaming'],
    platform: 'Expo + Next.js',
    price: '$149',
    status: 'Coming Soon' as const,
  },
]

export function TemplateCatalog() {
  return (
    <section className="py-24 px-6 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <p className="text-xs font-semibold text-[#f97316] uppercase tracking-widest mb-3">
            Templates
          </p>
          <div className="h-px w-16 bg-[#f97316]/40 mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Ready-made templates, ship in days.
          </h2>
          <p className="text-[#737373] text-lg max-w-xl">
            Full-stack apps with auth, payments, and AI configs pre-wired — drop in and ship.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {templates.map(t => (
            <div
              key={t.name}
              className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-6 flex flex-col gap-4 hover:border-[#f97316]/20 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 pr-4">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-white">{t.name}</h3>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full border font-medium ${
                        t.status === 'In Development'
                          ? 'bg-[#f97316]/10 text-orange-400 border-[#f97316]/20'
                          : 'bg-[#1f1f1f] text-[#525252] border-[#333333]'
                      }`}
                    >
                      {t.status}
                    </span>
                  </div>
                  <p className="text-sm text-[#737373]">{t.description}</p>
                </div>
                <span className="font-bold text-white text-lg shrink-0">{t.price}</span>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs px-2.5 py-1 rounded-full border border-[#1f1f1f] text-[#737373]">
                  {t.platform}
                </span>
                {t.tags.map(tag => (
                  <span key={tag} className="text-xs px-2 py-0.5 rounded border border-[#1f1f1f] text-[#525252]">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-3 mt-auto">
                <button
                  disabled
                  className="flex-1 text-sm text-center px-4 py-2 border border-[#1f1f1f] text-[#525252] rounded-md cursor-not-allowed"
                >
                  View Demo
                </button>
                <a
                  href="#waitlist"
                  className="flex-1 text-sm text-center px-4 py-2 bg-[#f97316] hover:bg-[#fb923c] text-white rounded-md transition-colors font-medium"
                >
                  Join Waitlist
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
