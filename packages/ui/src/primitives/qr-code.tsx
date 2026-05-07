import React from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { cn } from '../utils/cn'

export type QrCodeProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> & {
  /** The text or URL to encode. Required — empty string renders an empty state. */
  value: string
  /** Pixel size of the rendered QR. Default 192. */
  size?: number
  /** Error correction level. Higher = more redundancy + bigger QR. */
  level?: 'L' | 'M' | 'Q' | 'H'
  /** Foreground color. Default `currentColor` so it inherits the text token. */
  fgColor?: string
  /** Background color. Default `transparent`. */
  bgColor?: string
  /** Add quiet-zone margin around the QR (recommended for printing). */
  includeMargin?: boolean
  /** Optional center logo / image. */
  imageSettings?: {
    src: string
    height: number
    width: number
    excavate: boolean
    x?: number
    y?: number
    opacity?: number
    crossOrigin?: 'anonymous' | 'use-credentials' | ''
  }
}

/**
 * QR code wrapper around `qrcode.react` (SVG output).
 * The default `currentColor` foreground means the QR inherits the surrounding text color,
 * so it adapts to dark/light themes automatically.
 */
export const QrCode = React.forwardRef<HTMLDivElement, QrCodeProps>(
  (
    {
      value,
      size = 192,
      level = 'M',
      fgColor = 'currentColor',
      bgColor = 'transparent',
      includeMargin = false,
      imageSettings,
      className,
      ...props
    },
    ref,
  ) => {
    if (!value) {
      return (
        <div
          ref={ref}
          className={cn(
            'flex items-center justify-center rounded-md border border-dashed border-border bg-card p-6 text-sm text-muted-foreground',
            className,
          )}
          style={{ width: size, height: size }}
          role="img"
          aria-label="QR code placeholder — no value provided"
          {...props}
        >
          No value
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-md border border-border bg-card p-4 text-foreground',
          className,
        )}
        role="img"
        aria-label={`QR code for ${value}`}
        {...props}
      >
        <QRCodeSVG
          value={value}
          size={size}
          level={level}
          fgColor={fgColor}
          bgColor={bgColor}
          marginSize={includeMargin ? 4 : 0}
          imageSettings={imageSettings}
        />
      </div>
    )
  },
)
QrCode.displayName = 'QrCode'
