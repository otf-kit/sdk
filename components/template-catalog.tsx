import Link from 'next/link'

const TEMPLATES = [
  {
    name: 'SaaS Dashboard Kit',
    description: 'Full-stack project tracker with auth, issues, inbox, projects, and teams. Linear-class UI, ships in days.',
    price: '$149',
    status: 'available' as const,
    stack: ['React', 'Hono', 'Postgres', 'Better Auth', 'Polar'],
    demo: 'https://saas.otf-kit.dev',
    screens: 11,
    accent: '#f97316',
  },
  {
    name: 'AI Wrapper Kit',
    description: 'LLM-powered app with streaming chat, tools, billing, and CLAUDE.md pre-configured for agent use.',
    price: '$149',
    status: 'soon' as const,
    stack: ['React', 'AI SDK', 'Hono', 'Postgres', 'Polar'],
    screens: 8,
    accent: '#6366f1',
  },
  {
    name: 'Marketplace Kit',
    description: 'Buy/sell platform with listings, search, reviews, payments, and seller dashboards.',
    price: '$149',
    status: 'soon' as const,
    stack: ['React', 'Hono', 'Stripe', 'Postgres'],
    screens: 10,
    accent: '#22c55e',
  },
  {
    name: 'E-commerce Kit',
    description: 'Shopify-style store with cart, checkout, inventory, and analytics — fully customizable.',
    price: '$149',
    status: 'soon' as const,
    stack: ['React', 'Hono', 'Stripe', 'Postgres'],
    screens: 9,
    accent: '#ec4899',
  },
]

export function TemplateCatalog() {
  return (
    <section className="py-24 px-6 border-t border-[#1f1f1f]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <p className="text-[#f97316] text-xs font-black uppercase tracking-widest mb-3">Templates</p>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Ready-made templates,<br />ship in days.</h2>
            <p className="text-[#737373] mt-4 max-w-xl text-lg">
              Full-stack apps with auth, payments, and AI configs pre-wired — drop in and ship.
            </p>
          </div>
          <Link href="/templates" className="flex items-center gap-2 text-sm text-[#737373] hover:text-white transition-colors font-medium border border-[#1f1f1f] hover:border-[#333333] px-4 py-2 rounded-md">
            View all templates →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TEMPLATES.map((t) => (
            <TemplateCard key={t.name} template={t} />
          ))}
        </div>
      </div>
    </section>
  )
}

type Template = typeof TEMPLATES[0]

function TemplateCard({ template: t }: { template: Template }) {
  return (
    <div className="group relative bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl overflow-hidden hover:border-[#333333] transition-all duration-300">
      {/* Preview area */}
      <div className="h-[200px] border-b border-[#1f1f1f] relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${t.accent}08 0%, transparent 60%)` }}>
        {/* Mini app chrome */}
        <div className="absolute inset-3 rounded-lg border border-[#1f1f1f] bg-[#111111] overflow-hidden">
          <div className="h-6 bg-[#161616] border-b border-[#1f1f1f] flex items-center px-2 gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#ff5f57]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#ffbd2e]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#28c840]" />
            <div className="flex-1 flex justify-center">
              <div className="h-3 w-24 rounded-sm bg-[#1f1f1f]" />
            </div>
          </div>
          <div className="flex h-full">
            <div className="w-[60px] border-r border-[#1f1f1f] bg-[#111111] p-1.5 space-y-1">
              {[...Array(6)].map((_, i) => (
                <div key={i} className={`h-2 rounded-sm ${i === 0 ? 'bg-[#333333]' : 'bg-[#1a1a1a]'}`} style={{ width: `${60 + Math.random() * 40}%` }} />
              ))}
            </div>
            <div className="flex-1 p-2 space-y-2">
              <div className="grid grid-cols-3 gap-1">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-8 rounded-md border border-[#1f1f1f] bg-[#161616]" style={{ borderColor: i === 0 ? `${t.accent}40` : undefined }} />
                ))}
              </div>
              <div className="h-14 rounded-md border border-[#1f1f1f] bg-[#161616]" />
              <div className="h-8 rounded-md border border-[#1f1f1f] bg-[#161616]" />
            </div>
          </div>
        </div>

        {/* Status badge */}
        <div className="absolute top-5 right-5">
          {t.status === 'available' ? (
            <span className="flex items-center gap-1.5 text-[10px] font-black px-2 py-1 rounded-full border border-[#f97316]/30 bg-[#f97316]/10 text-[#f97316] uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f97316]" />
              Available
            </span>
          ) : (
            <span className="text-[10px] font-black px-2 py-1 rounded-full border border-[#333333] bg-[#1f1f1f] text-[#525252] uppercase tracking-wider">
              Coming Soon
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-bold text-white text-base">{t.name}</h3>
          <span className="font-black text-white text-lg">{t.price}</span>
        </div>
        <p className="text-[#737373] text-sm mb-4 leading-relaxed">{t.description}</p>

        <div className="flex items-center gap-1.5 flex-wrap mb-5">
          {t.stack.map(s => (
            <span key={s} className="text-[10px] px-2 py-0.5 rounded border border-[#1f1f1f] text-[#525252] font-medium">{s}</span>
          ))}
          <span className="text-[10px] px-2 py-0.5 rounded border border-[#1f1f1f] text-[#525252] font-medium">{t.screens} screens</span>
        </div>

        <div className="flex gap-2">
          {t.status === 'available' && t.demo ? (
            <>
              <a href={t.demo} target="_blank" rel="noopener noreferrer"
                className="flex-1 text-xs text-center px-3 py-2 border border-[#333333] text-[#a3a3a3] hover:text-white hover:border-[#525252] rounded-md transition-colors font-medium">
                View Demo ↗
              </a>
              <Link href="/templates"
                className="flex-1 text-xs text-center px-3 py-2 bg-[#f97316] hover:bg-[#fb923c] text-white rounded-md transition-colors font-bold">
                Get template →
              </Link>
            </>
          ) : (
            <>
              <button disabled className="flex-1 text-xs text-center px-3 py-2 border border-[#1f1f1f] text-[#333333] rounded-md cursor-not-allowed">
                View Demo
              </button>
              <a href="/#waitlist" className="flex-1 text-xs text-center px-3 py-2 border border-[#333333] text-[#737373] hover:text-white hover:border-[#525252] rounded-md transition-colors font-medium">
                Join Waitlist
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
