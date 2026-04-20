import type { Metadata } from 'next'
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
    <main className="min-h-dvh bg-[#09090b] flex flex-col">
      <div className="flex-1 max-w-7xl mx-auto px-6 py-24 w-full">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#fafafa] mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-[#a1a1aa] text-xl">Pay once, own it forever.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-xl p-6 flex flex-col gap-4 border ${
                tier.highlight
                  ? 'bg-indigo-600/10 border-indigo-500/40 relative'
                  : 'bg-zinc-900/50 border-zinc-800'
              }`}
              style={{ boxShadow: 'var(--shadow-card)' }}
            >
              {tier.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="text-xs font-medium text-indigo-400 bg-indigo-500/10 border border-indigo-500/30 px-3 py-1 rounded-full whitespace-nowrap">
                    Most popular
                  </span>
                </div>
              )}
              <div>
                <h2 className="font-semibold text-[#fafafa] mb-1">{tier.name}</h2>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-[#fafafa]">{tier.price}</span>
                  <span className="text-sm text-[#a1a1aa]">/{tier.period}</span>
                </div>
                <p className="text-sm text-[#a1a1aa] mt-1">{tier.description}</p>
              </div>
              <ul className="space-y-2 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="text-sm text-[#a1a1aa] flex items-start gap-2">
                    <span className="text-indigo-400 mt-0.5 shrink-0">✓</span>
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

        <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-6 mb-16 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0 text-violet-400 text-lg">
            ✦
          </div>
          <div>
            <span className="font-semibold text-[#fafafa]">Pro Components — $199</span>
            <span className="text-[#a1a1aa] text-sm ml-3">
              Coming in Phase 7: Tier 1 fully polished components with tests + Storybook stories
            </span>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold text-[#fafafa] mb-6">Feature comparison</h2>
          <div className="border border-zinc-800 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900/50">
                  <th className="text-left px-6 py-4 text-[#a1a1aa] font-medium">Feature</th>
                  <th className="text-center px-4 py-4 text-[#a1a1aa] font-medium">Free SDK</th>
                  <th className="text-center px-4 py-4 text-indigo-400 font-medium">Individual</th>
                  <th className="text-center px-4 py-4 text-[#a1a1aa] font-medium">Bundle</th>
                  <th className="text-center px-4 py-4 text-[#a1a1aa] font-medium">Team</th>
                </tr>
              </thead>
              <tbody>
                {featureRows.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={`border-b border-zinc-800 last:border-b-0 ${i % 2 === 0 ? '' : 'bg-zinc-900/20'}`}
                  >
                    <td className="px-6 py-4 text-[#fafafa]">{row.feature}</td>
                    <td className="px-4 py-4 text-center text-[#a1a1aa]">{row.free}</td>
                    <td className="px-4 py-4 text-center text-indigo-300 font-medium">{row.individual}</td>
                    <td className="px-4 py-4 text-center text-[#a1a1aa]">{row.bundle}</td>
                    <td className="px-4 py-4 text-center text-[#a1a1aa]">{row.team}</td>
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
