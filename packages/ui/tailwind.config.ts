import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}', './stories/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        full: 'var(--radius-full)',
        DEFAULT: 'var(--radius-md)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        DEFAULT: 'var(--shadow-md)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
        card: 'var(--shadow-card)',
      },
      fontFamily: {
        sans: 'var(--font-sans)',
        heading: 'var(--font-heading)',
        mono: 'var(--font-mono)',
      },
      fontSize: {
        xs:  ['var(--font-size-xs)',  { lineHeight: 'var(--line-height-tight)' }],
        sm:  ['var(--font-size-sm)',  { lineHeight: 'var(--line-height-normal)' }],
        base:['var(--font-size-base)',{ lineHeight: 'var(--line-height-normal)' }],
        lg:  ['var(--font-size-lg)',  { lineHeight: 'var(--line-height-relaxed)' }],
        xl:  ['var(--font-size-xl)',  { lineHeight: 'var(--line-height-heading)' }],
        '2xl':['var(--font-size-2xl)',{ lineHeight: 'var(--line-height-heading)' }],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card:        { DEFAULT: 'hsl(var(--card))',        foreground: 'hsl(var(--card-foreground))' },
        popover:     { DEFAULT: 'hsl(var(--popover))',     foreground: 'hsl(var(--popover-foreground))' },
        primary:     { DEFAULT: 'hsl(var(--primary))',     foreground: 'hsl(var(--primary-foreground))' },
        secondary:   { DEFAULT: 'hsl(var(--secondary))',   foreground: 'hsl(var(--secondary-foreground))' },
        muted:       { DEFAULT: 'hsl(var(--muted))',       foreground: 'hsl(var(--muted-foreground))' },
        accent:      { DEFAULT: 'hsl(var(--accent))',      foreground: 'hsl(var(--accent-foreground))' },
        destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))' },
        border: 'hsl(var(--border))',
        input:  'hsl(var(--input))',
        ring:   'hsl(var(--ring))',
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
      },
      animation: {
        shimmer:          'shimmer 2s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'gradient-pulse': 'gradient-pulse 6s ease-in-out infinite',
        'blob-float-0':   'blob-float-0 12s ease-in-out infinite',
        'blob-float-1':   'blob-float-1 18s ease-in-out infinite',
        'blob-float-2':   'blob-float-2 24s ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
