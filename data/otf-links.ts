// Navigation link maps for surfaces OTHER than the main /components page —
// the mobile hamburger sheet, the global ⌘K command palette, and the footer.
//
// IMPORTANT: `componentLinks` is derived from `component-registry.ts` (the
// single source of truth for all 212 components, web + mobile). Do NOT
// hand-maintain a parallel list here — every previous attempt drifted out
// of sync (e.g. "Command" → /components/command which 404s; the real slug
// is /components/command-palette). When you add a component, add it to
// component-registry.ts and these links update automatically.

import { componentsByKind } from './component-registry'

export const docsLinks = [
  { label: 'Introduction', href: '/docs' },
  { label: 'Getting Started', href: '/docs/getting-started' },
  { label: 'Components', href: '/components' },
  { label: 'Templates', href: '/templates' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'AI Configs', href: '/docs/ai-configs' },
  { label: 'Contributing', href: '/docs/contributing' },
  { label: 'Changelog', href: '/changelog' },
]

// Three kind buckets — derived from `getKind(c)` in component-registry.ts.
// Each detail page lives at `/components/<slug>` regardless of kind, so all
// links route there. The /components, /blocks, /patterns INDEX pages filter
// on `kind` for their own grids; this map drives the global nav surfaces.
const toLink = (c: ReturnType<typeof componentsByKind>[number]) => ({
  label: c.name,
  href: `/components/${c.slug}`,
  hint: c.description,
  stack: c.stack,
})

export const componentLinks = componentsByKind('component').map(toLink)
export const blockLinks     = componentsByKind('block').map(toLink)
export const patternLinks   = componentsByKind('pattern').map(toLink)

export const communityLinks = [
  { label: 'GitHub', href: 'https://github.com/open-template-forest' },
  { label: 'Twitter / X', href: 'https://x.com/opentemplatefst' },
  { label: 'Discord', href: '/#waitlist' },
  { label: 'Contributing', href: '/docs/contributing' },
]
