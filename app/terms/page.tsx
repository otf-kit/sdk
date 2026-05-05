import type { Metadata } from 'next'
import { Navbar } from '@/components/otf/Navbar'
import { Footer } from '@/components/otf/Footer'

export const metadata: Metadata = {
  title: 'Terms of Service — OTF',
  description: 'The terms governing use of Open Template Forest, the SDK, and the kits.',
}

const LAST_UPDATED = 'May 5, 2026'

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mt-12 mb-4 text-2xl font-semibold tracking-tight text-foreground">{children}</h2>
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

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Navbar />

      <main className="flex-1">
        <section className="relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 bg-pattern-grid opacity-[0.12]" aria-hidden />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" aria-hidden />
          <div className="relative mx-auto max-w-3xl px-4 pt-20 pb-12 sm:px-6">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">— Legal</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Terms of Service</h1>
            <p className="mt-3 text-muted-foreground">Last updated: {LAST_UPDATED}</p>
          </div>
        </section>

        <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <p className="text-lg leading-relaxed text-foreground">
            These Terms of Service (&ldquo;Terms&rdquo;) govern your use of Open Template Forest (&ldquo;OTF&rdquo;), operated by <strong className="text-foreground">Factorx Inc</strong>, a Delaware corporation (&ldquo;we&rdquo;, &ldquo;us&rdquo;), including the website at otf-kit.dev, the open-source SDK, and the paid Kits. By using the site, downloading the SDK, or purchasing a Kit, you agree to these Terms.
          </p>

          <H2>1. The two products</H2>

          <h3 className="mt-8 mb-3 text-lg font-semibold tracking-tight text-foreground">a) The free SDK</h3>
          <P>The OTF UI SDK (component libraries <Code>@otf/ui</Code>, <Code>@otf/ui-native</Code>, design tokens, themes, and AI configs) is released under the <strong className="text-foreground">MIT License</strong>. You can use it for personal, commercial, or client work, modify it, and redistribute it — see the LICENSE file in the repository for the full text. No purchase required.</P>

          <h3 className="mt-8 mb-3 text-lg font-semibold tracking-tight text-foreground">b) The paid Kits</h3>
          <P>Kits (e.g. SaaS Dashboard Kit, Fitness &amp; Wellness Kit, future Kits) are full-stack code templates sold as a one-time purchase. Each Kit is licensed under our Kit License (see <Code>LICENSE-KIT.md</Code> inside each Kit) — a per-developer commercial license summarized below.</P>

          <H2>2. Kit License — what you can and can&rsquo;t do</H2>

          <P><strong className="text-foreground">You can:</strong></P>
          <UL>
            <li>Use the Kit code in unlimited personal and commercial projects you own</li>
            <li>Modify the code in any way (no &ldquo;forking restrictions&rdquo;)</li>
            <li>Use it for one paid client project per single-developer license; unlimited client projects under the Team bundle</li>
            <li>Deploy the resulting app under your own brand</li>
          </UL>

          <P><strong className="text-foreground">You cannot:</strong></P>
          <UL>
            <li>Resell, sublicense, or redistribute the Kit source code itself (modified or unmodified) as a template, theme, or starter</li>
            <li>Open-source the Kit source code</li>
            <li>Share the Kit with developers outside your license seat count</li>
            <li>Claim the Kit as your own original work</li>
          </UL>

          <P>Apps you build <em>from</em> the Kit are entirely yours — you can sell them, charge subscriptions, raise money on them, anything. The license restricts only the redistribution of the Kit itself.</P>

          <H2>3. Refunds</H2>
          <P>14-day, no-questions-asked refund on any Kit purchase. Email <A href="mailto:dave@otf-kit.dev">dave@otf-kit.dev</A> with your order ID and we&rsquo;ll process the refund through Stripe within 5 business days. After 14 days, refunds are at our discretion.</P>

          <H2>4. Updates</H2>
          <P>Each Kit purchase includes 12 months of free updates from the date of purchase. After 12 months, you keep everything you have but new Kit updates require a renewal at 50% of the then-current Kit price. The MIT-licensed SDK has no such restriction — updates are always free and public.</P>

          <H2>5. Account and account security</H2>
          <P>Some flows (waitlist, purchase) collect your email address. You&rsquo;re responsible for keeping the email address current and for the security of any account you create on top of OTF Kits (e.g. when you deploy a Kit and create user accounts in it — those accounts belong to you, not us).</P>

          <H2>6. Acceptable use</H2>
          <P>You may not use OTF, the SDK, or any Kit to:</P>
          <UL>
            <li>Build illegal services, fraud schemes, or anything that violates applicable law</li>
            <li>Distribute malware, phishing pages, or content that violates anti-spam laws (CAN-SPAM, GDPR)</li>
            <li>Build services that target children under 13 in a way that violates COPPA</li>
            <li>Reverse-engineer the Kit packaging or licensing system to circumvent payment</li>
          </UL>

          <H2>7. Third-party services</H2>
          <P>Kits integrate with third-party services (Stripe for payments, Railway for hosting, Better Auth for authentication, etc.). Your use of those services is governed by their own terms — we don&rsquo;t pass through liability for them. You&rsquo;re responsible for setting up and paying for the third-party services you use.</P>

          <H2>8. Intellectual property</H2>
          <P>The OTF brand, logos, and website content are owned by Factorx Inc. The SDK code is under MIT (use freely, retain notice). The Kit code is under our Kit License (paid, restricted redistribution as above). Anything you create using the SDK or Kits is yours.</P>

          <H2>9. No warranty</H2>
          <P>The SDK and Kits are provided <strong className="text-foreground">&ldquo;as is&rdquo;</strong>, without warranty of any kind, express or implied — including merchantability, fitness for a particular purpose, and non-infringement. We don&rsquo;t guarantee the code is free of bugs, will work for your specific use case, or is suitable for production without your own review.</P>

          <H2>10. Limitation of liability</H2>
          <P>To the fullest extent permitted by law, Factorx Inc&rsquo;s total liability arising from or related to these Terms is limited to the amount you paid for the relevant Kit in the 12 months preceding the claim. We&rsquo;re not liable for indirect, incidental, special, consequential, or punitive damages, including lost profits, data loss, or business interruption.</P>

          <H2>11. Termination</H2>
          <P>You can stop using OTF at any time. We may suspend or terminate access if you breach these Terms or use the service in ways that harm us or other users. License rights you&rsquo;ve already paid for survive termination — you can keep using the Kit code you bought, just not receive future updates if your license was terminated for cause.</P>

          <H2>12. Governing law &amp; dispute resolution</H2>
          <P>These Terms are governed by the laws of the State of Delaware, United States, without regard to conflict-of-law principles. Any disputes will be resolved exclusively in the state or federal courts located in Delaware, except where local consumer-protection laws require otherwise. You and Factorx Inc agree to waive any right to a jury trial.</P>

          <H2>13. Changes to these Terms</H2>
          <P>We may update these Terms from time to time. Material changes will be announced on the homepage or via email to active customers. Continued use of OTF after changes are posted means you accept the new Terms.</P>

          <H2>14. Contact</H2>
          <P>Questions, refund requests, or legal inquiries:</P>
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
