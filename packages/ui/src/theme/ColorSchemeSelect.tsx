'use client'

import React from 'react'
import { Combobox, type ComboboxOption } from '../forms/combobox'

/**
 * ColorSchemeSelect — pick an OTF theme class and apply it to
 * <html>. Persists in localStorage under `otf-theme`. Theme classes
 * live in `@otf/ui/styles` (linear, glass, midnight, minimal, etc.).
 */

const STORAGE_KEY = 'otf-theme'

export interface ColorSchemeSelectProps {
  options?: ComboboxOption[]
  defaultValue?: string
  onChange?: (themeClass: string) => void
  className?: string
}

const DEFAULT_OPTIONS: ComboboxOption[] = [
  { value: 'theme-linear',   label: 'Linear',   description: 'Indigo palette, Linear-like' },
  { value: 'theme-glass',    label: 'Glass',    description: 'Warm purple glassmorphism' },
  { value: 'theme-midnight', label: 'Midnight', description: 'Deep cosmic dark' },
  { value: 'theme-minimal',  label: 'Minimal',  description: 'Mono/terminal palette' },
]

function readInitial(fallback: string): string {
  if (typeof window === 'undefined') return fallback
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    if (v) return v
  } catch {}
  return fallback
}

function apply(themeClass: string) {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  // Strip any existing theme-* class, preserve `dark` if present
  const preserved = Array.from(root.classList).filter(c => !c.startsWith('theme-'))
  root.className = [...preserved, themeClass].join(' ').trim()
}

export function ColorSchemeSelect({
  options = DEFAULT_OPTIONS,
  defaultValue,
  onChange,
  className,
}: ColorSchemeSelectProps) {
  const fallback = defaultValue ?? options[0]?.value ?? ''
  const [value, setValue] = React.useState<string>(() => readInitial(fallback))
  const didMount = React.useRef(false)

  React.useEffect(() => {
    // Skip on initial mount — the app-level init script (index.html) already
    // applied the persisted theme class. Only re-apply when the user changes it.
    if (!didMount.current) { didMount.current = true; return }
    apply(value)
    try { localStorage.setItem(STORAGE_KEY, value) } catch {}
    onChange?.(value)
  }, [value, onChange])

  return (
    <Combobox
      options={options}
      value={value}
      onChange={setValue}
      placeholder="Select theme"
      searchPlaceholder="Search themes"
      className={className}
    />
  )
}
