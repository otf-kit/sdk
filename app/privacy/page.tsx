import type { Metadata } from 'next'
import { Navbar } from '@/components/otf/Navbar'
import { Footer } from '@/components/otf/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy — OTF',
  description: 'How OTF (Open Template Forest) collects, uses, and protects your data.',
}

const LAST_UPDATED = 'May 5, 2026'

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mt-12 mb-4 text-2xl font-semibold tracking-tight text-foreground">{children}</h2>
)
const H3 = ({ children }: { children: React.ReactNode }) => (
  <h3 className="mt-8 mb-3 text-lg font-semibold tracking-tight text-foreground">{children}</h3>
)
const P = ({ children }: { children: React.ReactNode }) => (
  <p className="mt-4 leading-relaxed text-muted-foreground">{children}</p>
)
const UL = ({ children }: { children: React.ReactNode }) => (
  <ul className="mt-4 ml-6 list-disc space-y-2 leading-relaxed text-muted-foreground marker:text-muted-foreground/40">{children}</ul>
)
const A = ({ href, children, external }: { href: string; children: React.ReactNode; external?: boolean }) => (
  <a
    href={href}
    {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
    className="text-primary hover:underline"
  >{children}</a>
)
const Code = ({ children }: { children: React.ReactNode }) => (
  <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[0.9em] text-foreground">{children}</code>
)

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Navbar />

      <main className="flex-1">
        <section className="relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 bg-pattern-grid opacity-[0.12]" aria-hidden />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" aria-hidden />
          <div className="relative mx-auto max-w-3xl px-4 pt-20 pb-12 sm:px-6">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">— Legal</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Privacy Policy</h1>
            <p className="mt-3 text-muted-foreground">Last updated: {LAST_UPDATED}</p>
          </div>
        </section>

        <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <p className="text-lg leading-relaxed text-foreground">
            Open Template Forest (&ldquo;OTF&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is operated by <strong>Factorx Inc</strong>, a Delaware corporation headquartered in the United States. We sell full-stack code kits and offer a free open-source UI SDK. This policy describes what we collect, why, and your choices.
          </p>

          <H2>The short version</H2>
          <UL>
            <li><strong className="text-foreground">We don&rsquo;t sell your data.</strong> Ever.</li>
            <li>We collect the minimum needed to run the site, process payments, and improve the product.</li>
            <li>Your payment card never touches our servers — Stripe handles it.</li>
            <li>You can request deletion of any personal data we hold by emailing <A href="mailto:dave@otf-kit.dev">dave@otf-kit.dev</A>.</li>
          </UL>

          <H2>What we collect and why</H2>

          <H3>Email address (waitlist + purchases)</H3>
          <P>If you join our waitlist or buy a kit, we collect your email so we can send you the kit license, updates, and (rarely) product news. You can unsubscribe at any time using the footer link in any email we send.</P>

          <H3>Payment information</H3>
          <P>Payments are processed by <A href="https://stripe.com/privacy" external>Stripe</A>. We never see or store your card details — Stripe sends us only a transaction ID, the amount, the kit you purchased, and your billing email. Stripe&rsquo;s privacy policy applies to the payment flow itself.</P>

          <H3>Anonymous analytics</H3>
          <P>We use <A href="https://posthog.com/privacy" external>PostHog</A> in EU-hosted, IP-anonymized mode to understand which pages are useful and which features people care about. PostHog stores a randomized session ID in <Code>localStorage</Code> — not tied to your name or email.</P>

          <H3>Server logs</H3>
          <P>Our hosting providers (Railway, Cloudflare) keep standard server logs (IP address, user-agent, timestamp, requested URL) for security and abuse detection. Logs are retained for up to 30 days and deleted after.</P>

          <H2>Sub-processors</H2>
          <P>We rely on these third-party services. Each has its own privacy policy:</P>
          <UL>
            <li><A href="https://stripe.com/privacy" external>Stripe</A> — payment processing</li>
            <li><A href="https://railway.com/legal/privacy" external>Railway</A> — application hosting</li>
            <li><A href="https://www.cloudflare.com/privacypolicy/" external>Cloudflare</A> — DNS, CDN, email forwarding</li>
            <li><A href="https://posthog.com/privacy" external>PostHog</A> — anonymous product analytics</li>
            <li><A href="https://resend.com/legal/privacy-policy" external>Resend</A> — transactional email (kit license delivery)</li>
          </UL>

          <H2>Cookies</H2>
          <P>We use cookies and similar storage only for:</P>
          <UL>
            <li><strong className="text-foreground">Stripe</strong>: required for the checkout flow to work</li>
            <li><strong className="text-foreground">PostHog</strong>: a single anonymous session ID</li>
            <li><strong className="text-foreground">Theme preference</strong>: a tiny <Code>localStorage</Code> entry remembering your light/dark mode</li>
          </UL>
          <P>We do not use advertising cookies, tracking pixels, or third-party data brokers.</P>

          <H2>Your rights</H2>
          <P>Depending on where you live (EU/UK/California/etc.), you may have the right to:</P>
          <UL>
            <li><strong className="text-foreground">Access</strong> the personal data we hold about you</li>
            <li><strong className="text-foreground">Correct</strong> any inaccurate data</li>
            <li><strong className="text-foreground">Delete</strong> your data (right to be forgotten)</li>
            <li><strong className="text-foreground">Export</strong> your data in a machine-readable format</li>
            <li><strong className="text-foreground">Withdraw consent</strong> for marketing emails at any time</li>
          </UL>
          <P>To exercise any of these, email <A href="mailto:dave@otf-kit.dev">dave@otf-kit.dev</A>. We&rsquo;ll respond within 30 days.</P>

          <H2>Data retention</H2>
          <UL>
            <li>Purchase records — kept for 7 years (tax/accounting compliance)</li>
            <li>Marketing email list — until you unsubscribe</li>
            <li>Server logs — 30 days</li>
            <li>PostHog analytics — 90 days</li>
          </UL>

          <H2>International transfers</H2>
          <P>Factorx Inc is based in the United States. If you access OTF from outside the US, your data will be transferred to and processed in the US and other regions where our sub-processors operate (Stripe, Railway, PostHog, Cloudflare, Resend). Where applicable, transfers rely on Standard Contractual Clauses or equivalent safeguards under GDPR.</P>

          <H2>Children</H2>
          <P>OTF is a developer tool not directed at children under 16. We do not knowingly collect personal data from anyone in that age range.</P>

          <H2>Changes to this policy</H2>
          <P>If we materially change how we use personal data, we&rsquo;ll update the &ldquo;Last updated&rdquo; date and, for significant changes, send an email to anyone on our list. Continued use of the site after the change is taken as acceptance.</P>

          <H2>Contact</H2>
          <P>Questions, corrections, or deletion requests:</P>
          <P>
            Factorx Inc<br />
            <A href="mailto:dave@otf-kit.dev">dave@otf-kit.dev</A>
          </P>
        </article>
      </main>

      <Footer />
    </div>
  )
}
