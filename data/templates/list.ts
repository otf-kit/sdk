// Lightweight metadata for ALL templates (live + coming soon).
// Single source of truth for the /templates listing page + future surfaces.

export type TemplateListEntry = {
  detailSlug: string | null    // null for coming-soon kits with no detail page
  kitSlug: string | null       // Stripe kit slug (null for coming soon)
  name: string
  subtitle: string             // one-line tagline shown under the name
  description: string          // longer paragraph for the card body
  platform: string             // e.g. "Vite + Hono"
  category: 'SaaS' | 'Mobile' | 'Services' | 'Events' | 'Directory' | 'Creator'
  status: 'available' | 'soon'
  price: string                // "$149", "$99"
  screens: number
  accent: string               // hex used for dot + accents
  /** Live demo URL — Railway-hosted kit demo */
  demoUrl?: string
  /** Phone-frame preview URL — used by phone-shape kits */
  previewUrl?: string
  previewShape: 'desktop' | 'phone'
  /** Three concrete feature bullets surfaced on the live kit hero card */
  highlights: string[]
  /** Example prompt to drop into Cursor / Claude — shown as a terminal-style block */
  claudePrompt: string
  /** Tags shown as small pills */
  tags: string[]
}

export const templateList: TemplateListEntry[] = [
  {
    detailSlug:   'saas-dashboard',
    kitSlug:      'saas-dashboard',
    name:         'SaaS Dashboard Kit',
    subtitle:     'Your idea is already half-built. Describe the rest to Claude.',
    description:  'Auth, database, payments, and a full dashboard already working. Open it in Cursor and describe what your product does — Claude already knows the codebase.',
    platform:     'Vite + Hono',
    category:     'SaaS',
    status:       'available',
    price:        '$149',
    screens:      11,
    accent:       '#f97316',
    demoUrl:      'https://saas.otf-kit.dev',
    previewUrl:   'https://saas.otf-kit.dev',
    previewShape: 'desktop',
    highlights: [
      'Better Auth + Postgres + Drizzle pre-wired',
      'Stripe Checkout + customer portal hooked up',
      '11 production screens — dashboard, kanban, analytics, settings',
    ],
    claudePrompt: '"Add a new project type called Marketing Campaign with a budget field"',
    tags:         ['Cursor-ready', 'CLAUDE.md included', '11 screens', 'Stripe wired'],
  },
  {
    detailSlug:   'fitness-kit',
    kitSlug:      'fitness-kit',
    name:         'Fitness & Wellness Kit',
    subtitle:     'Apple-Fitness-style activity rings, workout logging, awards. Reskin it for anything in 10 minutes.',
    description:  'Mobile-first fitness template — Expo SDK 54 + Hono + Drizzle + Better Auth. One codebase ships iOS, Android, and web. Activity rings, workout logging, weekly trends, awards, and a friend-activity feed.',
    platform:     'Expo + Hono',
    category:     'Mobile',
    status:       'available',
    price:        '$149',
    screens:      12,
    accent:       '#ff375f',
    demoUrl:      'https://fitness.otf-kit.dev',
    previewUrl:   'https://fitness-preview.otf-kit.dev',
    previewShape: 'phone',
    highlights: [
      'iOS + Android + web from one Expo codebase',
      'Activity rings, workout logging, weekly trends',
      'Better Auth (email + Google + bearer) wired',
    ],
    claudePrompt: '"Reskin this for runners — swap calories for pace, add a route map placeholder"',
    tags:         ['Cursor-ready', 'CLAUDE.md included', '12 screens', 'iOS + Android + web'],
  },
  {
    detailSlug:   null,
    kitSlug:      null,
    name:         'Booking & Appointments Kit',
    subtitle:     'For coaches, tutors, salons — take appointments and get paid.',
    description:  'Calendar booking, Stripe payments, email reminders, and client history. No more Calendly fees — own your booking system.',
    platform:     'Next.js + Expo',
    category:     'Services',
    status:       'soon',
    price:        '$149',
    screens:      8,
    accent:       '#3b82f6',
    previewShape: 'desktop',
    highlights: [
      'Calendar with timezone-aware availability',
      'Stripe payments + Resend email reminders',
      'Client history + recurring sessions',
    ],
    claudePrompt: '"Change this to dog grooming sessions at $60/hour, add a breed field"',
    tags:         ['Cursor-ready', 'CLAUDE.md included', '8 screens', 'Stripe wired'],
  },
  {
    detailSlug:   null,
    kitSlug:      null,
    name:         'Event & Ticketing Kit',
    subtitle:     'Run events. Sell tickets. Keep 100% of the revenue.',
    description:  'Event pages, ticket tiers, QR check-in, and attendee management. Eventbrite charges 6-8% — this is $149 once.',
    platform:     'Next.js + Hono',
    category:     'Events',
    status:       'soon',
    price:        '$149',
    screens:      8,
    accent:       '#f59e0b',
    previewShape: 'desktop',
    highlights: [
      'Multi-tier tickets + early-bird pricing',
      'QR check-in + attendee dashboard',
      'No platform fees — keep 100% of revenue',
    ],
    claudePrompt: '"Add a VIP tier at $499 with a dinner label, limit to 20 seats"',
    tags:         ['Cursor-ready', 'CLAUDE.md included', '8 screens', 'Stripe wired'],
  },
  {
    detailSlug:   null,
    kitSlug:      null,
    name:         'Directory & Listings Kit',
    subtitle:     'Build the best [X] directory in your niche.',
    description:  'Submit listings, browse and filter, featured placements, and SEO-ready pages. One kit — job boards, tool directories, local guides, resource hubs.',
    platform:     'Next.js + Hono',
    category:     'Directory',
    status:       'soon',
    price:        '$149',
    screens:      9,
    accent:       '#22c55e',
    previewShape: 'desktop',
    highlights: [
      'SEO-ready listing pages + sitemap',
      'Featured placement upsell flow',
      'Filter + faceted search ready to extend',
    ],
    claudePrompt: '"Change this into a directory of AI tools for lawyers, add a monthly pricing filter"',
    tags:         ['Cursor-ready', 'CLAUDE.md included', '9 screens', 'Stripe wired'],
  },
  {
    detailSlug:   null,
    kitSlug:      null,
    name:         'Newsletter & Blog Kit',
    subtitle:     'Your own Substack. No 10% cut. Forever.',
    description:  'Write, publish, and charge subscribers — free and paid tiers. Email delivery included. Own your audience, not rent it.',
    platform:     'Next.js + Hono',
    category:     'Creator',
    status:       'soon',
    price:        '$149',
    screens:      8,
    accent:       '#8b5cf6',
    previewShape: 'desktop',
    highlights: [
      'Free + paid tier subscribers',
      'Resend transactional email built-in',
      'Markdown editor + RSS + Atom feeds',
    ],
    claudePrompt: '"Set up a paid tier at $9/month for premium posts, free users get 3 posts/month"',
    tags:         ['Cursor-ready', 'CLAUDE.md included', '8 screens', 'Stripe wired'],
  },
  {
    detailSlug:   null,
    kitSlug:      null,
    name:         'Creator Hub Kit',
    subtitle:     'Your Linktree — but you own it, and you can charge for it.',
    description:  'Link page, click analytics, pay-to-view content, and email capture. Linktree charges $24/month — this is $99 once.',
    platform:     'Next.js',
    category:     'Creator',
    status:       'soon',
    price:        '$99',
    screens:      6,
    accent:       '#ec4899',
    previewShape: 'desktop',
    highlights: [
      'Link page + click analytics',
      'Pay-to-view content gates',
      'Email capture + Resend integration',
    ],
    claudePrompt: '"Add a section where fans can pay $199 to book a 1-hour call with me"',
    tags:         ['Cursor-ready', 'CLAUDE.md included', '6 screens', 'Stripe wired'],
  },
]

export const liveTemplates = templateList.filter((t) => t.status === 'available')
export const soonTemplates = templateList.filter((t) => t.status === 'soon')

export function getTemplateListEntry(detailSlug: string): TemplateListEntry | undefined {
  return templateList.find((t) => t.detailSlug === detailSlug)
}
