// @otf/ui-native — Phase 1.5 design system
// Phase 1.5 exports first, old SDK stubs commented out (broken relative imports)

export * from './config/tamagui.config'

// ── Phase 1.5 primitives ────────────────────────────────────────
export * from './primitives/Avatar'
export * from './primitives/Button'
export * from './primitives/Card'
export * from './primitives/Dialog'
export * from './primitives/Input'
export * from './primitives/Text'
export * from './primitives/Skeleton'
export * from './primitives/EmptyState'
export * from './primitives/PageLayout'
export * from './primitives/Toast'

// ── Phase 1.5 modules ───────────────────────────────────────────
export * from './feedback'
export * from './layout'
export * from './headers'
export * from './nav'

// ── SDK stubs ──────────────────────────────────────────────
// Commented out: these have broken relative imports and collisions
// with Phase 1.5 exports. Will be ported on-demand in Phase 3.
//
// patterns: ActionSheet, AppHeader, AvatarGroup, BottomSheet,
//   Carousel, ChatBubble, Chip, ConfirmDialog, CountdownBanner,
//   DataTable, DatePicker, EmptyState*, EventCard, FinanceDashboard,
//   FloatingActionButton, GlassCard, ImmersiveMediaScreen,
//   LoginScreen, MediaCard, NotificationBanner, OTPInput,
//   OnboardingCarousel, OtfDialog, OtfPopover, OtfSelect,
//   PasswordInput, PaywallScreen, PricingTable, ProductCard,
//   ProfileHeader, ProgressSteps, PullToRefresh, SearchBar,
//   SettingsScreen, Skeleton*, SwipeCards, SwipeableRow, TabBar,
//   TestimonialCard, UserPreferences
// layouts: Divider, Grid, KeyboardStickyFooter, ListItem,
//   SafeArea, ScreenLayout, Section, StepPageLayout
// interface: Badge, BrandIcons, Dialog, FormField, Headings,
//   Icon, Image, OtfAccordion, OtfTabs, OtfToast*,
//   OtfToggleGroup, PageContainer*, Pressable, Separator, Tooltip
//
// * = collides with Phase 1.5 export
