import type { Config } from 'tailwindcss'

/** Helper: wraps a CSS var name in hsl() for Tailwind color config */
function hslVar(name: string): string {
  return `hsl(var(${name}))`
}

// Mirrors packages/ui/tailwind.config.ts (spacing = Tailwind default = --space-* tokens).
// Add the tailwindcss-animate plugin in the app config: the package root re-exports this file.
export const otfPreset: Partial<Config> = {
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        background:  hslVar('--background'),
        foreground:  hslVar('--foreground'),
        card:        { DEFAULT: hslVar('--card'),        foreground: hslVar('--card-foreground') },
        popover:     { DEFAULT: hslVar('--popover'),     foreground: hslVar('--popover-foreground') },
        primary:     { DEFAULT: hslVar('--primary'),     foreground: hslVar('--primary-foreground') },
        secondary:   { DEFAULT: hslVar('--secondary'),   foreground: hslVar('--secondary-foreground') },
        muted:       { DEFAULT: hslVar('--muted'),       foreground: hslVar('--muted-foreground') },
        accent:      { DEFAULT: hslVar('--accent'),      foreground: hslVar('--accent-foreground') },
        destructive: { DEFAULT: hslVar('--destructive'), foreground: hslVar('--destructive-foreground') },
        border: hslVar('--border'),
        input:  hslVar('--input'),
        ring:   hslVar('--ring'),
        // Status + priority tokens (OTF-specific)
        'status-backlog':     hslVar('--status-backlog'),
        'status-todo':        hslVar('--status-todo'),
        'status-in-progress': hslVar('--status-in-progress'),
        'status-done':        hslVar('--status-done'),
        'status-cancelled':   hslVar('--status-cancelled'),
      },
      borderRadius: {
        sm:      'var(--radius-sm)',
        md:      'var(--radius-md)',
        lg:      'var(--radius-lg)',
        xl:      'var(--radius-xl)',
        full:    'var(--radius-full)',
        DEFAULT: 'var(--radius-md)',
        inner:     'var(--radius-inner)',
        innermost: 'var(--radius-innermost)',
      },
      boxShadow: {
        sm:      'var(--shadow-sm)',
        DEFAULT: 'var(--shadow-md)',
        md:      'var(--shadow-md)',
        lg:      'var(--shadow-lg)',
        xl:      'var(--shadow-xl)',
        card:    'var(--shadow-card)',
      },
      fontFamily: {
        sans:    'var(--font-sans)',
        heading: 'var(--font-heading)',
        mono:    'var(--font-mono)',
      },
      fontSize: {
        xs:    ['var(--font-size-xs)',   { lineHeight: 'var(--line-height-tight)' }],
        sm:    ['var(--font-size-sm)',   { lineHeight: 'var(--line-height-normal)' }],
        base:  ['var(--font-size-base)', { lineHeight: 'var(--line-height-normal)' }],
        lg:    ['var(--font-size-lg)',   { lineHeight: 'var(--line-height-relaxed)' }],
        xl:    ['var(--font-size-xl)',   { lineHeight: 'var(--line-height-heading)' }],
        '2xl': ['var(--font-size-2xl)',  { lineHeight: 'var(--line-height-heading)' }],
      },
      transitionTimingFunction: {
        'out-expo': 'var(--ease-out-expo)',
        'spring':   'var(--ease-spring)',
      },
      transitionDuration: {
        'instant': 'var(--duration-instant)',
        'fast':    'var(--duration-fast)',
        'normal':  'var(--duration-normal)',
        'slow':    'var(--duration-slow)',
      },
      keyframes: {
        shimmer: {
          from: { backgroundPosition: '200% 0' },
          to:   { backgroundPosition: '-200% 0' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':      { backgroundPosition: '100% 50%' },
        },
        'gradient-pulse': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%':      { opacity: '0.7', transform: 'scale(1.08)' },
        },
        'blob-float-0': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%':      { transform: 'translate(5%, 8%) scale(1.05)' },
          '66%':      { transform: 'translate(-4%, 4%) scale(0.97)' },
        },
        'blob-float-1': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%':      { transform: 'translate(-6%, -5%) scale(1.06)' },
          '66%':      { transform: 'translate(3%, -8%) scale(0.96)' },
        },
        'blob-float-2': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%':      { transform: 'translate(4%, -6%) scale(0.98)' },
          '66%':      { transform: 'translate(-5%, 5%) scale(1.04)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        shimmer:          'shimmer 2s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'gradient-pulse': 'gradient-pulse 6s ease-in-out infinite',
        'blob-float-0':   'blob-float-0 12s ease-in-out infinite',
        'blob-float-1':   'blob-float-1 18s ease-in-out infinite',
        'blob-float-2':   'blob-float-2 24s ease-in-out infinite',
        'fade-in':  'fade-in var(--duration-fast) var(--ease-out-expo)',
        'slide-up': 'slide-up var(--duration-normal) var(--ease-out-expo)',
      },
    },
  },
}

// Web-only entry (`@otfdashkit/tokens/tailwind-preset`): keep this file free of native imports.
export default otfPreset
