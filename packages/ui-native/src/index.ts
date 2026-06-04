// Config
export { otfConfig } from './config/tamagui.config'
export type { OtfConfig } from './config/tamagui.config'
// `otfBaseConfig` is the brand-aligned name; `tamaguiDefaultConfig` stays
// as a back-compat alias. Spread it into `createOTFConfig({ ...otfBaseConfig })`
// when deriving a custom config (custom fonts, tokens, animation driver).
export { defaultConfig as otfBaseConfig, defaultConfig as tamaguiDefaultConfig } from '@tamagui/config/v5'

// ─── OTF-branded high-level provider ─────────────────────────────────────────
// `<OTFProvider>` hides the createTamagui + config call so consumers never
// see Tamagui-flavoured names at their app root. Power users can still
// customise via the `config` prop.
export { OTFProvider } from './providers/OTFProvider'
export type { OTFProviderProps } from './providers/OTFProvider'

// Design Themes (maps platform's 16 design themes to Tamagui palettes)
export {
  OTF_DESIGN_THEMES,
  OTF_DESIGN_THEME_IDS,
  getOtfThemePalettes,
  getOtfDesignTheme,
} from './config/design-themes'
export type {
  OtfDesignThemeId,
  OtfColorPalette,
  OtfDesignTheme,
} from './config/design-themes'

// ─── Tamagui re-exports (full component library) ────────────────────────────
export {
  // Layout primitives
  View, Stack, SizableStack, ThemeableStack, Frame,
  XStack, YStack, ZStack, ScrollView,
  Circle, Square, Spacer, EnsureFlexed,
  // Groups
  Group, XGroup, YGroup,
  // Semantic HTML elements
  Header, Footer, Main, Nav, Article, Aside,
  // Text
  H1, H2, H3, H4, H5, H6, Heading, Paragraph, SizableText, Text, Label,
  // Forms (Button is intentionally NOT re-exported here — the canonical SDK
  // Button is our styled, variant-aware extension exported below)
  Input, TextArea, Switch, Checkbox, Slider, RadioGroup, Select, Fieldset, Form,
  // Display
  Card, Avatar, Separator, Image as TamaguiImage, Progress, Spinner,
  ListItem as TamaguiListItem, Anchor,
  // Overlay & portals
  Sheet, Dialog, AlertDialog, Popover, Tooltip, TooltipSimple,
  Portal, PortalHost, PortalItem, PortalProvider,
  // Navigation (composable Tamagui components)
  Tabs, Accordion, ToggleGroup,
  // Animation
  AnimatePresence,
  // Adapt
  Adapt,
  // Utilities
  VisuallyHidden, Unspaced,
  // Theme & config
  Theme,
  // Provider escape-hatches — `<OTFProvider>` (above) is the recommended root.
  // `OtfProvider` stays for back-compat with code shipped before 0.1.8;
  // `TamaguiProvider` is exposed for users hand-building a custom config.
  TamaguiProvider, TamaguiProvider as OtfProvider,
  // `createOTFConfig` is the brand-aligned re-export of `createTamagui` for
  // advanced theming where you need to derive a config object yourself.
  createTamagui, createTamagui as createOTFConfig,
  createFont, createMedia, createTheme, createTokens,
  createVariable, createStyledContext,
  addTheme, updateTheme, replaceTheme,
  // Styled
  styled, withStaticProperties,
  // Platform
  isWeb, isClient,
  // Token & config access
  getConfig, getToken, getTokens, getTokenValue,
  // Ref & event utilities
  composeRefs, composeEventHandlers,
  // Hooks
  useTheme, useMedia, useThemeName,
  useControllableState, useEvent, useForceUpdate,
  useIsomorphicLayoutEffect, useComposedRefs,
  useWindowDimensions, useDidFinishSSR,
  useDebounce, useDebounceValue,
  usePresence, useIsPresent,
  // Types
  type GetProps, type SizeTokens, type ColorTokens, type ThemeTokens,
} from 'tamagui'

// ─── Otf styled primitives (named to avoid Tamagui conflicts) ──────────────
// Canonical SDK Button = our styled, variant-aware component. `OtfButton` is
// kept as a back-compat alias for any consumer that already imported it.
export { Button, Button as OtfButton } from './primitives/Button'
export type { ButtonProps, ButtonProps as OtfButtonProps } from './primitives/Button'

export { OtfText } from './primitives/Text'
export type { OtfTextProps } from './primitives/Text'

// Premium switch — accent track when on, white shadowed thumb. Use this over
// the raw tamagui `Switch` (still exported) so toggles never read flat/dim.
export { OtfSwitch } from './primitives/OtfSwitch'
export type { OtfSwitchProps } from './primitives/OtfSwitch'

export { Card as OtfCard } from './primitives/Card'
export type { CardProps as OtfCardProps } from './primitives/Card'

export { Input as OtfInput } from './primitives/Input'
export type { InputProps as OtfInputProps } from './primitives/Input'

export { Avatar as OtfAvatar } from './primitives/Avatar'
export type { AvatarProps as OtfAvatarProps } from './primitives/Avatar'

// ─── Otf interface components ──────────────────────────────────────────────
export { SubHeading, SepHeading } from './interface/Headings'
export { PageContainer, PageMainContainer } from './interface/PageContainer'
export { DialogProvider, showError, dialogConfirm } from './interface/Dialog'
export { Pressable } from './interface/Pressable'
export { Image } from './interface/Image'
export { Badge } from './interface/Badge'
export type { BadgeProps } from './interface/Badge'

export { Icon, ICONS } from './interface/Icon'
export type { IconName, IconProps } from './interface/Icon'

export { OtfAccordion } from './interface/OtfAccordion'
export type { OtfAccordionProps, OtfAccordionItem } from './interface/OtfAccordion'

export { OtfTabs } from './interface/OtfTabs'
export type { OtfTabsProps, OtfTabItem } from './interface/OtfTabs'

export { OtfToggleGroup } from './interface/OtfToggleGroup'
export type { OtfToggleGroupProps, OtfToggleOption } from './interface/OtfToggleGroup'

export { OtfToastProvider, useOtfToast, toast } from './interface/OtfToast'
export type { OtfToastVariant, OtfToastData, OtfToastOptions, OtfToastContextType } from './interface/OtfToast'

export { FormField } from './interface/FormField'
export type { FormFieldProps } from './interface/FormField'

export { OtfTooltip } from './interface/Tooltip'
export type { TooltipProps } from './interface/Tooltip'

export { GoogleLogo, AppleLogo, GitHubLogo, MicrosoftLogo } from './interface/BrandIcons'

// ─── Otf layouts ───────────────────────────────────────────────────────────
export { StepPageLayout } from './layouts/StepPageLayout'
export type { StepPageProps } from './layouts/StepPageLayout'

export { ScreenLayout } from './layouts/ScreenLayout'

export { Section } from './layouts/Section'
export type { SectionProps } from './layouts/Section'

export { ListItem } from './layouts/ListItem'
export type { ListItemProps } from './layouts/ListItem'

export { Divider } from './layouts/Divider'
export type { DividerProps } from './layouts/Divider'

export { KeyboardStickyFooter } from './layouts/KeyboardStickyFooter'
export type { KeyboardStickyFooterProps } from './layouts/KeyboardStickyFooter'

export { SafeArea } from './layouts/SafeArea'
export type { SafeAreaProps } from './layouts/SafeArea'

export { Grid, Container } from './layouts/Grid'
export type { GridProps, ContainerProps } from './layouts/Grid'

// ─── Otf patterns ─────────────────────────────────────────────────────────
export { PaywallScreen } from './patterns/PaywallScreen'
export type {
  PaywallScreenProps,
  PlanOption,
  PaywallVariant,
  PaywallFeature,
  PaywallComparisonRow,
  PaywallTestimonial,
  PaywallCreator,
} from './patterns/PaywallScreen'

export { OnboardingCarousel } from './patterns/OnboardingCarousel'
export type { OnboardingCarouselProps, OnboardingStep, OnboardingVariant } from './patterns/OnboardingCarousel'

export { ChatBubble } from './patterns/ChatBubble'
export type { ChatBubbleProps, ChatMessage } from './patterns/ChatBubble'

export { SettingsScreen } from './patterns/SettingsScreen'
export type { SettingsScreenProps, SettingsSection, SettingsItem } from './patterns/SettingsScreen'

export { EmptyState } from './patterns/EmptyState'
export type { EmptyStateProps } from './patterns/EmptyState'

export { ProfileHeader } from './patterns/ProfileHeader'
export type { ProfileHeaderProps } from './patterns/ProfileHeader'

export { AppHeader } from './patterns/AppHeader'
export type { AppHeaderProps, AppHeaderVariant } from './patterns/AppHeader'

export { BottomSheet } from './patterns/BottomSheet'
export type { BottomSheetProps } from './patterns/BottomSheet'

export { LoginScreen } from './patterns/LoginScreen'
export type { LoginScreenProps, AuthProvider, AuthProviderBrand, LoginScreenVariant } from './patterns/LoginScreen'

export { TabBar } from './patterns/TabBar'
export type { TabBarProps, TabBarItem } from './patterns/TabBar'

export { ChipsTabBar } from './patterns/ChipsTabBar'
export type { ChipsTabBarProps, ChipsTabBarItem } from './patterns/ChipsTabBar'

export { SearchBar } from './patterns/SearchBar'
export type { SearchBarProps } from './patterns/SearchBar'

export { FloatingActionButton } from './patterns/FloatingActionButton'
export type { FABProps } from './patterns/FloatingActionButton'

export { ActionSheet } from './patterns/ActionSheet'
export type { ActionSheetProps, ActionSheetItem } from './patterns/ActionSheet'

export { Skeleton } from './patterns/Skeleton'
export type { SkeletonProps } from './patterns/Skeleton'

export { NotificationBanner } from './patterns/NotificationBanner'
export type { NotificationBannerProps } from './patterns/NotificationBanner'

export { ProgressSteps } from './patterns/ProgressSteps'
export type { ProgressStepsProps } from './patterns/ProgressSteps'

export { SwipeableRow } from './patterns/SwipeableRow'
export type { SwipeableRowProps, SwipeAction } from './patterns/SwipeableRow'

export { MediaCard } from './patterns/MediaCard'
export type { MediaCardProps } from './patterns/MediaCard'

export { Carousel } from './patterns/Carousel'
export type { CarouselProps } from './patterns/Carousel'

export { PullToRefresh } from './patterns/PullToRefresh'
export type { PullToRefreshProps } from './patterns/PullToRefresh'

export { ProductCard } from './patterns/ProductCard'
export type { ProductCardProps } from './patterns/ProductCard'

export { PriceTag } from './patterns/PriceTag'
export type { PriceTagProps } from './patterns/PriceTag'

export { QuantityStepper } from './patterns/QuantityStepper'
export type { QuantityStepperProps } from './patterns/QuantityStepper'

export { CartLineItem } from './patterns/CartLineItem'
export type { CartLineItemProps } from './patterns/CartLineItem'

export { VariantPicker } from './patterns/VariantPicker'
export type { VariantPickerProps, VariantOption } from './patterns/VariantPicker'

export { EmptyCart } from './patterns/EmptyCart'
export type { EmptyCartProps } from './patterns/EmptyCart'

export { PricingTable } from './patterns/PricingTable'
export type { PricingTableProps, PricingPlan } from './patterns/PricingTable'

export { CountdownBanner } from './patterns/CountdownBanner'
export type { CountdownBannerProps } from './patterns/CountdownBanner'

export { TestimonialCard } from './patterns/TestimonialCard'
export type { TestimonialCardProps } from './patterns/TestimonialCard'

export { ConfirmDialog } from './patterns/ConfirmDialog'
export type { ConfirmDialogProps } from './patterns/ConfirmDialog'

export { Chip, ChipGroup } from './patterns/Chip'
export type { ChipProps, ChipGroupProps } from './patterns/Chip'

export { OTPInput } from './patterns/OTPInput'
export type { OTPInputProps } from './patterns/OTPInput'

export { PasswordInput } from './patterns/PasswordInput'
export type { PasswordInputProps } from './patterns/PasswordInput'

export { AvatarGroup } from './patterns/AvatarGroup'
export type { AvatarGroupProps } from './patterns/AvatarGroup'

export { SwipeCards } from './patterns/SwipeCards'
export type { SwipeCardsProps, SwipeCardItem } from './patterns/SwipeCards'

export { GlassCard } from './patterns/GlassCard'
export type { GlassCardProps } from './patterns/GlassCard'

export { DataTable, StatusBadge } from './patterns/DataTable'
export type { DataTableProps, DataTableColumn } from './patterns/DataTable'

export { DatePicker } from './patterns/DatePicker'
export type { DatePickerProps } from './patterns/DatePicker'

export { EventCard } from './patterns/EventCard'
export type { EventCardProps } from './patterns/EventCard'

export { UserPreferences } from './patterns/UserPreferences'
export type { UserPreferencesProps, PreferenceSection, PreferenceItem } from './patterns/UserPreferences'

export { OtfSelect } from './patterns/OtfSelect'
export type { OtfSelectProps, OtfSelectItem } from './patterns/OtfSelect'

export { OtfDialog } from './patterns/OtfDialog'
export type { OtfDialogProps } from './patterns/OtfDialog'

export { OtfPopover } from './patterns/OtfPopover'
export type { OtfPopoverProps } from './patterns/OtfPopover'

// ─── Lucide Icons re-export ──────────────────────────────────────────────────
// Re-exported so consumers only need: import { Heart, Star } from '@otfdashkit/ui-native'
export * from '@tamagui/lucide-icons'

export { ImmersiveMediaScreen } from './patterns/ImmersiveMediaScreen'
export type { ImmersiveMediaScreenProps, ImmersiveMediaAction } from './patterns/ImmersiveMediaScreen'

export { FinanceDashboard } from './patterns/FinanceDashboard'
export type {
  FinanceDashboardProps,
  FinanceMetric,
  FinanceQuickAction,
  FinanceDashboardSection,
} from './patterns/FinanceDashboard'

// ─── Mobile flow primitives (MultiStep, Selectable, Expandable, etc.) ──────

export { MultiStep, Step, useMultiStep } from './patterns/MultiStep'
export type {
  MultiStepProps,
  StepProps,
  MultiStepTransition,
  MultiStepProgress,
  UseMultiStep,
} from './patterns/MultiStep'

export { Selectable, SelectableGroup } from './patterns/Selectable'
export type {
  SelectableProps,
  SelectableGroupProps,
  SelectableOption,
} from './patterns/Selectable'

export { AnimatedView } from './patterns/AnimatedView'
export type {
  AnimatedViewProps,
  AnimationPreset,
  AnimatedViewTrigger,
} from './patterns/AnimatedView'

export { Expandable } from './patterns/Expandable'
export type { ExpandableProps } from './patterns/Expandable'

export { WheelPicker } from './patterns/WheelPicker'
export type { WheelPickerProps, WheelPickerOption } from './patterns/WheelPicker'

export { RulerScrubber } from './patterns/RulerScrubber'
export type { RulerScrubberProps } from './patterns/RulerScrubber'

export { CardScroller } from './patterns/CardScroller'
export type { CardScrollerProps } from './patterns/CardScroller'

export { FloatingLabelInput } from './patterns/FloatingLabelInput'
export type { FloatingLabelInputProps } from './patterns/FloatingLabelInput'

// ─── Hooks ──────────────────────────────────────────────────────────────────

export { useCollapsibleHeader } from './hooks/useCollapsibleHeader'
export type {
  UseCollapsibleHeaderOptions,
  UseCollapsibleHeaderReturn,
} from './hooks/useCollapsibleHeader'

// ─── Shockwave is NOT shipped via npm — it's a CLI-installed component ────
// Shockwave imports `@shopify/react-native-skia` + `react-native-worklets`
// at module top level. Metro resolves every import at bundle time regardless
// of `peerDependenciesMeta.optional`, so re-exporting it from the npm barrel
// would force every consumer (even one importing only `<Button>`) to install
// Skia. Subpath exports were tried (PRs #88-#90) and broke metro resolution
// in inconsistent ways.
//
// We follow the reacticx (the original Shockwave author) distribution model
// instead: heavy-peer components are CLI-only, source-only. Source lives at
// `packages/ui-native/registry/components/shockwave/`. Consumers run:
//
//   npx @otfdashkit/cli add shockwave
//
// …which copies the source into their project + prompts them to install the
// peer deps. Full rules: `.claude/skills/otf-arch/PEER-DEP-RULES.md`.

// ─── Stay (real-estate / booking marketing screens) ─────────────────────────

export { StayBrowseScreen, StayDetailScreen } from './patterns/StayCard'
export type {
  StayBrowseScreenProps,
  StayCategoryChip,
  StayDetailMetric,
  StayDetailScreenProps,
  StayListing,
} from './patterns/StayCard'
