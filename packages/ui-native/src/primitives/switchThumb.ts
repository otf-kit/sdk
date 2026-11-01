const INK = '#111111'

function channels(color: string): [number, number, number] | null {
  const c = color.trim()
  const hex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(c)?.[1]
  if (hex) {
    const h = hex.length === 3 ? hex.replace(/./g, (x) => x + x) : hex
    return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)) as [number, number, number]
  }
  const rgb = /^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/i.exec(c)
  if (rgb) return [Number(rgb[1]), Number(rgb[2]), Number(rgb[3])]
  // Tamagui v5 theme ramps are hsl()/hsla() strings.
  const hsl = /^hsla?\(\s*([\d.]+)(?:deg)?[\s,]+([\d.]+)%[\s,]+([\d.]+)%/i.exec(c)
  if (hsl) {
    const h = Number(hsl[1]) % 360
    const s = Number(hsl[2]) / 100
    const l = Number(hsl[3]) / 100
    const k = (n: number) => (n + h / 30) % 12
    const a = s * Math.min(l, 1 - l)
    const f = (n: number) => Math.round(255 * (l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1))))
    return [f(0), f(8), f(4)]
  }
  return null
}

/** WCAG relative luminance of a #hex, rgb()/rgba() or hsl()/hsla() colour; null for anything else. */
export function luminance(color: string): number | null {
  const ch = channels(color)
  if (!ch) return null
  const [r, g, b] = ch.map((v) => {
    const x = v / 255
    return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4
  }) as [number, number, number]
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/** The on thumb for an accent: white unless it sits under 2:1 (pale accents like yellow), then dark ink. */
export function switchThumbOn(accent: string): string {
  const l = luminance(accent)
  return l === null || 1.05 / (l + 0.05) >= 2 ? '#ffffff' : INK
}
