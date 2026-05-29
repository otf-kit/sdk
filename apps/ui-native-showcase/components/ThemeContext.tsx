import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { Platform } from 'react-native'
import {
  SHOWCASE_PALETTES,
  type ShowcaseMode,
  type ShowcasePalette,
  type ShowcasePaletteId,
} from '../lib/theme'

// The showcase ships the SDK's four real native palettes — Slate (default),
// Warm, Cosmic, Terminal — each with a dark + light surface (see lib/theme.ts,
// generated from `@otfdashkit/tokens`). Picking a palette + mode resolves to a
// single registered Tamagui theme name (`themeNameFor`), and every SDK
// primitive re-skins from that theme's $colorN ramp. This is a genuine
// SDK-theming demo, not Tamagui's stock accent swatches.
export {
  SHOWCASE_PALETTES,
  type ShowcaseMode,
  type ShowcasePalette,
  type ShowcasePaletteId,
}

type Mode = ShowcaseMode

interface ShowcaseTheme {
  paletteId: ShowcasePaletteId
  palette: ShowcasePalette
  mode: Mode
  setPaletteId: (id: ShowcasePaletteId) => void
  setMode: (mode: Mode) => void
  toggleMode: () => void
  palettes: readonly ShowcasePalette[]
}

const ShowcaseThemeContext = createContext<ShowcaseTheme | null>(null)

const STORAGE_KEY_PALETTE = 'otf-showcase-palette'
const STORAGE_KEY_MODE = 'otf-showcase-mode'
const DEFAULT_PALETTE: ShowcasePaletteId = 'otf'
const DEFAULT_MODE: Mode = 'dark'

function readPersisted<T extends string>(key: string, fallback: T): T {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return fallback
  try {
    const v = window.localStorage.getItem(key)
    return (v as T) ?? fallback
  } catch {
    return fallback
  }
}

function writePersisted(key: string, value: string): void {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return
  try {
    window.localStorage.setItem(key, value)
  } catch {
    /* swallow — storage may be disabled in private mode */
  }
}

function isValidPaletteId(id: string): id is ShowcasePaletteId {
  return SHOWCASE_PALETTES.some((p) => p.id === id)
}

export function ShowcaseThemeProvider({ children }: { children: React.ReactNode }) {
  const [paletteId, setPaletteIdState] = useState<ShowcasePaletteId>(DEFAULT_PALETTE)
  const [mode, setModeState] = useState<Mode>(DEFAULT_MODE)

  useEffect(() => {
    const persistedPalette = readPersisted<string>(STORAGE_KEY_PALETTE, DEFAULT_PALETTE)
    const persistedMode = readPersisted<Mode>(STORAGE_KEY_MODE, DEFAULT_MODE)
    if (isValidPaletteId(persistedPalette)) {
      setPaletteIdState(persistedPalette)
    }
    if (persistedMode === 'light' || persistedMode === 'dark') {
      setModeState(persistedMode)
    }
  }, [])

  const setPaletteId = useCallback((id: ShowcasePaletteId) => {
    setPaletteIdState(id)
    writePersisted(STORAGE_KEY_PALETTE, id)
  }, [])

  const setMode = useCallback((next: Mode) => {
    setModeState(next)
    writePersisted(STORAGE_KEY_MODE, next)
  }, [])

  const toggleMode = useCallback(() => {
    setModeState((prev) => {
      const next: Mode = prev === 'dark' ? 'light' : 'dark'
      writePersisted(STORAGE_KEY_MODE, next)
      return next
    })
  }, [])

  const value = useMemo<ShowcaseTheme>(() => {
    const palette =
      SHOWCASE_PALETTES.find((p) => p.id === paletteId) ?? SHOWCASE_PALETTES[0]
    if (!palette) {
      throw new Error('Showcase: SHOWCASE_PALETTES is empty — at least one entry is required')
    }
    return {
      paletteId,
      palette,
      mode,
      setPaletteId,
      setMode,
      toggleMode,
      palettes: SHOWCASE_PALETTES,
    }
  }, [paletteId, mode, setPaletteId, setMode, toggleMode])

  return <ShowcaseThemeContext.Provider value={value}>{children}</ShowcaseThemeContext.Provider>
}

export function useShowcaseTheme(): ShowcaseTheme {
  const ctx = useContext(ShowcaseThemeContext)
  if (!ctx) throw new Error('useShowcaseTheme must be used inside ShowcaseThemeProvider')
  return ctx
}
