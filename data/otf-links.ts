// Navigation link maps for surfaces OTHER than the main /components page —
// the mobile hamburger sheet, the global ⌘K command palette, and the footer.
//
// IMPORTANT: `componentLinks` is derived from `component-registry.ts` (the
// single source of truth for all 212 components, web + mobile). Do NOT
// hand-maintain a parallel list here — every previous attempt drifted out
// of sync (e.g. "Command" → /components/command which 404s; the real slug
// is /components/command-palette). When you add a component, add it to
// component-registry.ts and these links update automatically.

import { components as componentRegistry } from './component-registry'

export const docsLinks = [
  { label: 'Introduction', href: '/docs' },
  { label: 'Getting Started', href: '/docs/getting-started' },
  { label: 'Components', href: '/components' },
  { label: 'Templates', href: '/templates' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'AI Configs', href: '/docs/ai-configs' },
  { label: 'Contributing', href: '/docs/contributing' },
  { label: 'Changelog', href: '/docs/changelog' },
]

// All 212 components from the registry — web + mobile. The label includes
// a `[Mobile]` suffix for native entries so users can tell at a glance
// whether they're tapping into the web SDK or the React-Native showcase.
export const componentLinks = componentRegistry.map((c) => ({
  label: c.stack === 'mobile' ? `${c.name}` : c.name,
  href: `/components/${c.slug}`,
  hint: c.description,
  stack: c.stack,
}))

// Blocks and Patterns routes are aspirational — `/blocks/*` and `/patterns/*`
// do not exist on this app yet. Keep these arrays empty so nothing renders
// (and nothing 404s) until those route trees ship. The MobileNavSheet and
// CommandPalette already handle empty arrays by hiding the corresponding tab.
export const blockLinks: { label: string; href: string }[] = []
export const patternLinks: { label: string; href: string }[] = []

export const communityLinks = [
  { label: 'GitHub', href: 'https://github.com/open-template-forest' },
  { label: 'Twitter / X', href: 'https://x.com/opentemplatefst' },
  { label: 'Discord', href: '/#waitlist' },
  { label: 'Contributing', href: '/docs/contributing' },
]
