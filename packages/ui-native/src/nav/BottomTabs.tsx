import React from 'react'
import { useTheme } from 'tamagui'

// Import Tabs from expo-router lazily so the module doesn't hard-fail
// in environments where expo-router isn't installed (e.g. Storybook web).
let ExpoTabs: any
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  ExpoTabs = require('expo-router').Tabs
} catch {
  ExpoTabs = null
}

export interface BottomTabsProps extends Record<string, unknown> {
  children?: React.ReactNode
}

/**
 * BottomTabs — styled wrapper around Expo Router `<Tabs>` that applies
 * OTF token colours (background, border, active/inactive tint).
 *
 * Usage:
 * ```tsx
 * // app/(tabs)/_layout.tsx
 * import { BottomTabs, BottomTab } from '@otf/ui-native'
 *
 * export default function TabLayout() {
 *   return (
 *     <BottomTabs>
 *       <BottomTab name="index" options={{ title: 'Home' }} />
 *       <BottomTab name="settings" options={{ title: 'Settings' }} />
 *     </BottomTabs>
 *   )
 * }
 * ```
 */
export function BottomTabs({ children, ...props }: BottomTabsProps) {
  const theme = useTheme()

  if (!ExpoTabs) {
    console.warn('@otf/ui-native BottomTabs: expo-router not found — rendering null')
    return null
  }

  return (
    <ExpoTabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.background?.val ?? '#0b0b0e',
          borderTopColor: theme.borderColor?.val ?? '#1f2030',
          borderTopWidth: 1,
        },
        tabBarActiveTintColor: theme.color9?.val ?? '#6366f1',
        tabBarInactiveTintColor: theme.color8?.val ?? '#4a4a6a',
      }}
      {...props}
    >
      {children}
    </ExpoTabs>
  )
}

/** Re-export Tabs.Screen as BottomTab for ergonomic usage */
export const BottomTab: React.ComponentType<any> = ExpoTabs?.Screen ?? (() => null)
