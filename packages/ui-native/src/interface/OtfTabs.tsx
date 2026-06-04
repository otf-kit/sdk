import { useEffect, useRef, useState } from 'react'
import { ScrollView } from 'react-native'
import type { LayoutChangeEvent } from 'react-native'
import { SizableText, XStack, YStack, useTheme } from 'tamagui'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

export type OtfTabItem = { key: string; label: string }
export type OtfTabsProps = {
  tabs: OtfTabItem[]
  activeTab?: string
  onTabChange?: (key: string) => void
  variant?: 'underline' | 'pill'
}

type Rect = { x: number; w: number }
const EASE = Easing.out(Easing.cubic)

/**
 * Horizontal tabs with an animated indicator that SLIDES to the active tab.
 * Tabs are variable-width (label length varies), so each tab reports its
 * measured {x, width} via onLayout and the indicator tweens to that rect via
 * Reanimated `withTiming` — underline = a 2px accent bar at the bottom edge;
 * pill = a full accent fill behind the label. (Previously the indicator jumped
 * instantly with no motion.)
 */
export function OtfTabs({ tabs, activeTab, onTabChange, variant = 'underline' }: OtfTabsProps) {
  const [internalActive, setInternalActive] = useState(tabs[0]?.key ?? '')
  const current = activeTab ?? internalActive
  const theme = useTheme()
  const accent = theme.color9?.get?.() ?? '#f97316'

  const [rects, setRects] = useState<Record<string, Rect>>({})
  const active = rects[current]

  const ix = useSharedValue(0)
  const iw = useSharedValue(0)
  const ready = useRef(false)

  useEffect(() => {
    if (!active) return
    if (!ready.current) {
      // First measurement — snap into place rather than sliding in from 0.
      ix.value = active.x
      iw.value = active.w
      ready.current = true
      return
    }
    ix.value = withTiming(active.x, { duration: 240, easing: EASE })
    iw.value = withTiming(active.w, { duration: 240, easing: EASE })
  }, [active, ix, iw])

  const indicatorStyle = useAnimatedStyle(() => {
    'worklet'
    return { transform: [{ translateX: ix.value }], width: iw.value }
  }, [ix, iw])

  const onTabLayout = (key: string) => (e: LayoutChangeEvent) => {
    const { x, width } = e.nativeEvent.layout
    setRects((prev) =>
      prev[key]?.x === x && prev[key]?.w === width ? prev : { ...prev, [key]: { x, w: width } },
    )
  }

  const handlePress = (key: string) => {
    if (!activeTab) setInternalActive(key)
    onTabChange?.(key)
  }

  const isPill = variant === 'pill'

  return (
    <YStack>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <XStack position="relative" gap="$2" paddingHorizontal="$2" paddingBottom="$2">
          {/* Sliding indicator. */}
          {active && (
            <Animated.View
              pointerEvents="none"
              style={[
                isPill
                  ? {
                      position: 'absolute',
                      top: 0,
                      bottom: 8, // clears the paddingBottom="$2"
                      borderRadius: 12,
                      backgroundColor: accent,
                      zIndex: 0,
                    }
                  : {
                      position: 'absolute',
                      bottom: 8,
                      height: 2,
                      borderRadius: 2,
                      backgroundColor: accent,
                      zIndex: 0,
                    },
                indicatorStyle,
              ]}
            />
          )}

          {tabs.map((tab) => {
            const isActive = tab.key === current
            return (
              <YStack
                key={tab.key}
                onLayout={onTabLayout(tab.key)}
                paddingVertical="$2"
                paddingHorizontal="$3"
                zIndex={1}
                pressStyle={{ opacity: 0.7 }}
                onPress={() => handlePress(tab.key)}
                cursor="pointer"
              >
                <SizableText
                  size="$3"
                  fontWeight={isActive ? '600' : '500'}
                  color={isPill && isActive ? '$color1' : isActive ? '$color12' : '$color11'}
                >
                  {tab.label}
                </SizableText>
              </YStack>
            )
          })}
        </XStack>
      </ScrollView>
    </YStack>
  )
}
