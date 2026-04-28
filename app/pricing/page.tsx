import type { Metadata } from 'next'
import { Navbar } from '@/components/otf/Navbar'
import { Footer } from '@/components/otf/Footer'
import { PricingSection } from '@/components/pricing-section'
import { Faq } from '@/components/faq'

export const metadata: Metadata = {
  title: 'Pricing — OTF',
  description: 'Simple, transparent pricing. Pay once, own it forever.',
}

const featureRows = [
  { feature: 'UI Components',        free: '180+',        individual: '180+',        bundle: '180+',        team: '180+' },
  { feature: 'Full-stack templates', free: '—',           individual: '1',           bundle: '2',           team: 'All' },
  { feature: 'AI configs',           free: '—',           individual: 'Yes',         bundle: 'Yes',         team: 'Yes' },
  { feature: 'Updates',              free: 'Community',   individual: '12 months',   bundle: '12 months',   team: 'Forever' },
  { feature: 'Support',              free: 'Community',   individual: 'Email',       bundle: 'Priority',    team: 'Priority' },
  { feature: 'Client projects',      free: '—',           individual: '1',           bundle: '2',           team: 'Unlimited' },
  { feature: 'Developer seats',      free: '1',           individual: '1',           bundle: '1',           team: '5' },
]

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Navbar />

      {/* Page header */}
      <header className="relative border-b border-border overflow-hidden">
        {/* grid pattern */}
        <div className="absolute inset-0 bg-pattern-grid opacity-[0.12]" aria-hidden />
        {/* gradient fade at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" aria-hidden />

        <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-16">
          <p className="font-mono text-xs uppercase tracking-widest text-primary mb-3">
            Pricing
          </p>
          <div className="h-px w-12 bg-primary/40 mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 max-w-2xl">
            Simple,{' '}
            <span className="text-primary">transparent</span>{' '}
            pricing
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl">
            Free SDK forever. Pay once for full-stack kits — no subscriptions, no per-seat fees.
          </p>

          {/* trust pills */}
          <div className="flex flex-wrap gap-2 mt-8">
            {['Pay once, own forever', 'MIT SDK included', '14-day refund guarantee', 'Commercial use OK'].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border bg-secondary/40 px-3 py-1 text-xs text-muted-foreground font-mono"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Pricing cards — reuse PricingSection but strip its outer section padding/border */}
      <div className="flex-1">
        <PricingSection showHeader={false} />

        {/* Coming soon callout */}
        <div className="max-w-7xl mx-auto px-6 pb-12">
          <div className="bg-card border border-border rounded-xl p-5 flex items-center gap-4">
            <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 text-primary text-base">
              ✦
            </div>
            <div>
              <span className="font-semibold text-foreground">Pro Components — $199</span>
              <span className="text-muted-foreground text-sm ml-3">
                Coming in Phase 7: Tier 1 fully polished components with tests + Storybook stories
              </span>
            </div>
          </div>
        </div>

        {/* Feature comparison table */}
        <div className="max-w-7xl mx-auto px-6 pb-16">
          <h2 className="text-2xl font-bold text-foreground mb-6">Feature comparison</h2>
          <div className="border border-border rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-card">
                  <th className="text-left px-6 py-4 text-muted-foreground font-medium">Feature</th>
                  <th className="text-center px-4 py-4 text-muted-foreground font-medium">Free SDK</th>
                  <th className="text-center px-4 py-4 text-primary font-medium">Individual</th>
                  <th className="text-center px-4 py-4 text-muted-foreground font-medium">Bundle</th>
                  <th className="text-center px-4 py-4 text-muted-foreground font-medium">Team</th>
                </tr>
              </thead>
              <tbody>
                {featureRows.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={`border-b border-border last:border-b-0 ${i % 2 === 0 ? '' : 'bg-card/50'}`}
                  >
                    <td className="px-6 py-4 text-foreground">{row.feature}</td>
                    <td className="px-4 py-4 text-center text-muted-foreground">{row.free}</td>
                    <td className="px-4 py-4 text-center text-primary font-medium">{row.individual}</td>
                    <td className="px-4 py-4 text-center text-muted-foreground">{row.bundle}</td>
                    <td className="px-4 py-4 text-center text-muted-foreground">{row.team}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-7xl mx-auto px-6">
          <Faq />
        </div>
      </div>

      <Footer />
    </div>
  )
}
