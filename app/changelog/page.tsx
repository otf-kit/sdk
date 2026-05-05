import type { Metadata } from 'next'
import { Navbar } from '@/components/otf/Navbar'
import { Footer } from '@/components/otf/Footer'

export const metadata: Metadata = {
  title: 'Changelog — OTF',
  description: 'Everything we shipped — kits, SDK, automation, and the open stuff. Reverse chronological.',
}

type Tag = 'shipped' | 'feat' | 'improved' | 'fixed' | 'breaking' | 'docs' | 'infra'

type Entry = {
  date: string                 // ISO date
  pretty: string               // formatted display date
  title: string
  summary?: string
  tags?: Tag[]
  bullets: string[]
  link?: { label: string; href: string }
}

const entries: Entry[] = [
  {
    date: '2026-05-05',
    pretty: 'May 5, 2026',
    title: 'Custom domain in 90 seconds — for every kit owner',
    summary: 'The hardest part of shipping a kit is everything that happens after the code is written. We turned it into one command.',
    tags: ['shipped', 'feat'],
    bullets: [
      'New skill bundled with every kit: `setup-custom-domain` wires Railway custom domain + Cloudflare DNS + email forwarding + auto-renewing TLS in one bash command',
      'Works on any user-owned domain — single-kit on apex, app subdomain, or multi-kit splits',
      'Idempotent — re-runs detect existing state and skip duplicate work',
      'Components index restructured into Components / Blocks / Patterns (108 / 90 / 14 across web + native)',
    ],
    link: { label: 'How it works', href: '/templates' },
  },
  {
    date: '2026-05-04',
    pretty: 'May 4, 2026',
    title: 'Fitness & Wellness Kit — shipped',
    summary: 'Apple-Fitness-inspired Expo SDK 54 kit. One codebase ships iOS, Android, and web.',
    tags: ['shipped', 'feat'],
    bullets: [
      '12 screens: Summary with Activity Rings hero, Workout (list/start/detail), Nutrition, Programs, Sharing, Profile, Goal, Welcome, Login, Signup, Ring Detail, Metric Detail',
      'Stack: Expo SDK 54 + Expo Router + Hono + Drizzle 1.0 + Postgres + Better Auth (email + Google + bearer + demo login)',
      'Reusable blocks: ActivityRings, WeekStrip, StepperBig, MetricCard, MiniBarChart, SegmentedControl, Card, IconBadge — all token-driven',
      '21 AI prompts in ai/prompts/ (add-workout-type, change-ring-targets, swap-stripe-for-revenuecat, etc.)',
      '24/24 design checklist passing — strict tokens, no hex, paddingBottom: 120 for floating tab clearance',
      'EAS Update preview channel published — scan QR in Expo Go for instant native testing',
    ],
    link: { label: 'View kit', href: '/templates/fitness-kit' },
  },
  {
    date: '2026-05-04',
    pretty: 'May 4, 2026',
    title: 'Stripe wired across both kits',
    summary: 'One-time payments + bundle pricing live. License delivery via Resend.',
    tags: ['shipped', 'feat'],
    bullets: [
      'Fitness Kit at $149 (price_1TTGl4DkNu7cnU8A0kTKFa1r)',
      'Starter Bundle at $249 — Fitness Kit + SaaS Dashboard Kit (price_1TTGlEDkNu7cnU8AtyPiLs5B), $49 saved',
      '/templates/fitness-kit + /templates/saas-dashboard buy buttons trigger Checkout instead of static demos',
      'Stripe webhook → Resend → kit license email with download link',
    ],
  },
  {
    date: '2026-05-01',
    pretty: 'May 1, 2026',
    title: 'Design System v1 — closed',
    summary: 'Phase 1.5 complete. 212 components, native + web parity, full Storybook coverage.',
    tags: ['shipped', 'feat'],
    bullets: [
      '212 components (108 atomic + 90 compositions + 14 motion/effect patterns)',
      '5 palettes (Slate, Warm, Cosmic, Terminal, Custom) × dark + light = 10 themes',
      '@otf/ui (web) + @otf/ui-native (Expo) + @otf/tokens (shared design tokens) — all under MIT',
      'Reanimated v4 migration, Tamagui native renderers, lazy-loaded heavy primitives (charts, code blocks)',
      'Quality gates: kit-design-checklist, eslint-plugin-otf-design, frame-rate budgets, contrast checks',
    ],
    link: { label: 'Browse components', href: '/components' },
  },
  {
    date: '2026-04-29',
    pretty: 'Apr 29, 2026',
    title: '/templates + /pricing redesigned',
    summary: 'Tabbed live previews. Real component renderings instead of screenshots.',
    tags: ['feat', 'improved'],
    bullets: [
      'KitPreview wrapper with browser-chrome shell + tab strip ("Dashboard" / "Issues board")',
      'MiniDashboardPreview + MiniKanbanPreview + MiniFitnessSummaryPreview — pixel-faithful re-renders of real kit screens at preview density',
      'Pricing page with feature comparison table across Free SDK / Individual / Bundle / Team',
      '7 template cards (2 live, 5 coming soon) with category filters',
    ],
  },
  {
    date: '2026-04-27',
    pretty: 'Apr 27, 2026',
    title: 'Marketing revamp — landing live',
    summary: 'Phase 1.6 closed. New hero, AI tools marquee, components teaser, pricing.',
    tags: ['shipped', 'feat'],
    bullets: [
      'New Hero with subhead emphasizing "AI already knows this codebase"',
      'AI Tools Marquee — Cursor, Claude, Lovable, Bolt, Antigravity, Codex',
      'ComponentTeaser carousel showing live Storybook embeds',
      'Compatibility section — radial diagram of supported frameworks (React, Next.js, Expo, Tailwind, Hono, Supabase, etc.)',
      'Stripe Checkout live in production',
    ],
  },
  {
    date: '2026-04-25',
    pretty: 'Apr 25, 2026',
    title: 'SaaS Dashboard Kit — shipped',
    summary: 'First paid kit. Vite + Hono + Drizzle + Better Auth + Stripe. 11 screens.',
    tags: ['shipped', 'feat'],
    bullets: [
      'Stack: Vite 5 + React 19 + Hono 4 + Drizzle 1.0 + Postgres + Better Auth + Stripe',
      '11 screens: Dashboard, Issues Board (Kanban), Issue Detail, Projects, Project Detail, Analytics, Inbox, Teams, Profile, Settings, Login',
      'Pre-loaded: CLAUDE.md, .cursorrules, AGENTS.md, 20+ tested prompts',
      'Per-developer commercial license; client work allowed',
      '$149 one-time + 12 months of updates',
    ],
    link: { label: 'View kit', href: '/templates/saas-dashboard' },
  },
  {
    date: '2026-04-24',
    pretty: 'Apr 24, 2026',
    title: 'Storybooks live',
    summary: 'All 212 components browsable with live iframe previews — for both web and native.',
    tags: ['shipped', 'docs'],
    bullets: [
      'Web Storybook at ui.otf-kit.dev — every primitive, block, and pattern with playable controls',
      'Native Storybook at native.otf-kit.dev — phone-frame mockup wrapper for the React Native components',
      'Cross-referenced from the components page so every card has a 1-click live demo',
      '⌘K command palette searches all 212 components from anywhere on the site',
    ],
  },
  {
    date: '2026-04-23',
    pretty: 'Apr 23, 2026',
    title: 'Foundation — monorepo + design tokens',
    summary: 'Phase 0 / Phase 1. The first commits — packages, themes, lint rules.',
    tags: ['shipped', 'infra'],
    bullets: [
      'Monorepo scaffold: @otf/ui, @otf/ui-native, @otf/tokens, @otf/storybook-web',
      'Tailwind v4 preset + tamagui-config + design tokens (5 palettes × dark/light)',
      'eslint-plugin-otf-design — guards against hex literals, off-token spacing, raw RGB',
      '14 base story files for primitives',
      'pnpm workspace + bun runtime + Railway deploy scripts',
    ],
  },
]

const TAG_STYLES: Record<Tag, string> = {
  shipped:  'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
  feat:     'border-primary/30 bg-primary/10 text-primary',
  improved: 'border-blue-500/30 bg-blue-500/10 text-blue-400',
  fixed:    'border-amber-500/30 bg-amber-500/10 text-amber-400',
  breaking: 'border-red-500/30 bg-red-500/10 text-red-400',
  docs:     'border-violet-500/30 bg-violet-500/10 text-violet-400',
  infra:    'border-slate-500/30 bg-slate-500/10 text-slate-300',
}

export default function ChangelogPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Navbar />

      <main className="flex-1">
        {/* ── Header ────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 bg-pattern-grid opacity-[0.12]" aria-hidden />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" aria-hidden />
          <div className="relative mx-auto max-w-3xl px-4 pt-20 pb-12 sm:px-6">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">— Changelog</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              Everything we shipped.
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Reverse chronological. Real ship dates. The infra, the kits, the SDK, the AI configs — and what&rsquo;s next.
            </p>

            {/* Alpha banner */}
            <div className="mt-8 rounded-xl border border-primary/30 bg-primary/[0.04] p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex shrink-0 items-center gap-1 rounded-full border border-primary/40 bg-primary/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-primary">
                  Alpha
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground">The OTF SDK is in Public Alpha.</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    Components are stable enough to ship in production — we use them in our own kits — but a few APIs may still polish before stable.
                    The full-stack <strong className="text-foreground">Kits</strong> (SaaS Dashboard, Fitness) are production-ready and built to last; buy with confidence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Timeline ──────────────────────────────────────────────────── */}
        <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <ol className="relative">
            {/* Vertical guide rail */}
            <div className="absolute left-2 top-2 bottom-2 w-px bg-border" aria-hidden />

            {entries.map((entry, i) => (
              <li key={i} className="relative pb-12 pl-10 last:pb-0">
                {/* Dot */}
                <span
                  className={`absolute left-0 top-1.5 flex h-4 w-4 items-center justify-center rounded-full border ${
                    i === 0 ? 'border-primary/60 bg-primary/20 shadow-[0_0_12px_rgba(249,115,22,0.5)]' : 'border-border bg-card'
                  }`}
                  aria-hidden
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${i === 0 ? 'bg-primary' : 'bg-muted-foreground/60'}`} />
                </span>

                {/* Date + tags */}
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <time className="font-mono uppercase tracking-widest text-muted-foreground" dateTime={entry.date}>
                    {entry.pretty}
                  </time>
                  {entry.tags?.map((t) => (
                    <span
                      key={t}
                      className={`rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${TAG_STYLES[t]}`}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h2 className="mt-2 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                  {entry.title}
                </h2>

                {/* Summary */}
                {entry.summary && (
                  <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                    {entry.summary}
                  </p>
                )}

                {/* Bullets */}
                <ul className="mt-4 space-y-2">
                  {entry.bullets.map((b, j) => (
                    <li key={j} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                      <span className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-muted-foreground/40" aria-hidden />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                {/* Link */}
                {entry.link && (
                  <a
                    href={entry.link.href}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                  >
                    {entry.link.label} →
                  </a>
                )}
              </li>
            ))}
          </ol>

          {/* Teaser + newsletter CTA */}
          <div className="mt-12 overflow-hidden rounded-xl border border-primary/20 bg-card/60 p-6 sm:p-7">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
              <div className="min-w-0">
                <p className="text-base font-semibold tracking-tight text-foreground">
                  More shipping soon.
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  We have a lot planned — new kits, deeper AI integrations, things we&rsquo;re not ready to say yet.
                  Newsletter subscribers hear about everything first.
                </p>
              </div>
              <a
                href="/#waitlist"
                className="shrink-0 inline-flex items-center justify-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Subscribe →
              </a>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  )
}
