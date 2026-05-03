import React from 'react'
import {
  HexColorPicker,
  HexAlphaColorPicker,
  RgbStringColorPicker,
  HslStringColorPicker,
} from 'react-colorful'
import { Pipette } from 'lucide-react'
import { Input } from '../primitives/input'
import { cn } from '../utils/cn'

type ColorFormat = 'hex' | 'rgb' | 'hsl'

export type ColorPickerProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  /** Controlled color value (e.g. '#3b82f6' for hex, 'rgb(59, 130, 246)' for rgb). */
  value?: string
  /** Uncontrolled initial value. */
  defaultValue?: string
  /** Fires whenever the color changes. */
  onValueChange?: (value: string) => void
  /** Format for the text input + picker. Default 'hex'. */
  format?: ColorFormat
  /** Include alpha channel (only meaningful for hex). Default false. */
  showAlpha?: boolean
  /** Optional preset palette displayed as clickable swatches. */
  swatches?: string[]
  /** Show the eye-dropper button when the API is available. Default true. */
  showEyeDropper?: boolean
  /** Disable interaction. */
  disabled?: boolean
}

// Minimal type for the experimental EyeDropper API (not yet in lib.dom.d.ts everywhere).
type EyeDropperResult = { sRGBHex: string }
type EyeDropperLike = { open: () => Promise<EyeDropperResult> }
type EyeDropperCtor = new () => EyeDropperLike

const HEX_RE = /^#([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i
const RGB_RE = /^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(,\s*(0|1|0?\.\d+)\s*)?\)$/i
const HSL_RE = /^hsla?\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*(,\s*(0|1|0?\.\d+)\s*)?\)$/i

function isValid(value: string, format: ColorFormat, showAlpha: boolean): boolean {
  if (format === 'hex') {
    if (!HEX_RE.test(value)) return false
    // Without alpha: only 3 or 6 hex digits.
    if (!showAlpha && (value.length === 5 || value.length === 9)) return false
    return true
  }
  if (format === 'rgb') return RGB_RE.test(value)
  return HSL_RE.test(value)
}

function defaultFor(format: ColorFormat, showAlpha: boolean): string {
  if (format === 'hex') return showAlpha ? '#3b82f6ff' : '#3b82f6'
  if (format === 'rgb') return showAlpha ? 'rgba(59, 130, 246, 1)' : 'rgb(59, 130, 246)'
  return showAlpha ? 'hsla(217, 91%, 60%, 1)' : 'hsl(217, 91%, 60%)'
}

/**
 * Inline color picker with optional eye-dropper, swatches, and alpha channel.
 * Wraps `react-colorful` and themes it to OTF's design tokens.
 */
export const ColorPicker = React.forwardRef<HTMLDivElement, ColorPickerProps>(
  (
    {
      value: valueProp,
      defaultValue,
      onValueChange,
      format = 'hex',
      showAlpha = false,
      swatches,
      showEyeDropper = true,
      disabled = false,
      className,
      ...props
    },
    ref,
  ) => {
    const fallback = defaultValue ?? defaultFor(format, showAlpha)
    const isControlled = valueProp !== undefined
    const [internal, setInternal] = React.useState<string>(fallback)
    const value = isControlled ? (valueProp as string) : internal

    // Mirror the value into the text input. Lets users type freely (incl. invalid intermediate
    // states) without the picker fighting them.
    const [draft, setDraft] = React.useState<string>(value)
    const [draftValid, setDraftValid] = React.useState(true)
    React.useEffect(() => {
      setDraft(value)
      setDraftValid(true)
    }, [value])

    const [eyeDropperSupported, setEyeDropperSupported] = React.useState(false)
    React.useEffect(() => {
      if (typeof window !== 'undefined' && 'EyeDropper' in window) {
        setEyeDropperSupported(true)
      }
    }, [])

    const commit = React.useCallback(
      (next: string) => {
        if (!isControlled) setInternal(next)
        onValueChange?.(next)
      },
      [isControlled, onValueChange],
    )

    const handleDraftChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const next = e.target.value
      setDraft(next)
      const valid = isValid(next, format, showAlpha)
      setDraftValid(valid || next === '')
      if (valid) commit(next)
    }

    const handleEyeDropper = async () => {
      if (disabled) return
      const Ctor = (window as unknown as { EyeDropper?: EyeDropperCtor }).EyeDropper
      if (!Ctor) return
      try {
        const result = await new Ctor().open()
        // EyeDropper always returns hex. If the picker wants rgb/hsl we still pass the hex —
        // react-colorful handles the conversion internally on next render.
        commit(result.sRGBHex)
      } catch {
        // User cancelled — ignore.
      }
    }

    const Picker = (() => {
      const common = {
        color: value,
        onChange: commit,
        className: cn(
          'otf-color-picker',
          disabled && 'pointer-events-none opacity-50 grayscale',
        ),
      }
      if (format === 'hex' && showAlpha) return <HexAlphaColorPicker {...common} />
      if (format === 'hex') return <HexColorPicker {...common} />
      if (format === 'rgb') return <RgbStringColorPicker {...common} />
      return <HslStringColorPicker {...common} />
    })()

    const showDropper = showEyeDropper && eyeDropperSupported

    return (
      <div
        ref={ref}
        className={cn(
          'flex w-full max-w-[220px] flex-col gap-3',
          disabled && 'opacity-60',
          className,
        )}
        {...props}
      >
        {/* react-colorful theming — scoped via the .otf-color-picker className. */}
        <style>{`
          .otf-color-picker { width: 100% !important; height: auto !important; }
          .otf-color-picker .react-colorful__saturation {
            border-radius: calc(var(--radius) - 2px);
            border-bottom: none;
            margin-bottom: 8px;
            height: 140px;
          }
          .otf-color-picker .react-colorful__hue,
          .otf-color-picker .react-colorful__alpha {
            height: 12px;
            border-radius: 9999px;
            margin-bottom: 6px;
          }
          .otf-color-picker .react-colorful__alpha:last-child { margin-bottom: 0; }
          .otf-color-picker .react-colorful__pointer {
            width: 16px;
            height: 16px;
            border-width: 2px;
          }
          .otf-color-picker .react-colorful__saturation-pointer { width: 18px; height: 18px; }
        `}</style>

        <div
          className={cn(
            'rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-2',
            disabled && 'pointer-events-none',
          )}
        >
          {Picker}
        </div>

        <div className="flex items-center gap-2">
          <div
            className="h-9 w-9 shrink-0 rounded-md border border-[hsl(var(--border))]"
            style={{ backgroundColor: draftValid ? value : undefined }}
            aria-hidden="true"
          />
          <Input
            value={draft}
            onChange={handleDraftChange}
            disabled={disabled}
            spellCheck={false}
            autoComplete="off"
            className={cn(
              'font-mono text-xs',
              !draftValid && 'border-[hsl(var(--destructive))] focus-visible:ring-[hsl(var(--destructive))]',
            )}
            aria-label={`Color value (${format})`}
            aria-invalid={!draftValid}
          />
          {showDropper && (
            <button
              type="button"
              onClick={handleEyeDropper}
              disabled={disabled}
              aria-label="Pick color from screen"
              className={cn(
                'inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-[hsl(var(--border))]',
                'text-[hsl(var(--muted-foreground))] transition-colors',
                'hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]',
                'disabled:cursor-not-allowed disabled:opacity-50',
              )}
            >
              <Pipette className="h-4 w-4" />
            </button>
          )}
        </div>

        {swatches && swatches.length > 0 && (
          <div className="flex flex-wrap gap-1.5" role="listbox" aria-label="Preset colors">
            {swatches.map((swatch) => {
              const active = value.toLowerCase() === swatch.toLowerCase()
              return (
                <button
                  key={swatch}
                  type="button"
                  role="option"
                  aria-selected={active}
                  aria-label={swatch}
                  onClick={() => commit(swatch)}
                  disabled={disabled}
                  className={cn(
                    'h-6 w-6 rounded-full border border-[hsl(var(--border))] transition-transform',
                    'hover:scale-110 active:scale-95',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-1',
                    active && 'ring-2 ring-[hsl(var(--ring))] ring-offset-1',
                    'disabled:cursor-not-allowed disabled:opacity-50',
                  )}
                  style={{ backgroundColor: swatch }}
                />
              )
            })}
          </div>
        )}
      </div>
    )
  },
)
ColorPicker.displayName = 'ColorPicker'
