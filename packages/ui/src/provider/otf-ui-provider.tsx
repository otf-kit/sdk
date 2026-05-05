import React, { createContext, useContext, useEffect, useState } from 'react'

export type Theme = 'linear' | 'glass' | 'midnight' | 'minimal'
export type DarkMode = 'light' | 'dark' | 'system'

interface OtfUIContextValue {
  theme: Theme
  darkMode: DarkMode
  resolvedDark: boolean
  setTheme: (t: Theme) => void
  setDarkMode: (d: DarkMode) => void
}

const OtfUIContext = createContext<OtfUIContextValue | null>(null)

export function useOtfUI() {
  const ctx = useContext(OtfUIContext)
  if (!ctx) throw new Error('useOtfUI must be used within <OtfUIProvider>')
  return ctx
}

interface OtfUIProviderProps {
  children: React.ReactNode
  theme?: Theme
  darkMode?: DarkMode
}

export function OtfUIProvider({
  children,
  theme: initialTheme = 'linear',
  darkMode: initialDarkMode = 'system',
}: OtfUIProviderProps) {
  const [theme, setTheme] = useState<Theme>(initialTheme)
  const [darkMode, setDarkMode] = useState<DarkMode>(initialDarkMode)
  const [resolvedDark, setResolvedDark] = useState(false)

  useEffect(() => {
    const update = () => {
      const isDark =
        darkMode === 'dark' ||
        (darkMode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
      setResolvedDark(isDark)
    }

    update()

    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [darkMode])

  useEffect(() => {
    const root = document.documentElement
    // Remove any prior theme class so we apply exactly one
    root.classList.remove('theme-linear', 'theme-glass', 'theme-midnight', 'theme-minimal')
    root.classList.remove('dark', 'light')
    root.classList.add(`theme-${theme}`)
    root.classList.add(resolvedDark ? 'dark' : 'light')
  }, [theme, resolvedDark])

  return (
    <OtfUIContext.Provider value={{ theme, darkMode, resolvedDark, setTheme, setDarkMode }}>
      {children}
    </OtfUIContext.Provider>
  )
}
