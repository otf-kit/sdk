'use client'
import React from 'react'
import { Palette } from 'lucide-react'
import { cn } from '../../utils/cn'
import { Popover, PopoverContent, PopoverTrigger } from '../../primitives/popover'
import { Separator } from '../../primitives/separator'
import { ThemeSwitch } from '../../theme/ThemeSwitch'

// ── Generic FAB types ─────────────────────────────────────────────────────────

export type FabPosition = 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'

export interface FabSection {
  /** Section heading shown in small-caps above the items. */
  label: string
  /** The content to render inside this section. */
  content: React.ReactNode
}

export interface FloatingActionButtonProps {
  /** Icon rendered inside the FAB. Defaults to a palette icon. */
  icon?: React.ReactNode
  /** Tooltip / aria-label for the FAB button. */
  label?: string
  /** Panel title shown at the top of the popover. */
  title?: string
  /** Panel subtitle shown below the title. */
  description?: string
  /** Sections of content to render inside the popover panel. */
  sections?: FabSection[]
  /** Which corner to anchor the FAB. @default 'bottom-right' */
  position?: FabPosition
  /** Extra className on the root wrapper. */
  className?: string
}

const POSITION_CLASSES: Record<FabPosition, string> = {
  'bottom-right': 'bottom-5 right-5',
  'bottom-left':  'bottom-5 left-5',
  'top-right':    'top-5 right-5',
  'top-left':     'top-5 left-5',
}

const POPOVER_ALIGN: Record<FabPosition, 'start' | 'end'> = {
  'bottom-right': 'end',
  'bottom-left':  'start',
  'top-right':    'end',
  'top-left':     'start',
}

const POPOVER_SIDE: Record<FabPosition, 'top' | 'bottom'> = {
  'bottom-right': 'top',
  'bottom-left':  'top',
  'top-right':    'bottom',
  'top-left':     'bottom',
}

// ── Generic FloatingActionButton ─────────────────────────────────────────────

export function FloatingActionButton({
  icon = <Palette className="h-[18px] w-[18px]" />,
  label = 'Open panel',
  title,
  description,
  sections = [],
  position = 'bottom-right',
  className,
}: FloatingActionButtonProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <div
      data-slot="floating-action-button"
      className={cn('fixed z-50', POSITION_CLASSES[position], className)}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            aria-label={label}
            aria-expanded={open}
            className={cn(
              'h-11 w-11 rounded-full shadow-lg',
              'flex items-center justify-center',
              'bg-primary text-primary-foreground',
              'border border-primary/20',
              'hover:opacity-90 active:scale-95',
              'transition-all duration-150',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              'focus-visible:ring-offset-2 focus-visible:ring-offset-background',
            )}
          >
            {icon}
          </button>
        </PopoverTrigger>

        <PopoverContent
          side={POPOVER_SIDE[position]}
          align={POPOVER_ALIGN[position]}
          sideOffset={10}
          className="w-60 p-0 overflow-hidden"
        >
          {(title || description) && (
            <>
              <div className="px-3 pt-3 pb-2">
                {title && <p className="text-xs font-semibold leading-none">{title}</p>}
                {description && (
                  <p className="text-[10px] text-muted-foreground mt-0.5">{description}</p>
                )}
              </div>
              {sections.length > 0 && <Separator />}
            </>
          )}

          {sections.length > 0 && (
            <div className="px-3 py-2.5 space-y-3">
              {sections.map((section, i) => (
                <React.Fragment key={section.label}>
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground mb-1.5">
                      {section.label}
                    </p>
                    {section.content}
                  </div>
                  {i < sections.length - 1 && <Separator />}
                </React.Fragment>
              ))}
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  )
}

// ── Theme-picker helpers ──────────────────────────────────────────────────────

const STORAGE_KEY = 'otf-theme'
const BRAND_SENTINEL = '__brand__'

export interface ThemePickerOption {
  /** CSS class applied to <html>. Use '__brand__' for the default brand palette (no class). */
  value: string
  /** Display label shown as tooltip and below the active swatch. */
  label: string
  /** Hex or CSS color used to render the swatch circle. */
  color: string
}

export const DEFAULT_THEME_OPTIONS: ThemePickerOption[] = [
  { value: BRAND_SENTINEL, label: 'Brand',    color: '#F97316' },
  { value: 'theme-slate',  label: 'Slate',    color: '#6366F1' },
  { value: 'theme-warm',   label: 'Warm',     color: '#D97706' },
  { value: 'theme-cosmic', label: 'Cosmic',   color: '#7C3AED' },
  { value: 'theme-terminal', label: 'Terminal', color: '#16A34A' },
]

function readStoredTheme(): string {
  if (typeof window === 'undefined') return BRAND_SENTINEL
  try { return localStorage.getItem(STORAGE_KEY) || BRAND_SENTINEL } catch { return BRAND_SENTINEL }
}

function applyTheme(val: string) {
  if (typeof document === 'undefined') return
  const themeClass = val === BRAND_SENTINEL ? '' : val
  const root = document.documentElement
  const preserved = Array.from(root.classList).filter(c => !c.startsWith('theme-'))
  root.className = [...preserved, ...(themeClass ? [themeClass] : [])].join(' ').trim()
  try { localStorage.setItem(STORAGE_KEY, themeClass) } catch {}
}

// ── PaletteSwatches (section content for the theme FAB) ──────────────────────

export interface PaletteSwatchesProps {
  options?: ThemePickerOption[]
}

export function PaletteSwatches({ options = DEFAULT_THEME_OPTIONS }: PaletteSwatchesProps) {
  const [activeValue, setActiveValue] = React.useState<string>(readStoredTheme)
  const activeOption = options.find(o => o.value === activeValue) ?? options[0]

  const handleSelect = (value: string) => {
    setActiveValue(value)
    applyTheme(value)
  }

  return (
    <div>
      <div className="flex items-center gap-2">
        {options.map(opt => {
          const isActive = activeValue === opt.value
          return (
            <button
              key={opt.value}
              type="button"
              title={opt.label}
              aria-label={opt.label}
              aria-pressed={isActive}
              onClick={() => handleSelect(opt.value)}
              className={cn(
                'h-5 w-5 rounded-full transition-all duration-150',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
                isActive
                  ? 'ring-2 ring-offset-1 ring-offset-card scale-110'
                  : 'opacity-50 hover:opacity-80 hover:scale-105',
              )}
              style={{
                background: opt.color,
                ['--tw-ring-color' as string]: opt.color,
              }}
            />
          )
        })}
      </div>
      <p className="text-[10px] text-muted-foreground mt-1.5 font-medium">
        {activeOption?.label ?? ''}
      </p>
    </div>
  )
}

// ── FloatingThemePicker (pre-wired convenience export) ────────────────────────

export interface FloatingThemePickerProps {
  options?: ThemePickerOption[]
  position?: FabPosition
  className?: string
}

export function FloatingThemePicker({
  options = DEFAULT_THEME_OPTIONS,
  position = 'bottom-right',
  className,
}: FloatingThemePickerProps) {
  return (
    <FloatingActionButton
      icon={<Palette className="h-[18px] w-[18px]" />}
      label="Open theme picker"
      title="Appearance"
      position={position}
      className={className}
      sections={[
        {
          label: 'Mode',
          content: <ThemeSwitch variant="segmented" className="w-full" />,
        },
        {
          label: 'Palette',
          content: <PaletteSwatches options={options} />,
        },
      ]}
    />
  )
}
