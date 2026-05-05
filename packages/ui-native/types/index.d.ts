/* eslint-disable @typescript-eslint/no-explicit-any */
// Hand-written type stub for @otfdashkit/ui-native. The kit's React 19 typecheck
// otherwise walks into Tamagui's React 18-pinned types. The runtime JS bundle
// is produced from src/ via tsup; this file only exists to satisfy the type
// resolver in consumer kits.

// ─── Tamagui pass-through (full library) ──────────────────────────────────────
export * from 'tamagui'

// Aliases that don't auto-export from tamagui because they're renamed
export { TamaguiProvider as OtfProvider, Image as TamaguiImage, ListItem as TamaguiListItem } from 'tamagui'
import { TamaguiInternalConfig } from 'tamagui'

// ─── Lucide icons pass-through ────────────────────────────────────────────────
export * from '@tamagui/lucide-icons'

// ─── Default Tamagui config re-export (for createTamagui calls) ──────────────
export { defaultConfig as tamaguiDefaultConfig } from '@tamagui/config/v5'

// ─── OTF config ───────────────────────────────────────────────────────────────
export const otfConfig: TamaguiInternalConfig
export type OtfConfig = typeof otfConfig

declare module 'tamagui' {
  interface TamaguiCustomConfig extends OtfConfig {}
}

// ─── Design themes ────────────────────────────────────────────────────────────
export type OtfDesignThemeId =
  | 'mono' | 'ocean-teal' | 'warm-amber' | 'rose-coral' | 'lavender' | 'glacier'
  | 'forest' | 'obsidian' | 'solar' | 'orchid' | 'indigo' | 'cosmic-night'
  | 'soft-pop' | 'neo-brutalism' | 'vintage-paper' | 'modern-minimal' | 'bubblegum'

export interface OtfColorPalette {
  primary: string
  primary_foreground: string
  [key: string]: string
}

export interface OtfDesignTheme {
  id: OtfDesignThemeId
  name: string
  light: OtfColorPalette
  dark: OtfColorPalette
}

export const OTF_DESIGN_THEMES: Record<OtfDesignThemeId, OtfDesignTheme>
export const OTF_DESIGN_THEME_IDS: OtfDesignThemeId[]
export function getOtfThemePalettes(themeId: OtfDesignThemeId): { light: any; dark: any }
export function getOtfDesignTheme(themeId: OtfDesignThemeId): OtfDesignTheme

// ─── Otf-prefixed primitives (avoid name clashes with Tamagui originals) ─────
export const OtfButton: any
export type OtfButtonProps = any
export const OtfText: any
export type OtfTextProps = any
export const OtfCard: any
export type OtfCardProps = any
export const OtfInput: any
export type OtfInputProps = any
export const OtfAvatar: any
export type OtfAvatarProps = any

// ─── Interface components ─────────────────────────────────────────────────────
export const SubHeading: any
export const SepHeading: any
export const PageContainer: any
export const PageMainContainer: any
export const DialogProvider: any
export const showError: any
export const dialogConfirm: any
export const Pressable: any
export const Image: any
export const Badge: any
export type BadgeProps = any
export const Icon: any
export const ICONS: any
export type IconName = string
export type IconProps = any
export const OtfAccordion: any
export type OtfAccordionProps = any
export type OtfAccordionItem = any
export const OtfTabs: any
export type OtfTabsProps = any
export type OtfTabItem = any
export const OtfToggleGroup: any
export type OtfToggleGroupProps = any
export type OtfToggleOption = any
export const OtfToastProvider: any
export const useOtfToast: any
export const toast: any
export type OtfToastVariant = any
export type OtfToastData = any
export type OtfToastOptions = any
export type OtfToastContextType = any
export const FormField: any
export type FormFieldProps = any
export const OtfTooltip: any
export type TooltipProps = any
export const GoogleLogo: any
export const AppleLogo: any
export const GitHubLogo: any
export const MicrosoftLogo: any

// ─── Layouts ──────────────────────────────────────────────────────────────────
export const StepPageLayout: any
export type StepPageProps = any
export const ScreenLayout: any
export const Section: any
export type SectionProps = any
export const ListItem: any
export type ListItemProps = any
export const Divider: any
export type DividerProps = any
export const KeyboardStickyFooter: any
export type KeyboardStickyFooterProps = any
export const SafeArea: any
export type SafeAreaProps = any
export const Grid: any
export const Container: any
export type GridProps = any
export type ContainerProps = any

// ─── Patterns ─────────────────────────────────────────────────────────────────
export const PaywallScreen: any
export type PaywallScreenProps = any
export type PlanOption = any
export type PaywallVariant = any
export type PaywallFeature = any
export type PaywallComparisonRow = any
export type PaywallTestimonial = any
export type PaywallCreator = any
export const OnboardingCarousel: any
export type OnboardingCarouselProps = any
export type OnboardingStep = any
export type OnboardingVariant = any
export const ChatBubble: any
export type ChatBubbleProps = any
export type ChatMessage = any
export const SettingsScreen: any
export type SettingsScreenProps = any
export type SettingsSection = any
export type SettingsItem = any
export const EmptyState: any
export type EmptyStateProps = any
export const ProfileHeader: any
export type ProfileHeaderProps = any
export const AppHeader: any
export type AppHeaderProps = any
export type AppHeaderVariant = any
export const BottomSheet: any
export type BottomSheetProps = any
export const LoginScreen: any
export type LoginScreenProps = any
export type AuthProvider = any
export type AuthProviderBrand = any
export type LoginScreenVariant = any
export const TabBar: any
export type TabBarProps = any
export type TabBarItem = any
export const ChipsTabBar: any
export type ChipsTabBarProps = any
export type ChipsTabBarItem = any
export const SearchBar: any
export type SearchBarProps = any
export const FloatingActionButton: any
export type FABProps = any
export const ActionSheet: any
export type ActionSheetProps = any
export type ActionSheetItem = any
export const Skeleton: any
export type SkeletonProps = any
export const NotificationBanner: any
export type NotificationBannerProps = any
export const ProgressSteps: any
export type ProgressStepsProps = any
export const SwipeableRow: any
export type SwipeableRowProps = any
export type SwipeAction = any
export const MediaCard: any
export type MediaCardProps = any
export const Carousel: any
export type CarouselProps = any
export const PullToRefresh: any
export type PullToRefreshProps = any
export const ProductCard: any
export type ProductCardProps = any
export const PricingTable: any
export type PricingTableProps = any
export type PricingPlan = any
export const CountdownBanner: any
export type CountdownBannerProps = any
export const TestimonialCard: any
export type TestimonialCardProps = any
export const ConfirmDialog: any
export type ConfirmDialogProps = any
export const Chip: any
export const ChipGroup: any
export type ChipProps = any
export type ChipGroupProps = any
export const OTPInput: any
export type OTPInputProps = any
export const PasswordInput: any
export type PasswordInputProps = any
export const AvatarGroup: any
export type AvatarGroupProps = any
export const SwipeCards: any
export type SwipeCardsProps = any
export type SwipeCardItem = any
export const GlassCard: any
export type GlassCardProps = any
export const DataTable: any
export const StatusBadge: any
export type DataTableProps = any
export type DataTableColumn = any
export const DatePicker: any
export type DatePickerProps = any
export const EventCard: any
export type EventCardProps = any
export const UserPreferences: any
export type UserPreferencesProps = any
export type PreferenceSection = any
export type PreferenceItem = any
export const OtfSelect: any
export type OtfSelectProps = any
export type OtfSelectItem = any
export const OtfDialog: any
export type OtfDialogProps = any
export const OtfPopover: any
export type OtfPopoverProps = any
export const ImmersiveMediaScreen: any
export type ImmersiveMediaScreenProps = any
export type ImmersiveMediaAction = any
export const FinanceDashboard: any
export type FinanceDashboardProps = any
export type FinanceMetric = any
export type FinanceQuickAction = any
export type FinanceDashboardSection = any

// ─── Mobile flow primitives ────────────────────────────────────────────────
export const MultiStep: any
export const Step: any
export const useMultiStep: any
export type MultiStepProps = any
export type StepProps = any
export type MultiStepTransition = any
export type MultiStepProgress = any
export type UseMultiStep = any

export const Selectable: any
export const SelectableGroup: any
export type SelectableProps = any
export type SelectableGroupProps = any
export type SelectableOption<T extends string | number = string> = {
  value: T
  label: string
  description?: string
  icon?: any
}

export const AnimatedView: any
export type AnimatedViewProps = any
export type AnimationPreset = any
export type AnimatedViewTrigger = any

export const Expandable: any
export type ExpandableProps = any

export const WheelPicker: any
export type WheelPickerProps = any
export type WheelPickerOption<T extends string | number = string> = {
  value: T
  label: string
}

export const RulerScrubber: any
export type RulerScrubberProps = any

export const CardScroller: <T>(props: {
  data: readonly T[]
  renderItem: (item: T, index: number) => React.ReactNode
  keyExtractor: (item: T, index: number) => string
  itemWidth?: number | `${number}%`
  gap?: number
  initialIndex?: number
  paddingHorizontal?: number
  snap?: 'center' | 'start'
  fadeOff?: boolean
  onIndexChange?: (index: number) => void
  accessibilityLabel?: string
}) => JSX.Element
export type CardScrollerProps<T = unknown> = {
  data: readonly T[]
  renderItem: (item: T, index: number) => React.ReactNode
  keyExtractor: (item: T, index: number) => string
  itemWidth?: number | `${number}%`
  gap?: number
  initialIndex?: number
  paddingHorizontal?: number
  snap?: 'center' | 'start'
  fadeOff?: boolean
  onIndexChange?: (index: number) => void
  accessibilityLabel?: string
}

// ─── Hooks ─────────────────────────────────────────────────────────────────
export const useCollapsibleHeader: any
export type UseCollapsibleHeaderOptions = any
export type UseCollapsibleHeaderReturn = any
