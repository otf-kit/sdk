import { YStack, Sun, Moon, Pressable } from '@otfdashkit/ui-native'
import { useShowcaseTheme } from './ThemeContext'

// Slim header control — just the dark/light icon toggle. Palette selection
// lives in <FloatingThemePicker /> at the bottom-right (mirrors fitness-kit).
export function ThemePicker() {
  const { mode, toggleMode } = useShowcaseTheme()
  return (
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
  )
}
