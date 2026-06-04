import { cloneElement, isValidElement, useEffect, useState, type ReactNode } from 'react'
import { SizableText, XStack, YStack, useTheme } from 'tamagui'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

export type TabBarItem = { id: string; label: string; icon?: ReactNode }
export type TabBarProps = {
  tabs: TabBarItem[]
  activeTab: string
  onTabPress: (id: string) => void
  showLabels?: boolean
  /** Active icon/label colour. Defaults to the theme accent ($color9). */
  accentColor?: string
}

const BAR_HEIGHT = 56
const PILL_INSET = 6
const PILL_HEIGHT = 40

/**
 * Bottom tab navigator with a sliding pill behind the active tab. The pill is a
 * subtle lifted surface ($color3 + hairline) that animates horizontally to the
 * active slot via Reanimated `withTiming` — the same driver RulerScrubber uses,
 * so it runs smoothly on web (expo web) and native. Icons are recoloured per
 * active/inactive state by cloning the passed element with a `color` prop
 * (wrapping an SVG icon in <Text> never recolours it).
 */
export function TabBar({ tabs, activeTab, onTabPress, showLabels = true, accentColor }: TabBarProps) {
  const theme = useTheme()
  const activeColor = accentColor ?? theme.color9?.get?.() ?? '#f97316'
  const inactiveColor = theme.color8?.get?.() ?? '#888888'
  const pillBg = theme.color3?.get?.() ?? '#19150e'
  const pillBorder = theme.color5?.get?.() ?? '#33260f'

  const [rowWidth, setRowWidth] = useState(0)
  const n = tabs.length
  const tabWidth = n > 0 ? rowWidth / n : 0
  const activeIndex = Math.max(0, tabs.findIndex((t) => t.id === activeTab))

  const tx = useSharedValue(0)
  useEffect(() => {
    if (tabWidth <= 0) return
    tx.value = withTiming(activeIndex * tabWidth, {
      duration: 260,
      easing: Easing.out(Easing.cubic),
    })
  }, [activeIndex, tabWidth, tx])

  const pillStyle = useAnimatedStyle(() => {
    'worklet'
    return { transform: [{ translateX: tx.value }] }
  }, [tx])

  return (
    <YStack
      height={BAR_HEIGHT}
      borderTopWidth={1}
      borderTopColor="$borderColor"
      backgroundColor="$background"
      paddingBottom="$2"
    >
      <XStack flex={1} position="relative" onLayout={(e) => setRowWidth(e.nativeEvent.layout.width)}>
        {/* Sliding pill — behind the tabs, animates to the active slot. */}
        {tabWidth > 0 && (
          <Animated.View
            pointerEvents="none"
            style={[
              {
                position: 'absolute',
                top: (BAR_HEIGHT - 8 - PILL_HEIGHT) / 2,
                left: PILL_INSET,
                width: Math.max(0, tabWidth - PILL_INSET * 2),
                height: PILL_HEIGHT,
                borderRadius: 14,
                backgroundColor: pillBg,
                borderWidth: 1,
                borderColor: pillBorder,
              },
              pillStyle,
            ]}
          />
        )}

        {tabs.map((tab) => {
          const active = tab.id === activeTab
          const color = active ? activeColor : inactiveColor
          return (
            <YStack
              key={tab.id}
              flex={1}
              alignItems="center"
              justifyContent="center"
              gap="$1"
              pressStyle={{ opacity: 0.6 }}
              onPress={() => onTabPress(tab.id)}
            >
              {isValidElement(tab.icon)
                ? cloneElement(tab.icon as React.ReactElement<{ color?: string }>, { color })
                : tab.icon}
              {showLabels && (
                <SizableText size="$1" color={color} fontWeight={active ? '600' : '400'}>
                  {tab.label}
                </SizableText>
              )}
            </YStack>
          )
        })}
      </XStack>
    </YStack>
  )
}
