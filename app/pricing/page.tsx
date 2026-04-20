import type { Metadata } from 'next'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { Faq } from '@/components/faq'

export const metadata: Metadata = {
  title: 'Pricing — OTF',
  description: 'Simple, transparent pricing. Pay once, own it forever.',
}

const tiers = [
  {
    name: 'Free SDK',
    price: '$0',
    period: 'forever',
    description: 'Everything you need to build',
    highlight: false,
    features: [
      '182 UI components (web + native)',
      '5 design themes',
      'TypeScript + full source',
      'MIT license',
      'Community support',
    ],
    cta: 'Get on GitHub →',
    href: 'https://github.com',
  },
  {
    name: 'Individual Kit',
    price: '$149',
    period: 'per kit',
    description: 'One complete template',
    highlight: true,
    features: [
      'Everything in Free SDK',
      '1 complete full-stack template',
      'Web (Next.js) + Mobile (Expo)',
      'Auth + payments + API pre-wired',
      'AI configs (Cursor, Claude Code)',
      '12 months of updates',
      'Email support',
    ],
    cta: 'Browse Templates →',
    href: '/templates',
  },
  {
    name: 'Bundle',
    price: '$249',
    period: 'one-time',
    description: 'Two templates + extras',
    highlight: false,
    features: [
      'Everything in Individual',
      '2 templates of your choice',
      'Priority email support',
    ],
    cta: 'Coming soon — join waitlist',
    href: '/#waitlist',
  },
  {
    name: 'Team',
    price: '$799',
    period: 'one-time',
    description: '5 seats + all future templates',
    highlight: false,
    features: [
      'Everything in Bundle',
      '5 developer seats',
      'All future templates (forever)',
      'Priority support',
      'Team license (unlimited client projects)',
    ],
    cta: 'Contact us',
    href: 'mailto:dave@otf-kit.dev',
  },
]

const featureRows = [
  { feature: 'UI Components', free: '182', individual: '182', bundle: '182', team: '182' },
  { feature: 'Full-stack templates', free: '—', individual: '1', bundle: '2', team: 'All' },
  { feature: 'AI configs', free: '—', individual: 'Yes', bundle: 'Yes', team: 'Yes' },
  { feature: 'Updates', free: 'Community', individual: '12 months', bundle: '12 months', team: 'Forever' },
  { feature: 'Support', free: 'Community', individual: 'Email', bundle: 'Priority', team: 'Priority' },
]

export default function PricingPage() {
  return (
    <main className="min-h-dvh bg-[#0a0a0a] flex flex-col">
      <Nav />
      <div className="flex-1 max-w-7xl mx-auto px-6 pt-28 pb-24 w-full">
        <div className="mb-16">
          <p className="text-xs font-semibold text-[#f97316] uppercase tracking-widest mb-3">
            Pricing
          </p>
          <div className="h-px w-16 bg-[#f97316]/40 mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-[#737373] text-xl">Pay once, own it forever.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-xl p-6 flex flex-col gap-4 border relative ${
                tier.highlight
                  ? 'bg-[#111111] border-[#f97316]/40 shadow-[0_0_40px_rgba(249,115,22,0.08)]'
                  : 'bg-[#111111] border-[#1f1f1f]'
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="text-xs font-medium text-orange-400 bg-[#f97316]/10 border border-[#f97316]/30 px-3 py-1 rounded-full whitespace-nowrap">
                    Most popular
                  </span>
                </div>
              )}
              <div>
                <h2 className="font-semibold text-white mb-1">{tier.name}</h2>
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

        <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-6 mb-16 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-[#f97316]/10 border border-[#f97316]/20 flex items-center justify-center shrink-0 text-[#f97316] text-lg">
            ✦
          </div>
          <div>
            <span className="font-semibold text-white">Pro Components — $199</span>
            <span className="text-[#737373] text-sm ml-3">
              Coming in Phase 7: Tier 1 fully polished components with tests + Storybook stories
            </span>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Feature comparison</h2>
          <div className="border border-[#1f1f1f] rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#1f1f1f] bg-[#111111]">
                  <th className="text-left px-6 py-4 text-[#737373] font-medium">Feature</th>
                  <th className="text-center px-4 py-4 text-[#737373] font-medium">Free SDK</th>
                  <th className="text-center px-4 py-4 text-orange-400 font-medium">Individual</th>
                  <th className="text-center px-4 py-4 text-[#737373] font-medium">Bundle</th>
                  <th className="text-center px-4 py-4 text-[#737373] font-medium">Team</th>
                </tr>
              </thead>
              <tbody>
                {featureRows.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={`border-b border-[#1f1f1f] last:border-b-0 ${i % 2 === 0 ? '' : 'bg-[#111111]/50'}`}
                  >
                    <td className="px-6 py-4 text-white">{row.feature}</td>
                    <td className="px-4 py-4 text-center text-[#737373]">{row.free}</td>
                    <td className="px-4 py-4 text-center text-orange-400 font-medium">{row.individual}</td>
                    <td className="px-4 py-4 text-center text-[#737373]">{row.bundle}</td>
                    <td className="px-4 py-4 text-center text-[#737373]">{row.team}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <Faq />
      </div>
      <Footer />
    </main>
  )
}
