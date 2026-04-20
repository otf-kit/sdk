const tiers = [
  {
    name: 'Free SDK',
    price: '$0',
    period: 'forever',
    description: 'Everything you need to build',
    features: ['182 UI components', '5 design themes', 'TypeScript + full source', 'MIT license'],
    cta: 'Get on GitHub →',
    href: 'https://github.com',
    highlight: false,
  },
  {
    name: 'Individual Kit',
    price: '$149',
    period: 'per kit',
    description: 'One complete template',
    features: ['Everything in Free SDK', '1 full-stack template', 'Auth + payments pre-wired', 'AI configs included'],
    cta: 'Browse Templates →',
    href: '/templates',
    highlight: true,
  },
  {
    name: 'Bundle',
    price: '$249',
    period: 'one-time',
    description: 'Two templates + extras',
    features: ['Everything in Individual', '2 templates of your choice', 'Priority email support'],
    cta: 'Join waitlist',
    href: '#waitlist',
    highlight: false,
  },
  {
    name: 'Team',
    price: '$799',
    period: 'one-time',
    description: '5 seats + all future templates',
    features: ['Everything in Bundle', '5 developer seats', 'All future templates', 'Team license'],
    cta: 'Join waitlist',
    href: '#waitlist',
    highlight: false,
  },
]

export function PricingSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#fafafa] mb-4">
            Simple,{' '}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              transparent
            </span>{' '}
            pricing
          </h2>
          <p className="text-[#a1a1aa] text-lg">Pay once, own it forever.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-xl p-6 flex flex-col gap-4 border ${
                tier.highlight
                  ? 'bg-indigo-600/10 border-indigo-500/40'
                  : 'bg-zinc-900/50 border-zinc-800'
              }`}
              style={{ boxShadow: 'var(--shadow-card)' }}
            >
              {tier.highlight && (
                <span className="text-xs font-medium text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full self-start">
                  Most popular
                </span>
              )}
              <div>
                <h3 className="font-semibold text-[#fafafa] mb-1">{tier.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-[#fafafa]">{tier.price}</span>
                  <span className="text-sm text-[#a1a1aa]">/{tier.period}</span>
                </div>
                <p className="text-sm text-[#a1a1aa] mt-1">{tier.description}</p>
              </div>
              <ul className="space-y-2 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="text-sm text-[#a1a1aa] flex items-start gap-2">
                    <span className="text-indigo-400 mt-0.5">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={tier.href}
                className={`text-sm text-center px-4 py-2.5 rounded-lg font-medium transition-colors ${
                  tier.highlight
                    ? 'bg-indigo-600 hover:bg-indigo-500 text-white'
                    : 'border border-zinc-700 hover:border-zinc-500 text-[#fafafa]'
                }`}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>
        <div className="text-center">
          <a
            href="/pricing"
            className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            View full pricing →
          </a>
        </div>
      </div>
    </section>
  )
}
