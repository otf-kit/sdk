import { useEffect, useMemo } from 'react'
import { Platform } from 'react-native'
import { Tabs, usePathname } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import * as SplashScreen from 'expo-splash-screen'
import { SafeAreaInsetsContext } from 'react-native-safe-area-context'
import {
  OtfProvider,
  Theme,
  createFont,
  createTamagui,
  tamaguiDefaultConfig,
  useTheme,
  Layers,
  Settings,
} from '@otfdashkit/ui-native'
import { ShowcaseThemeProvider, useShowcaseTheme } from '../components/ThemeContext'

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

// Mirror fitness-kit: Roboto first so the web preview matches the Android
// mobile experience the design is calibrated against (otherwise a Mac browser
// would render San Francisco). Native still uses the OS UI font.
const FONT_FAMILY = 'Roboto, -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif'

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
    const fontLink = document.createElement('link')
    fontLink.id = 'otf-showcase-web-font'
    fontLink.rel = 'stylesheet'
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700;800;900&display=swap'
    document.head.appendChild(fontLink)

    const style = document.createElement('style')
    style.id = 'otf-showcase-web-styles'
    style.textContent = `
      html, body, #root {
        font-family: 'Roboto', -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
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

// Apply the active palette + dark-mode inside Tamagui's Theme stack, then
// render the Tabs navigator. Tab bar tinting reads palette.preview (the
// human-friendly hex used in the palette swatches) so the active tab
// indicator matches the picked accent.
//
// When iframed by the phone-preview shell (apps/ui-native-storybook-preview)
// — which is how the landing app at otf.sh/components embeds these routes
// inside the iPhone frame — we hide the bottom Tab bar entirely. The phone
// frame already provides its own visual chrome; a competing Tab bar inside
// the iframe just looks like clutter and steals vertical space.
function ThemedTabsShell() {
  const { palette, mode } = useShowcaseTheme()
  const isDark = mode === 'dark'

  return (
    <Theme name={mode}>
      <Theme name={palette.id}>
        <ThemedBodyBg />
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarStyle: isWebIframed
              ? { display: 'none' }
              : {
                  backgroundColor: isDark ? '#0a0a0a' : '#f5f5f5',
                  borderTopColor: isDark ? '#1f1f1f' : '#e5e5e5',
                  borderTopWidth: 0.5,
                  height: 56,
                  paddingBottom: 6,
                  paddingTop: 6,
                },
            tabBarActiveTintColor: palette.preview,
            tabBarInactiveTintColor: isDark ? '#525252' : '#a3a3a3',
            tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: 'Components',
              tabBarIcon: ({ color, size }) => <Layers color={color as never} size={size} />,
            }}
          />
          <Tabs.Screen
            name="settings"
            options={{
              title: 'Settings',
              tabBarIcon: ({ color, size }) => <Settings color={color as never} size={size} />,
            }}
          />
          {/* Hide all detail routes from the tab bar (still navigable via Link). */}
          <Tabs.Screen name="primitives" options={{ href: null }} />
          <Tabs.Screen name="interface" options={{ href: null }} />
          <Tabs.Screen name="layouts" options={{ href: null }} />
          <Tabs.Screen name="patterns" options={{ href: null }} />
        </Tabs>
      </Theme>
    </Theme>
  )
}

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync().catch(() => {})
  }, [])

  // Memoised just for parity — config is module-level constant but keeps
  // provider props stable.
  const config = useMemo(() => tamaguiConfig, [])

  return (
    <OtfProvider config={config} defaultTheme="dark">
      <InjectWebStyles />
      <ShowcaseThemeProvider>
        <WebSafeAreaShim>
          <ParentRouteSync />
          <ThemedTabsShell />
          <StatusBar style="auto" />
        </WebSafeAreaShim>
      </ShowcaseThemeProvider>
    </OtfProvider>
  )
}
