'use client'

import React from 'react'
import { Moon, Sun, Monitor } from 'lucide-react'
import { cn } from '../utils/cn'

type Mode = 'light' | 'dark' | 'system'
const STORAGE_KEY = 'otf-color-scheme'

function readInitial(): Mode {
  if (typeof window === 'undefined') return 'system'
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    if (v === 'light' || v === 'dark' || v === 'system') return v
  } catch {}
  return 'system'
}

function apply(mode: Mode) {
  if (typeof document === 'undefined') return
  const isDark =
    mode === 'dark' ||
    (mode === 'system' && window.matchMedia?.('(prefers-color-scheme: dark)').matches)
  document.documentElement.classList.toggle('dark', isDark)
}

export interface ThemeSwitchProps {
  /** Controlled initial mode. Falls back to localStorage + system. */
  defaultMode?: Mode
  onChange?: (mode: Mode) => void
  className?: string
  /** Render as a three-way segmented control (default) or a single cycling button. */
  variant?: 'segmented' | 'button'
}

export function ThemeSwitch({ defaultMode, onChange, className, variant = 'segmented' }: ThemeSwitchProps) {
  const [mode, setMode] = React.useState<Mode>(() => defaultMode ?? readInitial())

  React.useEffect(() => {
    apply(mode)
    try { localStorage.setItem(STORAGE_KEY, mode) } catch {}
    onChange?.(mode)
  }, [mode, onChange])

  // Re-apply when the system preference flips, if we're following it.
  React.useEffect(() => {
    if (mode !== 'system' || typeof window === 'undefined') return
    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => apply('system')
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [mode])

  if (variant === 'button') {
    const next: Mode = mode === 'light' ? 'dark' : mode === 'dark' ? 'system' : 'light'
    const Icon = mode === 'light' ? Sun : mode === 'dark' ? Moon : Monitor
    return (
      <button
        type="button"
        data-slot="theme-switch"
        aria-label={`Switch to ${next} theme`}
        onClick={() => setMode(next)}
        className={cn(
          'h-9 w-9 inline-flex items-center justify-center rounded-md border border-border bg-background text-foreground hover:bg-accent transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          className
        )}
      >
        <Icon className="h-4 w-4" />
      </button>
    )
  }

  const ITEMS: { mode: Mode; label: string; Icon: typeof Sun }[] = [
    { mode: 'light',  label: 'Light',  Icon: Sun },
    { mode: 'dark',   label: 'Dark',   Icon: Moon },
    { mode: 'system', label: 'System', Icon: Monitor },
  ]

  return (
    <div
      role="radiogroup"
      aria-label="Color scheme"
      data-slot="theme-switch"
      className={cn('inline-flex rounded-md border border-border bg-background p-0.5', className)}
    >
      {ITEMS.map(({ mode: m, label, Icon }) => {
        const active = mode === m
        return (
          <button
            key={m}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={label}
            onClick={() => setMode(m)}
            className={cn(
              'inline-flex items-center justify-center gap-1.5 px-2.5 h-7 text-xs rounded transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              active
                ? 'bg-foreground text-background'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Icon className="h-3.5 w-3.5" />
            {label}
          </button>
        )
      })}
    </div>
  )
}
