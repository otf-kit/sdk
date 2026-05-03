// Single source of truth for what categories + entries exist in the
// showcase. Sidebar, landing page, and category index pages all read
// from here so adding a new primitive only requires:
//   1. Drop a screen at app/<category>/<slug>.tsx
//   2. Add an entry below
//
// The `status` flag drives badging in the sidebar/landing.
//
// status:
//   "ready"       — component shipped, screen exercises every variant
//   "stub"        — screen exists but only renders placeholders
//   "coming-soon" — screen renders the "Coming in Wave 1" message

export type EntryStatus = 'ready' | 'stub' | 'coming-soon'

export interface Entry {
  slug: string
  title: string
  description: string
  status: EntryStatus
}

export interface Category {
  id: 'primitives' | 'interface' | 'layouts' | 'patterns'
  title: string
  description: string
  entries: Entry[]
}

export const CATALOG: Category[] = [
  {
    id: 'primitives',
    title: 'Primitives',
    description: 'Atomic building blocks — Button, Text, Card, Input, Avatar.',
    entries: [
      { slug: 'button', title: 'Button', description: 'Press targets — variant, size, tone, loading, disabled.', status: 'ready' },
      { slug: 'text', title: 'Text', description: 'Typography ramp — H1..H6, Paragraph, SizableText, weight scale.', status: 'ready' },
      { slug: 'card', title: 'Card', description: 'Surface container with elevation, padding, and subtle border.', status: 'ready' },
      { slug: 'input', title: 'Input', description: 'Text fields — sizes, focus states, disabled, with icon.', status: 'ready' },
      { slug: 'avatar', title: 'Avatar', description: 'User portrait — sizes, initials fallback, image source.', status: 'ready' },
    ],
  },
  {
    id: 'interface',
    title: 'Interface',
    description: 'Building blocks one level above primitives — badges, icons, tabs, accordions.',
    entries: [
      { slug: 'badge', title: 'Badge', description: 'Status pill — variant, size, with-icon.', status: 'ready' },
      { slug: 'icon', title: 'Icon', description: 'Lucide icon set — sizes, colors, named slots.', status: 'ready' },
      { slug: 'accordion', title: 'Accordion', description: 'Expand/collapse list of disclosure rows.', status: 'stub' },
      { slug: 'tabs', title: 'Tabs', description: 'Switch between content panels with a header strip.', status: 'stub' },
      { slug: 'toggle-group', title: 'Toggle Group', description: 'Multi/single toggle pills.', status: 'stub' },
      { slug: 'tooltip', title: 'Tooltip', description: 'Hover/long-press helper text.', status: 'stub' },
      { slug: 'form-field', title: 'Form Field', description: 'Label + input + helper/error wrapper.', status: 'stub' },
      { slug: 'brand-icons', title: 'Brand Icons', description: 'Google / Apple / GitHub / Microsoft logos.', status: 'stub' },
    ],
  },
  {
    id: 'layouts',
    title: 'Layouts',
    description: 'Page structure — screens, sections, lists, dividers, safe areas.',
    entries: [
      { slug: 'section', title: 'Section', description: 'Titled group of content with optional action.', status: 'ready' },
      { slug: 'list-item', title: 'List Item', description: 'Row with leading icon, label, trailing accessory.', status: 'ready' },
      { slug: 'screen-layout', title: 'Screen Layout', description: 'Padded scrollable shell every screen sits inside.', status: 'stub' },
      { slug: 'step-page-layout', title: 'Step Page Layout', description: 'Onboarding-step shell with progress + footer CTA.', status: 'stub' },
      { slug: 'divider', title: 'Divider', description: 'Hairline separator with optional inset.', status: 'stub' },
      { slug: 'grid', title: 'Grid', description: 'Responsive flex grid + Container.', status: 'stub' },
      { slug: 'safe-area', title: 'Safe Area', description: 'Edge-aware padding wrapper.', status: 'stub' },
      { slug: 'keyboard-sticky-footer', title: 'Keyboard Sticky Footer', description: 'CTA bar that hugs the keyboard.', status: 'stub' },
    ],
  },
  {
    id: 'patterns',
    title: 'Patterns',
    description: 'Composed components — chips, sheets, headers, multi-step flows.',
    entries: [
      { slug: 'chip', title: 'Chip', description: 'Selectable pill — variant, size, selected, with-remove.', status: 'ready' },
      { slug: 'multistep', title: 'MultiStep', description: 'Multi-page flow with header progress + back/next.', status: 'coming-soon' },
      { slug: 'selectable', title: 'Selectable', description: 'Tap-target wrapper with selected state + scale-press.', status: 'coming-soon' },
      { slug: 'animated-view', title: 'AnimatedView', description: 'Generic enter/exit/stagger animator.', status: 'coming-soon' },
      { slug: 'expandable', title: 'Expandable', description: 'Animated open/close container.', status: 'coming-soon' },
      { slug: 'app-header', title: 'App Header', description: 'Top bar with title + leading/trailing actions.', status: 'stub' },
      { slug: 'bottom-sheet', title: 'Bottom Sheet', description: 'Gorhom-backed bottom sheet shell.', status: 'stub' },
      { slug: 'empty-state', title: 'Empty State', description: 'Iconography + title + body + CTA when a list is empty.', status: 'stub' },
      { slug: 'search-bar', title: 'Search Bar', description: 'Pill input with leading icon + clear button.', status: 'stub' },
      { slug: 'tab-bar', title: 'Tab Bar', description: 'Floating bottom navigator.', status: 'stub' },
      { slug: 'fab', title: 'Floating Action Button', description: 'Anchored CTA over content.', status: 'stub' },
      { slug: 'skeleton', title: 'Skeleton', description: 'Shimmer placeholder mirroring layout.', status: 'stub' },
      { slug: 'profile-header', title: 'Profile Header', description: 'Avatar + name + meta + actions.', status: 'stub' },
      { slug: 'pricing-table', title: 'Pricing Table', description: 'Plan cards with feature lists.', status: 'stub' },
      { slug: 'paywall-screen', title: 'Paywall Screen', description: 'Subscription wall with hero + plans.', status: 'stub' },
      { slug: 'onboarding-carousel', title: 'Onboarding Carousel', description: 'Swipeable intro slides.', status: 'stub' },
      { slug: 'login-screen', title: 'Login Screen', description: 'Email + provider auth shell.', status: 'stub' },
      { slug: 'otp-input', title: 'OTP Input', description: 'Code-entry boxes for 2FA.', status: 'stub' },
      { slug: 'date-picker', title: 'Date Picker', description: 'Calendar / wheel date selector.', status: 'stub' },
      { slug: 'wheel-picker', title: 'WheelPicker', description: 'iOS-flavored vertical scroll-wheel for height / weight / enums.', status: 'ready' },
      { slug: 'ruler-scrubber', title: 'RulerScrubber', description: 'Horizontal ruler scrubber with snap, ticks, and value display.', status: 'ready' },
    ],
  },
]

export function getCategory(id: Category['id']): Category {
  const cat = CATALOG.find((c) => c.id === id)
  if (!cat) throw new Error(`Unknown category: ${id}`)
  return cat
}

export function readyCount(category: Category): number {
  return category.entries.filter((e) => e.status === 'ready').length
}
