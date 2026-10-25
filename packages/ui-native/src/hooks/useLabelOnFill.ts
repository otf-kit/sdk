import { useTheme } from 'tamagui'

// Label colour for text sitting on a filled accent (Chip, OtfTabs pill).
// Dark palettes and any label already at AA keep `$color1`, unchanged.

type RGB = readonly [number, number, number]
const AA_NORMAL = 4.5
// No black colour token exists; the palette text tokens miss AA on some light fills, pure black clears it.
const LIGHT_INK = '#000000'

export function parseColor(input: unknown): RGB | null {
  if (typeof input !== 'string' || !input) return null
  const s = input.trim().toLowerCase()
  const hex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/.exec(s)?.[1]
  if (hex) {
    const h = hex.length === 3 ? [...hex].map((c) => c + c).join('') : hex
    const ch = (i: number) => parseInt(h.slice(i, i + 2), 16) / 255
    return [ch(0), ch(2), ch(4)]
  }
  const hsl = /^hsla?\(\s*([\d.]+)(?:deg)?[\s,]+([\d.]+)%[\s,]+([\d.]+)%/.exec(s)
  if (hsl) {
    const h = Number(hsl[1]) % 360
    const sat = Number(hsl[2]) / 100
    const l = Number(hsl[3]) / 100
    const c = (1 - Math.abs(2 * l - 1)) * sat
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
    const m = l - c / 2
    const [r, g, b] = h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x]
      : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x]
    return [r + m, g + m, b + m]
  }
  return null
}

const channel = (v: number) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)
const luminance = ([r, g, b]: RGB) => 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)

export function contrastRatio(a: RGB, b: RGB): number {
  const la = luminance(a)
  const lb = luminance(b)
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05)
}

// Light theme (bg luminance > 0.5) whose $color1 fails AA on the fill: near-black ink, if it reads better.
export function labelFor(fill: RGB | null, bg: RGB | null): string {
  if (!fill || !bg) return '$color1'
  const onBg = contrastRatio(bg, fill)
  if (onBg >= AA_NORMAL || luminance(bg) <= 0.5) return '$color1'
  const ink = parseColor(LIGHT_INK)!
  return contrastRatio(ink, fill) > onBg ? LIGHT_INK : '$color1'
}

// `fill` is a theme token ('$color9') or a raw colour string.
export function useLabelOnFill(fill: string): string {
  const theme: Partial<Record<string, { val?: unknown }>> = useTheme()
  const read = (v: string) => (v.startsWith('$') ? parseColor(theme[v.slice(1)]?.val) : parseColor(v))
  return labelFor(read(fill), read('$color1'))
}
