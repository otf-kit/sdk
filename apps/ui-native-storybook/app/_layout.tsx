import { useEffect, useMemo } from 'react'
import { Platform, View } from 'react-native'
import { Slot } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import * as SplashScreen from 'expo-splash-screen'
import {
  OtfProvider,
  Theme,
  XStack,
  YStack,
  SizableText,
  createFont,
  createTamagui,
  tamaguiDefaultConfig,
  useMedia,
} from '@otf/ui-native'
import { ShowcaseThemeProvider, useShowcaseTheme } from '../components/ThemeContext'
import { ThemePicker } from '../components/ThemePicker'
import { CategorySidebar } from '../components/CategorySidebar'

SplashScreen.preventAutoHideAsync().catch(() => {})

// Mirror fitness-kit: Tamagui's default system-font stack with a sane
// weight ramp via createFont so headings don't render as 300-weight thins.
const FONT_FAMILY = '-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'

const interFont = createFont({
  family: FONT_FAMILY,
  size: {
    1: 11, 2: 12, 3: 13, 4: 14, 5: 15, 6: 16, 7: 18, 8: 20,
    9: 22, 10: 28, 11: 36, 12: 48, 13: 56, 14: 64, 15: 72, 16: 80,
    true: 15,
  },
  lineHeight: {
    1: 16, 2: 18, 3: 20, 4: 22, 5: 23, 6: 24, 7: 26, 8: 28,
    9: 30, 10: 36, 11: 44, 12: 56, 13: 64, 14: 72, 15: 80, 16: 88,
    true: 23,
  },
  weight: {
    1: '400', 2: '400', 3: '400', 4: '500', 5: '600', 6: '600',
    7: '700', 8: '700', 9: '700', 10: '800', 11: '800', 12: '800',
    13: '800', 14: '800', 15: '900', 16: '900',
    true: '400',
  },
  letterSpacing: {
    1: 0, 2: -0.1, 3: -0.2, 4: -0.3, 5: -0.4, 6: -0.4, 7: -0.5,
    8: -0.5, 9: -0.6, 10: -0.7, 11: -0.8, 12: -0.9, 13: -1, 14: -1.2,
    15: -1.4, 16: -1.6,
    true: 0,
  },
})

const tamaguiConfig = createTamagui({
  ...tamaguiDefaultConfig,
  fonts: {
    ...tamaguiDefaultConfig.fonts,
    body: interFont,
    heading: interFont,
  },
})

function InjectWebStyles() {
  useEffect(() => {
    if (Platform.OS !== 'web' || typeof document === 'undefined') return
    const style = document.createElement('style')
    style.id = 'otf-showcase-web-styles'
    style.textContent = `
      html, body, #root {
        font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        margin: 0;
        padding: 0;
      }
      *::-webkit-scrollbar { width: 6px; height: 6px; }
      *::-webkit-scrollbar-track { background: transparent; }
      *::-webkit-scrollbar-thumb { background: rgba(127,127,127,0.25); border-radius: 6px; }
      *::-webkit-scrollbar-thumb:hover { background: rgba(127,127,127,0.4); }
      * { scrollbar-width: thin; scrollbar-color: rgba(127,127,127,0.25) transparent; }
    `
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])
  return null
}

// Patch html/body backgroundColor on web whenever the theme toggles so no
// part of the viewport leaks a stale default color through.
function ThemedBodyBg() {
  const { mode } = useShowcaseTheme()
  useEffect(() => {
    if (Platform.OS !== 'web' || typeof document === 'undefined') return
    const bg = mode === 'dark' ? '#0a0a0a' : '#fafafa'
    document.documentElement.style.backgroundColor = bg
    document.body.style.backgroundColor = bg
    const root = document.getElementById('root')
    if (root) root.style.backgroundColor = bg
  }, [mode])
  return null
}

function ShellHeader() {
  return (
    <XStack
      paddingHorizontal="$4"
      paddingVertical="$3"
      alignItems="center"
      justifyContent="space-between"
      borderBottomWidth={1}
      borderBottomColor="$borderColor"
      backgroundColor="$background"
      gap="$3"
    >
      <YStack gap="$0.5">
        <SizableText size="$5" fontWeight="700" color="$color12">
          @otf/ui-native showcase
        </SizableText>
        <SizableText size="$1" color="$color10">
          Every primitive, every prop, every theme.
        </SizableText>
      </YStack>
      <ThemePicker />
    </XStack>
  )
}

// Two-pane layout on >= sm: sidebar + scrollable content.
// Single-pane below that: header + sidebar collapses to nothing
// (the landing page acts as the index when sidebar is hidden).
function ThemedShell({ children }: { children: React.ReactNode }) {
  const { palette, mode } = useShowcaseTheme()
  const media = useMedia()
  const showSidebar = media.gtSm
  const fallbackBg = mode === 'dark' ? '#0a0a0a' : '#fafafa'
  return (
    <Theme name={mode}>
      <Theme name={palette.id}>
        <ThemedBodyBg />
        <View style={{ flex: 1, backgroundColor: fallbackBg }}>
          <YStack flex={1}>
            <ShellHeader />
            <XStack flex={1}>
              {showSidebar ? <CategorySidebar /> : null}
              <YStack flex={1}>{children}</YStack>
            </XStack>
          </YStack>
        </View>
      </Theme>
    </Theme>
  )
}

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync().catch(() => {})
  }, [])

  // Memoized just for parity — config is module-level constant but keeps
  // the provider props stable.
  const config = useMemo(() => tamaguiConfig, [])

  return (
    <OtfProvider config={config} defaultTheme="dark">
      <InjectWebStyles />
      <ShowcaseThemeProvider>
        <ThemedShell>
          <Slot />
          <StatusBar style="auto" />
        </ThemedShell>
      </ShowcaseThemeProvider>
    </OtfProvider>
  )
}
