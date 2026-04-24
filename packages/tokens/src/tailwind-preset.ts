import type { Config } from 'tailwindcss'

/** Helper: wraps a CSS var name in hsl() for Tailwind color config */
function hslVar(name: string): string {
  return `hsl(var(${name}))`
}

export const otfPreset: Partial<Config> = {
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        background:  { DEFAULT: hslVar('--background') },
        foreground:  { DEFAULT: hslVar('--foreground') },
        card: {
          DEFAULT:    hslVar('--card'),
          foreground: hslVar('--card-foreground'),
        },
        popover: {
          DEFAULT:    hslVar('--popover'),
          foreground: hslVar('--popover-foreground'),
        },
        primary: {
          DEFAULT:    hslVar('--primary'),
          foreground: hslVar('--primary-foreground'),
        },
        secondary: {
          DEFAULT:    hslVar('--secondary'),
          foreground: hslVar('--secondary-foreground'),
        },
        muted: {
          DEFAULT:    hslVar('--muted'),
          foreground: hslVar('--muted-foreground'),
        },
        accent: {
          DEFAULT:    hslVar('--accent'),
          foreground: hslVar('--accent-foreground'),
        },
        destructive: {
          DEFAULT:    hslVar('--destructive'),
          foreground: hslVar('--destructive-foreground'),
        },
        border:  { DEFAULT: hslVar('--border') },
        input:   { DEFAULT: hslVar('--input') },
        ring:    { DEFAULT: hslVar('--ring') },
        // Status + priority tokens (OTF-specific)
        'status-backlog':     hslVar('--status-backlog'),
        'status-todo':        hslVar('--status-todo'),
        'status-in-progress': hslVar('--status-in-progress'),
        'status-done':        hslVar('--status-done'),
        'status-cancelled':   hslVar('--status-cancelled'),
      },
      borderRadius: {
        lg:  'var(--radius)',
        md:  'calc(var(--radius) - 2px)',
        sm:  'calc(var(--radius) - 4px)',
        inner:     'var(--radius-inner)',
        innermost: 'var(--radius-innermost)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      spacing: {
        '0.5': 'var(--space-0\\.5)',
        '1':   'var(--space-1)',
        '2':   'var(--space-2)',
        '3':   'var(--space-3)',
        '4':   'var(--space-4)',
        '5':   'var(--space-5)',
        '6':   'var(--space-6)',
        '8':   'var(--space-8)',
        '10':  'var(--space-10)',
        '12':  'var(--space-12)',
        '16':  'var(--space-16)',
      },
      transitionTimingFunction: {
        'out-expo':   'var(--ease-out-expo)',
        'spring':     'var(--ease-spring)',
      },
      transitionDuration: {
        'instant': 'var(--duration-instant)',
        'fast':    'var(--duration-fast)',
        'normal':  'var(--duration-normal)',
        'slow':    'var(--duration-slow)',
      },
      keyframes: {
        shimmer: {
          '0%':   { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
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
        shimmer:   'shimmer 2s linear infinite',
        'fade-in': 'fade-in var(--duration-fast) var(--ease-out-expo)',
        'slide-up':'slide-up var(--duration-normal) var(--ease-out-expo)',
      },
    },
  },
}
