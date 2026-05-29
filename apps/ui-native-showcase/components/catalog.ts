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
  /**
   * Component is native-only — its route renders <MobileOnlyFallback>
   * (QR codes pointing at the OTF preview build) on web, and the real
   * demo on iOS / Android.
   */
  mobileOnly?: boolean
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
    description: 'Building blocks one level above primitives — badges, icons, accordions, toasts, dialogs.',
    entries: [
      { slug: 'badge', title: 'Badge', description: 'Status pill — variant, size, with-icon.', status: 'ready' },
      { slug: 'icon', title: 'Icon', description: 'Lucide icon set — sizes, colors, named slots.', status: 'ready' },
      { slug: 'accordion', title: 'Accordion', description: 'Expand/collapse list of disclosure rows; single + multi modes.', status: 'ready' },
      { slug: 'tabs', title: 'Tabs', description: 'Switch between content panels — underline + pill variants.', status: 'ready' },
      { slug: 'toggle-group', title: 'Toggle Group', description: 'Single-select pill group with size variants.', status: 'ready' },
      { slug: 'tooltip', title: 'Tooltip', description: 'Long-press / hover helper text with placement variants.', status: 'ready' },
      { slug: 'form-field', title: 'Form Field', description: 'Label + input + helper / error wrapper.', status: 'ready' },
      { slug: 'brand-icons', title: 'Brand Icons', description: 'Google / Apple / GitHub / Microsoft logos at common sizes.', status: 'ready' },
      { slug: 'headings', title: 'Headings', description: 'SubHeading + SepHeading — section titles with optional separator.', status: 'ready' },
      { slug: 'page-container', title: 'Page Container', description: 'PageContainer + PageMainContainer — outer screen chrome.', status: 'ready' },
      { slug: 'pressable', title: 'Pressable', description: 'Tap target — press animation, disabled, hit slop, modifiers.', status: 'ready' },
      { slug: 'image', title: 'Image', description: 'Image with aspect ratio, fit, fallback, and rounded variants.', status: 'ready' },
      { slug: 'toast', title: 'Toast', description: 'useOtfToast + toast() — success / error / info / warning variants.', status: 'ready' },
      { slug: 'dialog', title: 'Dialog', description: 'DialogProvider + dialogConfirm + showError — imperative API.', status: 'ready' },
    ],
  },
  {
    id: 'layouts',
    title: 'Layouts',
    description: 'Page structure — screens, sections, lists, dividers, safe areas.',
    entries: [
      { slug: 'section', title: 'Section', description: 'Titled group of content with optional action.', status: 'ready' },
      { slug: 'list-item', title: 'List Item', description: 'Row with leading icon, label, trailing accessory (chevron / switch / value / badge).', status: 'ready' },
      { slug: 'screen-layout', title: 'Screen Layout', description: 'Padded scrollable shell with padded / centered / safe variants.', status: 'ready' },
      { slug: 'step-page-layout', title: 'Step Page Layout', description: 'Onboarding-step shell — title + description + content + footer slot.', status: 'ready' },
      { slug: 'divider', title: 'Divider', description: 'Hairline separator with optional inline label.', status: 'ready' },
      { slug: 'grid', title: 'Grid', description: 'Responsive flex grid — 2 / 3 / 4 columns + Container.', status: 'ready' },
      { slug: 'safe-area', title: 'Safe Area', description: 'Edge-aware padding wrapper with configurable edges.', status: 'ready' },
      { slug: 'keyboard-sticky-footer', title: 'Keyboard Sticky Footer', description: 'CTA bar that hugs the keyboard above the bottom inset.', status: 'ready' },
    ],
  },
  {
    id: 'patterns',
    title: 'Patterns',
    description: 'Composed components — chips, sheets, headers, multi-step flows, full-screen surfaces.',
    entries: [
      // T1 mobile flow primitives
      { slug: 'chip', title: 'Chip', description: 'Selectable pill — variant, size, selected, with-remove.', status: 'ready' },
      { slug: 'multistep', title: 'MultiStep', description: 'Declarative wizard — bar/dots/segments progress, slide+fade transitions.', status: 'ready' },
      { slug: 'selectable', title: 'Selectable', description: 'Single + multi option cards (card / row / tile variants).', status: 'ready' },
      { slug: 'animated-view', title: 'AnimatedView', description: 'Declarative entrance — 10 presets, stagger, viewport trigger.', status: 'ready' },
      { slug: 'expandable', title: 'Expandable', description: 'Single-row accordion — controlled / uncontrolled, plain + card.', status: 'ready' },
      { slug: 'app-header', title: 'App Header', description: 'Top bar — 4 layout variants × 3 surface variants + collapsible.', status: 'ready' },
      { slug: 'card-scroller', title: 'CardScroller', description: 'Snap-to-card horizontal scroller with auto-center + fade-off.', status: 'ready' },
      { slug: 'fab', title: 'Floating Action Button', description: 'Anchored CTA — legacy circle/pill + expanding actions menu w/ backdrop.', status: 'ready' },
      { slug: 'wheel-picker', title: 'WheelPicker', description: 'iOS-flavored vertical scroll-wheel for height / weight / enums.', status: 'ready' },
      { slug: 'ruler-scrubber', title: 'RulerScrubber', description: 'Horizontal ruler scrubber with snap, ticks, value display.', status: 'ready' },
      // Premium screens
      { slug: 'paywall-screen', title: 'Paywall Screen', description: 'Subscription wall — default, social-proof, comparison, countdown urgency.', status: 'ready' },
      { slug: 'login-screen', title: 'Login Screen', description: 'Email + provider auth — providers, email-only, editorial, branded.', status: 'ready' },
      { slug: 'onboarding-carousel', title: 'Onboarding Carousel', description: 'Swipeable intro — default, calm-gradient, card-tilt, editorial.', status: 'ready' },
      { slug: 'finance-dashboard', title: 'Finance Dashboard', description: 'Balance hero + metrics + quick actions + transactions list.', status: 'ready' },
      { slug: 'immersive-media-screen', title: 'Immersive Media', description: 'Full-bleed image hero with overlay actions and metadata.', status: 'ready' },
      { slug: 'pricing-table', title: 'Pricing Table', description: '3-plan table with billing toggle and best-value annual variant.', status: 'ready' },
      { slug: 'settings-screen', title: 'Settings Screen', description: 'Sectioned account / preferences / legal screen.', status: 'ready' },
      { slug: 'profile-header', title: 'Profile Header', description: 'Avatar + name + meta + actions — default, with-stats, compact, verbose.', status: 'ready' },
      // Sheets, dialogs, popovers
      { slug: 'bottom-sheet', title: 'Bottom Sheet', description: 'Bottom-anchored sheet — action menu, settings, destructive confirm, filter.', status: 'ready' },
      { slug: 'action-sheet', title: 'Action Sheet', description: 'iOS-style action sheet with destructive + neutral options.', status: 'ready' },
      { slug: 'confirm-dialog', title: 'Confirm Dialog', description: 'Centered confirm/cancel with destructive variant.', status: 'ready' },
      { slug: 'otf-dialog', title: 'Dialog', description: 'Centered modal dialog with multiple sizes.', status: 'ready' },
      { slug: 'otf-popover', title: 'Popover', description: 'Anchored floating panel with placement variants.', status: 'ready' },
      // Inputs
      { slug: 'date-picker', title: 'Date Picker', description: 'Single, range, min/max bounded; Sunday-first.', status: 'ready' },
      { slug: 'floating-label-input', title: 'Floating Label Input', description: 'Label sits inside the field at rest; floats up + shrinks on focus or when filled. Reanimated 4 spring.', status: 'ready' },
      { slug: 'otp-input', title: 'OTP Input', description: '4 / 6 digit code entry, masked, error state.', status: 'ready' },
      { slug: 'password-input', title: 'Password Input', description: 'With show/hide toggle and strength indicator.', status: 'ready' },
      { slug: 'search-bar', title: 'Search Bar', description: 'Default, with-filter, with-cancel, live-filtered, modal-overlay.', status: 'ready' },
      { slug: 'otf-select', title: 'Select', description: 'Dropdown with placeholder, default value, disabled state.', status: 'ready' },
      // Indicators
      { slug: 'skeleton', title: 'Skeleton', description: 'Shimmer placeholders — text / circular / rectangular + composed states.', status: 'ready' },
      { slug: 'progress-steps', title: 'Progress Steps', description: 'Step indicator with current marker + labels.', status: 'ready' },
      { slug: 'countdown-banner', title: 'Countdown Banner', description: 'Live timer banner with CTA — 24h, 7d, with cancel.', status: 'ready' },
      { slug: 'notification-banner', title: 'Notification Banner', description: 'Inline banners — success / info / warning / error, dismissible.', status: 'ready' },
      // Lists
      { slug: 'data-table', title: 'Data Table', description: 'Sortable columns + StatusBadge cells.', status: 'ready' },
      { slug: 'tab-bar', title: 'Tab Bar', description: 'Floating bottom navigator with badges (count + dot) and icons-only.', status: 'ready' },
      { slug: 'chips-tab-bar', title: 'Chips Tab Bar', description: 'Horizontal chip-style tab strip for category switching.', status: 'ready' },
      // Cards & gestures
      { slug: 'media-card', title: 'Media Card', description: 'Image + title + subtitle + actions in 2 sizes.', status: 'ready' },
      { slug: 'product-card', title: 'Product Card', description: 'E-commerce: image + title + price + rating + add-to-cart.', status: 'ready' },
      { slug: 'price-tag', title: 'Price Tag', description: 'Currency price with compare-at strikethrough + discount pill.', status: 'ready' },
      { slug: 'quantity-stepper', title: 'Quantity Stepper', description: 'Increment / decrement quantity control with min/max clamp.', status: 'ready' },
      { slug: 'variant-picker', title: 'Variant Picker', description: 'Single-select product options (grind / size / color) + out-of-stock.', status: 'ready' },
      { slug: 'cart-line-item', title: 'Cart Line Item', description: 'Cart row — thumbnail, title, variant, price, stepper, remove.', status: 'ready' },
      { slug: 'empty-cart', title: 'Empty Cart', description: 'Empty-cart state with cart icon + continue-shopping CTA.', status: 'ready' },
      { slug: 'event-card', title: 'Event Card', description: 'Date + title + location + RSVP, 3 variants.', status: 'ready' },
      { slug: 'testimonial-card', title: 'Testimonial Card', description: 'Quote + name + role + avatar in 3 visual variants.', status: 'ready' },
      { slug: 'glass-card', title: 'Glass Card', description: 'Frosted-glass surface over colorful backgrounds — multiple intensities.', status: 'ready' },
      { slug: 'avatar-group', title: 'Avatar Group', description: 'Stacked avatar overlap — 3, 5, 8+ with max prop.', status: 'ready' },
      { slug: 'swipe-cards', title: 'Swipe Cards', description: 'Tinder-style 5-card stack with left/right swipe callbacks.', status: 'ready' },
      { slug: 'swipeable-row', title: 'Swipeable Row', description: 'List row with left + right swipe actions.', status: 'ready' },
      { slug: 'carousel', title: 'Carousel', description: '3-card paged carousel with indicator dots.', status: 'ready' },
      // Real-estate marketing screens — native premium experience, paired
      // with Shockwave on the Shockwave route. Web routes show
      // MobileOnlyFallback to drive visitors onto the QR + real device.
      { slug: 'stay-browse', title: 'Stay Browse', description: 'Hospitality / real-estate search screen — greeting, multi-line headline, category chips, featured listing card.', status: 'ready', mobileOnly: true },
      { slug: 'stay-detail', title: 'Stay Detail', description: 'Booking-confirmation screen — hero image, rating chip, price + owner subtitle, metric row, accent CTA.', status: 'ready', mobileOnly: true },
      // Effects
      { slug: 'shockwave', title: 'Shockwave', description: 'Skia-shader transition that auto-cycles between Stay Browse and Stay Detail every ~2s — chromatic ripple from a configurable origin. Adapted from reacticx (MIT).', status: 'ready', mobileOnly: true },
      { slug: 'pull-to-refresh', title: 'Pull To Refresh', description: 'Constrained list with refresh handler and indicator.', status: 'ready' },
      // Misc
      { slug: 'chat-bubble', title: 'Chat Bubble', description: 'User vs assistant bubbles with avatar + timestamp; thread mock.', status: 'ready' },
      { slug: 'empty-state', title: 'Empty State', description: 'Iconography + title + body + CTA — inbox, search, cart, network, invite.', status: 'ready' },
      { slug: 'user-preferences', title: 'User Preferences', description: 'Sectioned toggle list — notifications, privacy, account.', status: 'ready' },
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
