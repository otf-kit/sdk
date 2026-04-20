const tiers = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Everything you need to build',
    features: ['182 UI components', '5 design themes', 'TypeScript + full source', 'MIT license'],
    cta: 'Get →',
    href: 'https://github.com',
    highlight: false,
  },
  {
    name: 'Individual Kit',
    price: '$149',
    period: 'per kit',
    description: 'One complete template',
    features: ['Everything in Free SDK', '1 full-stack template', 'Auth + payments pre-wired', 'AI configs included'],
    cta: 'Buy now →',
    href: '/templates',
    highlight: true,
  },
  {
    name: 'Bundle',
    price: '$249',
    period: 'one-time',
    description: 'Two templates + extras',
    features: ['Everything in Individual', '2 templates of your choice', 'Priority email support'],
    cta: 'Soon',
    href: '#waitlist',
    highlight: false,
    disabled: true,
  },
  {
    name: 'Team',
    price: '$799',
    period: 'one-time',
    description: '5 seats + all future templates',
    features: ['Everything in Bundle', '5 developer seats', 'All future templates', 'Team license'],
    cta: 'Contact',
    href: 'mailto:dave@otf-kit.dev',
    highlight: false,
  },
]

export function PricingSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <p className="text-xs font-semibold text-[#f97316] uppercase tracking-widest mb-3">
            Pricing
          </p>
          <div className="h-px w-16 bg-[#f97316]/40 mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Simple, transparent pricing.
          </h2>
          <p className="text-[#737373] text-lg">Pay once, own it forever.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-xl p-6 flex flex-col gap-4 border ${
                tier.highlight
                  ? 'bg-[#111111] border-[#f97316]/40 shadow-[0_0_40px_rgba(249,115,22,0.08)]'
                  : 'bg-[#111111] border-[#1f1f1f]'
              }`}
            >
              {tier.highlight && (
                <span className="text-xs font-medium text-orange-400 bg-[#f97316]/10 border border-[#f97316]/20 px-2 py-0.5 rounded-full self-start">
                  ★ Most popular
                </span>
              )}
              <div>
                <h3 className="font-semibold text-white mb-1">{tier.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white">{tier.price}</span>
                  <span className="text-sm text-[#737373]">/{tier.period}</span>
                </div>
                <p className="text-sm text-[#737373] mt-1">{tier.description}</p>
              </div>
              <ul className="space-y-2 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="text-sm text-[#737373] flex items-start gap-2">
                    <span className="text-[#f97316] mt-0.5 shrink-0">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={tier.href}
                className={`text-sm text-center px-4 py-2.5 rounded-md font-medium transition-colors ${
                  tier.highlight
                    ? 'bg-[#f97316] hover:bg-[#fb923c] text-white'
                    : 'border border-[#1f1f1f] hover:border-[#333333] text-white'
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
            className="text-sm text-[#f97316] hover:text-[#fb923c] transition-colors"
          >
            View full pricing →
          </a>
        </div>
      </div>
    </section>
  )
}
