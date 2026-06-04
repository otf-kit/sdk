/**
 * AppHeader — top navigation bar for kit screens.
 *
 * Existing layout variants (`simple | back | profile | centered`) drive the
 * left/right slot composition. Surface variants (`solid | transparent | blurred`)
 * drive the background treatment. The two are orthogonal — pick a layout
 * variant *and* a surface variant.
 *
 * `collapsible=true` wraps the entire header in `<Animated.View>` so it can
 * be hidden/revealed by `useCollapsibleHeader()`. Pair `animatedStyle` with
 * the `headerStyle` returned from that hook.
 *
 * `blurred` uses `expo-blur`'s `BlurView` on iOS only. On Android and Web it
 * falls back to a semi-transparent surface (`solid` color at 0.85 alpha).
 *
 * @example Solid (existing default)
 * <AppHeader title="Profile" variant="profile" avatar={uri} />
 *
 * @example Collapsible blurred — pair with the hook
 * const { scrollHandler, headerStyle } = useCollapsibleHeader()
 * <AppHeader title="Today" surface="blurred" collapsible animatedStyle={headerStyle} />
 * <ScrollView onScroll={scrollHandler} scrollEventThrottle={16}>...</ScrollView>
 */

import { Platform } from 'react-native'
import Animated, { type AnimatedStyle } from 'react-native-reanimated'
import { SizableText, XStack, YStack } from 'tamagui'
import { ChevronLeft } from '@tamagui/lucide-icons'
import { Avatar as OtfAvatar } from '../primitives/Avatar'

// Conditional require — `expo-blur` is iOS-only quality, and not every kit
// installs it. Keep the import lazy so Android/Web bundles don't blow up if
// the dep is missing.
type BlurViewComponent = React.ComponentType<{
  intensity?: number
  tint?: 'light' | 'dark' | 'default'
  style?: unknown
  children?: React.ReactNode
}>
let BlurView: BlurViewComponent | null = null
if (Platform.OS === 'ios') {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    BlurView = require('expo-blur').BlurView as BlurViewComponent
  } catch {
    BlurView = null
  }
}

export type AppHeaderVariant = 'simple' | 'back' | 'profile' | 'centered'

/** Surface treatment for the header background. */
export type AppHeaderSurface = 'solid' | 'transparent' | 'blurred'

export type AppHeaderProps = {
  title: string
  subtitle?: string
  /** Layout variant — drives left/right slot composition. */
  variant?: AppHeaderVariant
  /**
   * Background treatment. Default `'solid'`.
   * - `solid`: opaque `$background` (existing behavior)
   * - `transparent`: no background, no border
   * - `blurred`: iOS BlurView, Android/Web fallback to semi-transparent solid
   */
  surface?: AppHeaderSurface
  onBack?: () => void
  avatar?: string
  left?: React.ReactNode
  right?: React.ReactNode
  /** @deprecated use `surface="transparent"` */
  transparent?: boolean
  borderless?: boolean
  /** When `true`, wraps in `<Animated.View>` driven by `animatedStyle`. */
  collapsible?: boolean
  /** Reanimated style from `useCollapsibleHeader().headerStyle`. */
  animatedStyle?: AnimatedStyle<Record<string, unknown>>
}

export function AppHeader({
  title,
  subtitle,
  variant = 'simple',
  surface,
  onBack,
  avatar,
  left,
  right,
  transparent,
  borderless,
  collapsible,
  animatedStyle,
}: AppHeaderProps) {
  // Backwards compatibility: legacy `transparent` prop still wins if set.
  const resolvedSurface: AppHeaderSurface = surface ?? (transparent ? 'transparent' : 'solid')

  const leftContent = (() => {
    if (variant === 'back')
      return (
        <XStack
          paddingRight="$2"
          onPress={onBack}
          pressStyle={{ opacity: 0.6 }}
          cursor="pointer"
          alignItems="center"
        >
          <ChevronLeft size={22} color="$color12" />
        </XStack>
      )
    if (variant === 'profile') return <OtfAvatar uri={avatar} name={title} size="sm" />
    if (variant === 'centered') return left ?? null
    return null
  })()
  const rightContent = variant === 'profile' || variant === 'centered' ? right ?? null : null

  // Resolve background per surface. iOS+blurred renders BlurView underneath
  // the YStack and uses transparent bg on the stack itself; otherwise the
  // YStack carries the bg color directly.
  const useNativeBlur = resolvedSurface === 'blurred' && Platform.OS === 'ios' && BlurView !== null
  const backgroundColor: string =
    resolvedSurface === 'transparent' || useNativeBlur
      ? 'transparent'
      : resolvedSurface === 'blurred'
        ? // Android + Web fallback: semi-transparent surface tint.
          'rgba(20,20,20,0.85)'
        : '$background'
  const borderBottomWidth = borderless || resolvedSurface !== 'solid' ? 0 : 1

  const inner = (
    <YStack
      paddingTop="$6"
      backgroundColor={backgroundColor}
      borderBottomWidth={borderBottomWidth}
      borderBottomColor="$borderColor"
    >
      <XStack height={56} alignItems="center" paddingHorizontal="$4" gap="$3">
        {leftContent}
        <YStack flex={1} alignItems={variant === 'centered' ? 'center' : 'flex-start'}>
          <SizableText size="$6" fontWeight="700" numberOfLines={1}>
            {title}
          </SizableText>
          {subtitle && (
            <SizableText size="$2" color="$color11" numberOfLines={1}>
              {subtitle}
            </SizableText>
          )}
        </YStack>
        {rightContent}
      </XStack>
    </YStack>
  )

  // Compose blurred surface on iOS by laying the inner over a BlurView.
  const surfaced =
    useNativeBlur && BlurView !== null ? (
      <BlurView
        intensity={40}
        tint="default"
        style={{ position: 'relative' }}
      >
        {inner}
      </BlurView>
    ) : (
      inner
    )

  if (collapsible) {
    return <Animated.View style={animatedStyle}>{surfaced}</Animated.View>
  }
  return surfaced
}
