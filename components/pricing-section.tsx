import Link from 'next/link'

const tiers = [
  {
    name: 'Free SDK',
    price: '$0',
    period: 'forever',
    description: 'Everything you need to build beautiful UIs.',
    features: [
      '180+ UI components',
      '5 design themes (dark + light)',
      'Full TypeScript source',
      'MIT license',
      'AI configs (Cursor, Claude, Lovable)',
      'Community support',
    ],
    cta: 'Get on GitHub →',
    href: 'https://github.com/open-template-forest',
    highlight: false,
    external: true,
  },
  {
    name: 'SaaS Dashboard Kit',
    price: '$149',
    period: 'one-time',
    description: 'Full-stack app. Drop in and ship.',
    badge: 'Available now',
    features: [
      'Everything in Free SDK',
      'Full-stack SaaS starter (Vite + Hono)',
      'Auth, payments, team management',
      'Drizzle + Postgres schema',
      '11 screens, all wired to real data',
      'AI prompts library (20+ tested)',
      '1 year of updates',
    ],
    cta: 'Get this kit →',
    href: '/templates',
    highlight: true,
    external: false,
  },
  {
    name: 'Team Bundle',
    price: '$399',
    period: 'all future kits',
    description: 'Every kit, every update, 5 seats.',
    features: [
      'Everything in individual kits',
      'All future kits included',
      '5 developer seats',
      'Unlimited client projects',
      'Priority support + Slack channel',
      'Early access to new kits',
    ],
    cta: 'Join waitlist →',
    href: '/#waitlist',
    highlight: false,
    external: false,
    soon: true,
  },
]

export function PricingSection() {
  return (
    <section className="py-24 px-6 border-t border-[#111111]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold text-[#f97316] uppercase tracking-widest mb-3">
            Pricing
          </p>
          <div className="h-px w-16 bg-[#f97316]/40 mb-6 mx-auto" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Simple, honest pricing.
          </h2>
          <p className="text-[#737373] text-lg max-w-xl mx-auto">
            Free SDK forever. Pay once for full-stack templates — no subscriptions, no seats per month.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {tiers.map((tier) => (
            <div key={tier.name}
              className={`relative flex flex-col rounded-xl border p-6 transition-all ${
                tier.highlight
                  ? 'bg-[#0f0f0f] border-[#f97316]/30 shadow-[0_0_40px_rgba(249,115,22,0.08)]'
                  : 'bg-[#0d0d0d] border-[#1a1a1a] hover:border-[#2a2a2a]'
              }`}>
              {tier.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-[#f97316] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                    Most Popular
                  </span>
                </div>
              )}
              {tier.badge && !tier.highlight && (
                <div className="absolute -top-3 left-4">
                  <span className="bg-green-500/10 text-green-400 border border-green-500/20 text-[10px] font-bold px-2.5 py-1 rounded-full">
                    {tier.badge}
                  </span>
                </div>
              )}

              <div className="mb-5">
                <div className="text-[#737373] text-xs font-semibold uppercase tracking-widest mb-2">{tier.name}</div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-black text-white">{tier.price}</span>
                  <span className="text-[#525252] text-sm">/ {tier.period}</span>
                </div>
                <p className="text-[#737373] text-sm">{tier.description}</p>
              </div>

              <ul className="space-y-2.5 mb-6 flex-1">
                {tier.features.map(f => (
                  <li key={f} className="flex items-start gap-2">
                    <svg className="w-3.5 h-3.5 text-[#f97316] mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                    <span className="text-[#a3a3a3] text-sm">{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={tier.href}
                {...(tier.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className={`block text-center px-5 py-2.5 rounded-md text-sm font-bold transition-colors ${
                  tier.highlight
                    ? 'bg-[#f97316] hover:bg-[#fb923c] text-white'
                    : tier.soon
                    ? 'border border-[#333333] text-[#737373] hover:text-white hover:border-[#555555]'
                    : 'border border-[#333333] text-white hover:bg-[#111111]'
                }`}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center text-[#525252] text-xs mt-8">
          All kit licenses are per-developer, commercial use included. <Link href="/pricing" className="text-[#737373] hover:text-white underline transition-colors">Full pricing details →</Link>
        </p>
      </div>
    </section>
  )
}
