import { ScrollView, XStack, Text } from 'tamagui'
import type { ReactNode } from 'react'

export interface ChipsTabBarItem {
  key: string
  label: string
  icon?: ReactNode
  active?: boolean
  onPress?: () => void
}

export interface ChipsTabBarProps {
  items: ChipsTabBarItem[]
  /** Background color for the active chip — typically the active palette accent. */
  accentColor?: string
  /** Background color for inactive chips (defaults to a Tamagui $color2 surface). */
  inactiveBackgroundColor?: string
  /** Text/icon color for active chip text/icon. Defaults to white. */
  activeForegroundColor?: string
  /** Text/icon color for inactive chips. */
  inactiveForegroundColor?: string
  /** Border color for inactive chips (default: $color5). */
  inactiveBorderColor?: string
  /** When true, only the active chip shows its label; inactive chips show icon only. */
  collapseInactiveLabel?: boolean
  /** Bottom offset (default 16). */
  bottomOffset?: number
}

/**
 * Pill / chip-style bottom tab bar — each tab is a standalone pill with
 * icon + label horizontally. The active chip fills with the accent color
 * while inactive chips show only the icon (or icon + label if
 * `collapseInactiveLabel` is false).
 *
 * Background is transparent so the page bleeds through. Render this
 * absolutely-positioned at the bottom of the screen.
 */
export function ChipsTabBar({
  items,
  accentColor = '#f97316',
  inactiveBackgroundColor = '$color2',
  activeForegroundColor = '#ffffff',
  inactiveForegroundColor = '$color12',
  inactiveBorderColor = '$color5',
  collapseInactiveLabel = true,
  bottomOffset = 16,
}: ChipsTabBarProps) {
  return (
    <XStack
      position="absolute"
      bottom={bottomOffset}
      left={0}
      right={0}
      paddingHorizontal="$4"
      pointerEvents="box-none"
      justifyContent="center"
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 8, paddingHorizontal: 4 }}
      >
        {items.map((item) => {
          const focused = !!item.active
          return (
            <XStack
              key={item.key}
              onPress={item.onPress}
              cursor="pointer"
              pressStyle={{ opacity: 0.85, scale: 0.97 }}
              alignItems="center"
              gap="$2"
              paddingHorizontal={focused ? '$3' : '$2.5'}
              paddingVertical="$2"
              borderRadius={999}
              backgroundColor={focused ? accentColor : inactiveBackgroundColor}
              borderWidth={1}
              borderColor={focused ? accentColor : inactiveBorderColor}
              minHeight={40}
            >
              {item.icon}
              {(focused || !collapseInactiveLabel) && (
                <Text
                  color={focused ? activeForegroundColor : inactiveForegroundColor}
                  fontSize={12}
                  fontWeight="700"
                  letterSpacing={0.2}
                >
                  {item.label}
                </Text>
              )}
            </XStack>
          )
        })}
      </ScrollView>
    </XStack>
  )
}
