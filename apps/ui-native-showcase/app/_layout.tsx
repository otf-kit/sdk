import { useEffect, useMemo } from 'react'
import { Platform, View } from 'react-native'
import { Tabs, usePathname } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import * as SplashScreen from 'expo-splash-screen'
import { SafeAreaInsetsContext, SafeAreaProvider } from 'react-native-safe-area-context'
import {
  useFonts,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
} from '@expo-google-fonts/plus-jakarta-sans'
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter'
import { JetBrainsMono_400Regular } from '@expo-google-fonts/jetbrains-mono'
import {
  OTFProvider,
  OtfToastProvider,
  DialogProvider,
  Theme,
  createFont,
  createOTFConfig,
  otfBaseConfig,
  useTheme,
  Layers,
  Settings,
} from '@otfdashkit/ui-native'
import { ShowcaseThemeProvider, useShowcaseTheme } from '../components/ThemeContext'
import { FloatingThemePicker } from '../components/FloatingThemePicker'
import { accentFor, font, otfShowcaseThemes, themeNameFor } from '../lib/theme'

// Mirrors fitness-kit's WebSafeAreaShim. ONLY when iframed by the preview
// shell, override the safe-area top inset so the shell clears the iPhone
// dynamic island. Standalone web (browsing the showcase directly) gets
// no inset — edge-to-edge. Native passes through to real device insets.
const isWebIframed =
  typeof window !== 'undefined' && window.self !== window.top
const WEB_SAFE_AREA_INSETS = {
  top: isWebIframed ? 56 : 0,
  right: 0,
  bottom: 0,
  left: 0,
}

function WebSafeAreaShim({ children }: { children: React.ReactNode }) {
  if (Platform.OS !== 'web') return <>{children}</>
  return (
    <SafeAreaInsetsContext.Provider value={WEB_SAFE_AREA_INSETS}>
      {children}
    </SafeAreaInsetsContext.Provider>
  )
}

// Emit `{ type: 'otf-route', path }` to the parent window every time the
// in-iframe route changes. The phone-frame shell at
// apps/ui-native-storybook-preview/index.html listens for this and updates
// its QR card per component (different deep-link, different copy).
//
// No-op outside an iframe and on native.
function ParentRouteSync() {
  const pathname = usePathname()
  useEffect(() => {
    if (Platform.OS !== 'web') return
    if (typeof window === 'undefined') return
    if (window.parent === window) return
    try {
      window.parent.postMessage(
        { source: 'otf-ui-native-showcase', type: 'otf-route', path: pathname },
        '*',
      )
    } catch {
      // Cross-origin postMessage failure is fine — outer shell uses '*'
      // listener and rejects payloads it doesn't recognise.
    }
  }, [pathname])
  return null
}

SplashScreen.preventAutoHideAsync().catch(() => {})

// Type scale shared by both families. Plus Jakarta Sans is the display/heading
// family; Inter is the body family; JetBrains Mono is exposed as `font.mono`
// for inline tabular/label use (no mono createFont — it isn't a heading/body
// role). Native resolves the @expo-google-fonts named weights; web resolves the
// CSS families loaded by InjectWebStyles.
// String aliases (sm/md/lg) so components using semantic sizes — e.g. Button
// size="md" — resolve against the font scale instead of warning "No font size
// found md" on every render.
const SIZE = {
  1: 11, 2: 12, 3: 13, 4: 14, 5: 15, 6: 16, 7: 18, 8: 20,
  9: 22, 10: 28, 11: 36, 12: 48, 13: 56, 14: 64, 15: 72, 16: 80,
  sm: 14, md: 15, lg: 16,
  true: 15,
}
const LINE_HEIGHT = {
  1: 16, 2: 18, 3: 20, 4: 22, 5: 23, 6: 24, 7: 26, 8: 28,
  9: 30, 10: 36, 11: 44, 12: 56, 13: 64, 14: 72, 15: 80, 16: 88,
  sm: 20, md: 22, lg: 24,
  true: 23,
}
const WEIGHT = {
  1: '400', 2: '400', 3: '400', 4: '500', 5: '600', 6: '600',
  7: '700', 8: '700', 9: '700', 10: '800', 11: '800', 12: '800',
  13: '800', 14: '800', 15: '800', 16: '800',
  sm: '600', md: '600', lg: '700',
  true: '400',
}
const LETTER_SPACING = {
  1: 0, 2: -0.1, 3: -0.2, 4: -0.3, 5: -0.4, 6: -0.4, 7: -0.5,
  8: -0.5, 9: -0.6, 10: -0.7, 11: -0.8, 12: -0.9, 13: -1, 14: -1.2,
  15: -1.4, 16: -1.6,
  sm: -0.2, md: -0.3, lg: -0.4,
  true: 0,
}

const bodyFont = createFont({
  family: font.body,
  size: SIZE,
  lineHeight: LINE_HEIGHT,
  weight: WEIGHT,
  letterSpacing: LETTER_SPACING,
})

const headingFont = createFont({
  family: font.display,
  size: SIZE,
  lineHeight: LINE_HEIGHT,
  weight: WEIGHT,
  letterSpacing: LETTER_SPACING,
})

// JetBrains Mono for every `$mono` surface — the showcase is full of API /
// code blocks, so registering the config mono font (not just an inline token)
// upgrades all of them at once. Web loads the family via InjectWebStyles;
// native via the @expo-google-fonts JetBrainsMono weight in useFonts.
const monoFont = createFont({
  family: font.mono,
  size: SIZE,
  lineHeight: LINE_HEIGHT,
  weight: { ...WEIGHT, 4: '400', 5: '500', 6: '500' },
})

const otfAppConfig = createOTFConfig({
  ...otfBaseConfig,
  themes: otfShowcaseThemes,
  fonts: {
    ...otfBaseConfig.fonts,
    body: bodyFont,
    heading: headingFont,
    mono: monoFont,
  },
})

function InjectWebStyles() {
  useEffect(() => {
    if (Platform.OS !== 'web' || typeof document === 'undefined') return
    const fontLink = document.createElement('link')
    fontLink.id = 'otf-showcase-web-font'
    fontLink.rel = 'stylesheet'
    fontLink.href =
      'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&family=JetBrains+Mono:wght@400;500&display=swap'
    document.head.appendChild(fontLink)

    const style = document.createElement('style')
    style.id = 'otf-showcase-web-styles'
    style.textContent = `
      html, body, #root {
        font-family: 'Inter', -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
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
      document.head.removeChild(fontLink)
    }
  }, [])
  return null
}

// Patch html/body backgroundColor on web whenever the theme toggles so no
// part of the viewport leaks a stale default color through. Reads the
// resolved Tamagui $background token, not a hardcoded hex.
function ThemedBodyBg() {
  const theme = useTheme()
  const bgVal = theme.background?.get?.() ?? theme.background?.val
  useEffect(() => {
    if (Platform.OS !== 'web' || typeof document === 'undefined') return
    if (typeof bgVal !== 'string') return
    document.documentElement.style.backgroundColor = bgVal
    document.body.style.backgroundColor = bgVal
    const root = document.getElementById('root')
    if (root) root.style.backgroundColor = bgVal
  }, [bgVal])
  return null
}

// Apply the active OTF palette + dark-mode via a single registered theme name
// (`themeNameFor` → `dark` | `light` | `dark_warm` | `light_cosmic` | …), then
// render the Tabs navigator. Tab-bar tinting uses `accentFor` so the active tab
// indicator matches the picked palette and stays legible in both modes.
//
// When iframed by the phone-preview shell (apps/ui-native-storybook-preview)
// — how the landing app at otf-kit.dev/components embeds these routes inside
// the iPhone frame — we hide the bottom Tab bar entirely. The phone frame
// already provides its own chrome; a competing Tab bar just steals space.
function ThemedTabsShell() {
  const { palette, mode } = useShowcaseTheme()
  const isDark = mode === 'dark'
  const accent = accentFor(palette, mode)
  const inactiveColor = isDark ? '#525252' : '#a3a3a3'

  // Use `focused` directly rather than relying on React Navigation's `color`
  // prop — on Android the color prop sometimes doesn't reflect the initial
  // active tab correctly on first render, causing all tabs to look inactive
  // until the user taps one. Deriving color + strokeWidth from `focused`
  // in the icon callback is the reliable cross-platform approach (same as
  // fitness-kit's tabIcon helper).
  function tabIcon(Icon: typeof Layers) {
    return ({ focused }: { focused: boolean }) => (
      <View style={{ alignItems: 'center', gap: 3 }}>
        <Icon
          size={22}
          color={focused ? accent : inactiveColor}
          strokeWidth={focused ? 2.5 : 1.8}
        />
        {/* Accent dot — unambiguous active indicator on all platforms */}
        <View style={{
          width: 4, height: 4, borderRadius: 2,
          backgroundColor: focused ? accent : 'transparent',
        }} />
      </View>
    )
  }

  return (
    <Theme name={themeNameFor(palette.id, mode)}>
      <OtfToastProvider>
      <DialogProvider>
      <ThemedBodyBg />
      <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: isWebIframed
            ? { display: 'none' }
            : {
                backgroundColor: isDark ? '#0a0a0a' : '#f5f5f5',
                borderTopColor: isDark ? '#1f1f1f' : '#e5e5e5',
                borderTopWidth: 0.5,
                height: 60,
                paddingBottom: 4,
                paddingTop: 6,
              },
          tabBarActiveTintColor: accent,
          tabBarInactiveTintColor: inactiveColor,
          tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
          // Disable Android's default ripple/indicator — we draw our own dot
          tabBarActiveBackgroundColor: 'transparent',
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Components',
            tabBarIcon: tabIcon(Layers),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: tabIcon(Settings),
          }}
        />
        {/* Hide all detail routes from the tab bar (still navigable via Link). */}
        <Tabs.Screen name="primitives" options={{ href: null }} />
        <Tabs.Screen name="interface" options={{ href: null }} />
        <Tabs.Screen name="layouts" options={{ href: null }} />
        <Tabs.Screen name="patterns" options={{ href: null }} />
      </Tabs>
      <FloatingThemePicker />
      </View>
      </DialogProvider>
      </OtfToastProvider>
    </Theme>
  )
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    PlusJakartaSans_800ExtraBold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    JetBrainsMono_400Regular,
  })

  // Web loads fonts via the injected <link>, not useFonts — never block on it.
  const ready = loaded || !!error || Platform.OS === 'web'

  useEffect(() => {
    if (ready) SplashScreen.hideAsync().catch(() => {})
  }, [ready])

  // Memoised just for parity — config is module-level constant but keeps
  // provider props stable.
  const config = useMemo(() => otfAppConfig, [])

  if (!ready) return null

  return (
    // SafeAreaProvider must wrap everything on native so useSafeAreaInsets()
    // returns real device values (dynamic island, home indicator, etc.).
    // WebSafeAreaShim overrides the context on web with a static mock, so
    // ordering is: SafeAreaProvider (native real values) → WebSafeAreaShim
    // (web override) → consumers.
    <SafeAreaProvider>
      <OTFProvider config={config} defaultTheme="dark">
        <InjectWebStyles />
        <ShowcaseThemeProvider>
          <WebSafeAreaShim>
            <ParentRouteSync />
            <ThemedTabsShell />
            <StatusBar style="auto" />
          </WebSafeAreaShim>
        </ShowcaseThemeProvider>
      </OTFProvider>
    </SafeAreaProvider>
  )
}
