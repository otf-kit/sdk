import { useState } from 'react'
import { Platform } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {
  YStack,
  XStack,
  Circle,
  SizableText,
  Pressable,
  Palette,
  Sun,
  Moon,
  Check,
} from '@otfdashkit/ui-native'
import { useShowcaseTheme } from './ThemeContext'
import { fgOn } from '../lib/theme'

const isWebIframed =
  typeof window !== 'undefined' && window.self !== window.top

// Bottom-right FAB → expands into a live theme picker (mode toggle + the four
// OTF palette swatches). Mounted globally so a buyer can re-skin EVERY demo
// in place — no trip back to the Settings tab. Every control is a Pressable
// (not an RN Switch) so it's tappable in the web preview where there's no
// touch. Reads/writes the same ShowcaseThemeContext as the Settings screen.
export function FloatingThemePicker() {
  const { palette, mode, toggleMode, palettes, paletteId, setPaletteId } = useShowcaseTheme()
  const [open, setOpen] = useState(false)
  const insets = useSafeAreaInsets()
  const isDark = mode === 'dark'
  // Clear the bottom tab bar when it's visible; hug the edge when iframed.
  const bottom = insets.bottom + (isWebIframed || Platform.OS === 'web' ? 24 : 84)

  return (
    <YStack
      position="absolute"
      right="$4"
      bottom={bottom}
      zIndex={1000}
      alignItems="flex-end"
      gap="$3"
    >
      {open ? (
        <YStack
          backgroundColor="$color2"
          borderRadius="$6"
          padding="$4"
          borderWidth={1}
          borderColor="$borderColor"
          gap="$3"
          width={280}
          elevation={8}
          shadowColor="$shadowColor"
          shadowRadius={24}
          shadowOffset={{ width: 0, height: 12 }}
          animation="quick"
        >
          <XStack alignItems="center" justifyContent="space-between">
            <SizableText size="$1" fontFamily="$mono" color="$color10" textTransform="uppercase" letterSpacing={1}>
              Theme · {palette.name}
            </SizableText>
            <Pressable
              onPress={toggleMode}
              accessibilityRole="button"
              accessibilityLabel={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <XStack
                alignItems="center"
                gap="$2"
                paddingHorizontal="$2.5"
                paddingVertical="$1.5"
                borderRadius="$10"
                borderWidth={1}
                borderColor="$borderColor"
                backgroundColor="$color3"
                hoverStyle={{ backgroundColor: '$color4' }}
                pressStyle={{ scale: 0.96 }}
              >
                {isDark ? <Moon size={14} color="$color11" /> : <Sun size={14} color="$color11" />}
                <SizableText size="$2" fontWeight="600" color="$color11">
                  {isDark ? 'Dark' : 'Light'}
                </SizableText>
              </XStack>
            </Pressable>
          </XStack>

          <XStack flexWrap="wrap" gap="$2.5">
            {palettes.map((p) => {
              const active = p.id === paletteId
              return (
                <Pressable
                  key={p.id}
                  onPress={() => setPaletteId(p.id)}
                  accessibilityRole="button"
                  accessibilityLabel={`${p.name} palette`}
                >
                  <YStack alignItems="center" gap="$1" width={56}>
                    <Circle
                      size={42}
                      backgroundColor={p.preview}
                      borderWidth={active ? 3 : 1}
                      borderColor={active ? '$color12' : '$borderColor'}
                      alignItems="center"
                      justifyContent="center"
                      pressStyle={{ scale: 0.92 }}
                      animation="quick"
                    >
                      {active ? <Check size={18} color={fgOn(p.preview)} strokeWidth={3} /> : null}
                    </Circle>
                    <SizableText size="$1" color={active ? '$color12' : '$color10'} fontWeight={active ? '700' : '500'}>
                      {p.name}
                    </SizableText>
                  </YStack>
                </Pressable>
              )
            })}
          </XStack>
        </YStack>
      ) : null}

      <Pressable
        onPress={() => setOpen((o) => !o)}
        accessibilityRole="button"
        accessibilityLabel="Toggle theme picker"
      >
        <Circle
          size={52}
          backgroundColor={palette.preview}
          alignItems="center"
          justifyContent="center"
          elevation={8}
          shadowColor={palette.preview}
          shadowOpacity={0.5}
          shadowRadius={16}
          shadowOffset={{ width: 0, height: 6 }}
          pressStyle={{ scale: 0.92 }}
          hoverStyle={{ scale: 1.04 }}
          animation="quick"
        >
          <Palette size={22} color={fgOn(palette.preview)} strokeWidth={2} />
        </Circle>
      </Pressable>
    </YStack>
  )
}

export default FloatingThemePicker
