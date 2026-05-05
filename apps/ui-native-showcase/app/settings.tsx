import {
  ScrollView,
  YStack,
  XStack,
  H1,
  H3,
  Paragraph,
  SizableText,
  Switch,
  Circle,
  Pressable,
  Separator,
  Sun,
  Moon,
  Palette,
  useMedia,
} from '@otfdashkit/ui-native'
import { useShowcaseTheme, SHOWCASE_PALETTES } from '../components/ThemeContext'
import type { ShowcasePalette } from '../components/ThemeContext'

export default function SettingsScreen() {
  const { palette, mode, setPaletteId, toggleMode } = useShowcaseTheme()
  const isDark = mode === 'dark'
  const media = useMedia()
  const horizontalPadding = media.gtSm ? '$6' : '$4'
  const maxWidth = 720

  return (
    <ScrollView
      flex={1}
      backgroundColor="$background"
      contentContainerStyle={{ paddingBottom: 96 }}
    >
      <YStack
        paddingHorizontal={horizontalPadding}
        paddingTop="$6"
        paddingBottom="$5"
        maxWidth={maxWidth}
        width="100%"
        alignSelf="center"
        gap="$6"
      >
        {/* Header */}
        <YStack gap="$1.5">
          <SizableText size="$2" color="$color10" textTransform="uppercase" letterSpacing={1}>
            Showcase preferences
          </SizableText>
          <H1 size="$10" fontWeight="800" letterSpacing={-0.8}>
            Settings
          </H1>
          <Paragraph size="$4" color="$color11">
            Tune how every component on the previous tab is rendered. Choices
            persist across reloads.
          </Paragraph>
        </YStack>

        <Separator />

        {/* Theme mode */}
        <YStack gap="$3">
          <XStack alignItems="center" gap="$2">
            {isDark ? <Moon size={18} color="$color11" /> : <Sun size={18} color="$color11" />}
            <H3 size="$6" fontWeight="700">Appearance</H3>
          </XStack>
          <XStack
            paddingHorizontal="$4"
            paddingVertical="$3"
            borderRadius="$4"
            borderWidth={1}
            borderColor="$borderColor"
            backgroundColor="$color2"
            alignItems="center"
            justifyContent="space-between"
            gap="$3"
          >
            <YStack gap="$0.5" flex={1}>
              <SizableText size="$4" fontWeight="600" color="$color12">
                {isDark ? 'Dark mode' : 'Light mode'}
              </SizableText>
              <SizableText size="$2" color="$color10">
                Toggle the global theme for previews.
              </SizableText>
            </YStack>
            <Switch size="$3" checked={isDark} onCheckedChange={toggleMode}>
              <Switch.Thumb animation="quick" />
            </Switch>
          </XStack>
        </YStack>

        {/* Palette */}
        <YStack gap="$3">
          <XStack alignItems="center" gap="$2">
            <Palette size={18} color="$color11" />
            <H3 size="$6" fontWeight="700">Accent palette</H3>
          </XStack>
          <Paragraph size="$3" color="$color11" maxWidth={520}>
            Swaps the active Tamagui accent ramp ($color1..12). Every active /
            primary tone in the showcase reads from the picked palette.
          </Paragraph>
          <YStack
            flexDirection="row"
            flexWrap="wrap"
            gap="$3"
            paddingTop="$2"
          >
            {SHOWCASE_PALETTES.map((p) => (
              <PaletteSwatch
                key={p.id}
                palette={p}
                active={p.id === palette.id}
                onPress={() => setPaletteId(p.id)}
              />
            ))}
          </YStack>
        </YStack>
      </YStack>
    </ScrollView>
  )
}

function PaletteSwatch({
  palette,
  active,
  onPress,
}: {
  palette: ShowcasePalette
  active: boolean
  onPress: () => void
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Use ${palette.name} palette`}
    >
      <YStack alignItems="center" gap="$1.5" width={72}>
        <Circle
          size={48}
          backgroundColor={palette.preview}
          borderWidth={active ? 3 : 1}
          borderColor={active ? '$color12' : '$borderColor'}
          // Subtle elevation for the active swatch on web.
          {...(active
            ? { shadowColor: palette.preview, shadowOpacity: 0.4, shadowRadius: 8 }
            : {})}
        />
        <SizableText
          size="$2"
          color={active ? '$color12' : '$color10'}
          fontWeight={active ? '700' : '500'}
        >
          {palette.name}
        </SizableText>
      </YStack>
    </Pressable>
  )
}
