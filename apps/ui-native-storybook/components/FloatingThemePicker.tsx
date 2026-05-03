import { useState } from 'react'
import { Moon, Palette, Sun } from '@tamagui/lucide-icons'
import {
  Circle,
  Pressable,
  SizableText,
  Switch,
  View,
  XStack,
  YStack,
} from '@otf/ui-native'
import { useShowcaseTheme, type ShowcasePaletteId } from './ThemeContext'

// Mirrors kits/fitness-kit's FloatingThemePicker exactly — bottom-right FAB
// that expands into a palette popover. Keeps the storybook header clean
// (brand + dark/light icon only); palette selection lives here.
//
// IMPORTANT: card bg + border are hardcoded hex (mirroring fitness's
// `tokens.bgElevated = '#171717'`) instead of Tamagui $tokens — the
// `$backgroundStrong` / `$borderColor` tokens don't reliably resolve to
// a visible elevated color in every palette and can render the popover
// transparent against the page bg.
export function FloatingThemePicker() {
  const { palette, palettes, setPaletteId, mode, toggleMode } = useShowcaseTheme()
  const [open, setOpen] = useState(false)
  const isDark = mode === 'dark'

  // Match fitness-kit's tokens.bgElevated / tokens.border exactly.
  const cardBg = isDark ? '#171717' : '#ffffff'
  const cardBorder = isDark ? '#2a2a2a' : '#e5e5e5'
  const cardSubtleBg = isDark ? '#0f0f0f' : '#f5f5f5'
  const labelText = isDark ? '#fafafa' : '#0a0a0a'
  const mutedText = isDark ? '#a3a3a3' : '#737373'

  return (
    <View
      position="absolute"
      bottom={24}
      right={24}
      zIndex={1000}
      alignItems="flex-end"
      gap={12}
    >
      {open ? (
        <YStack
          backgroundColor={cardBg}
          borderRadius={16}
          padding={16}
          borderWidth={1}
          borderColor={cardBorder}
          gap={16}
          minWidth={280}
          maxWidth={320}
          shadowColor="black"
          shadowOpacity={0.4}
          shadowRadius={20}
          shadowOffset={{ width: 0, height: 8 }}
        >
          <XStack alignItems="center" justifyContent="space-between">
            <SizableText
              size="$2"
              color={labelText}
              fontWeight="600"
              letterSpacing={0.4}
              textTransform="uppercase"
            >
              Theme · {palette.name}
            </SizableText>
            <XStack alignItems="center" gap={8}>
              {isDark ? <Moon size={14} color={mutedText} /> : <Sun size={14} color={mutedText} />}
              <Switch
                size="$2"
                checked={isDark}
                onCheckedChange={toggleMode}
                backgroundColor={isDark ? labelText : cardSubtleBg}
              >
                <Switch.Thumb animation="quick" backgroundColor={isDark ? cardBg : labelText} />
              </Switch>
            </XStack>
          </XStack>
          <XStack gap={12} flexWrap="wrap" justifyContent="space-between">
            {palettes.map((p) => (
              <FabChip
                key={p.id}
                name={p.name}
                preview={p.preview}
                active={palette.id === p.id}
                onPress={() => setPaletteId(p.id as ShowcasePaletteId)}
                activeColor={labelText}
                mutedColor={mutedText}
              />
            ))}
          </XStack>
        </YStack>
      ) : null}

      <Pressable
        onPress={() => setOpen((o) => !o)}
        width={48}
        height={48}
        borderRadius={9999}
        backgroundColor={palette.preview}
        alignItems="center"
        justifyContent="center"
        cursor="pointer"
        pressStyle={{ scale: 0.95 }}
        shadowColor="black"
        shadowOpacity={0.3}
        shadowRadius={12}
        shadowOffset={{ width: 0, height: 4 }}
      >
        <Palette color="#ffffff" size={22} />
      </Pressable>
    </View>
  )
}

function FabChip({
  name,
  preview,
  active,
  onPress,
  activeColor,
  mutedColor,
}: {
  name: string
  preview: string
  active: boolean
  onPress: () => void
  activeColor: string
  mutedColor: string
}) {
  return (
    <YStack alignItems="center" gap={4} onPress={onPress} cursor="pointer" pressStyle={{ scale: 0.92 }}>
      <Circle
        size={28}
        backgroundColor={preview}
        borderWidth={active ? 2 : 0}
        borderColor={activeColor}
      />
      <SizableText size="$1" color={active ? activeColor : mutedColor} fontWeight={active ? '700' : '500'}>
        {name}
      </SizableText>
    </YStack>
  )
}
