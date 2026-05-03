import { useState } from 'react'
import { Platform } from 'react-native'
import {
  XStack,
  YStack,
  SizableText,
  Select,
  ChevronDown,
  Sun,
  Moon,
  Pressable,
  type SizeTokens,
} from '@otf/ui-native'
import { useShowcaseTheme, type ShowcasePaletteId } from './ThemeContext'

interface ThemePickerProps {
  size?: SizeTokens
}

// Compact palette + light/dark switcher rendered in the showcase header.
// The palette dropdown uses Tamagui's Select primitive; we don't wrap it
// in Adapt/Sheet because the showcase is web-first.
export function ThemePicker({ size = '$3' }: ThemePickerProps) {
  const { paletteId, mode, palettes, setPaletteId, toggleMode, palette } = useShowcaseTheme()
  const [open, setOpen] = useState(false)

  return (
    <XStack gap="$2" alignItems="center">
      <Select
        id="theme-picker"
        value={paletteId}
        onValueChange={(v) => setPaletteId(v as ShowcasePaletteId)}
        open={open}
        onOpenChange={setOpen}
      >
        <Select.Trigger size={size} width={Platform.OS === 'web' ? 200 : undefined} iconAfter={ChevronDown}>
          <Select.Value placeholder="Theme">{palette.name}</Select.Value>
        </Select.Trigger>

        <Select.Content zIndex={200000}>
          <Select.Viewport minWidth={220}>
            <Select.Group>
              <Select.Label>Palette</Select.Label>
              {palettes.map((p, i) => (
                <Select.Item key={p.id} index={i} value={p.id}>
                  <XStack alignItems="center" gap="$2">
                    <YStack
                      width={12}
                      height={12}
                      borderRadius={6}
                      backgroundColor={p.preview}
                    />
                    <Select.ItemText>{p.name}</Select.ItemText>
                  </XStack>
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select>

      <Pressable
        onPress={toggleMode}
        accessibilityRole="button"
        accessibilityLabel={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        <YStack
          width={36}
          height={36}
          alignItems="center"
          justifyContent="center"
          borderRadius="$3"
          borderWidth={1}
          borderColor="$borderColor"
          backgroundColor="$background"
          hoverStyle={{ backgroundColor: '$backgroundHover' }}
          pressStyle={{ scale: 0.96 }}
        >
          {mode === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </YStack>
      </Pressable>

      <SizableText size="$1" color="$color10" display={Platform.OS === 'web' ? 'flex' : 'none'}>
        {mode}
      </SizableText>
    </XStack>
  )
}
