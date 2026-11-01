// The OtfSwitch on thumb is white like iOS and design B, and only turns ink on pale accents where white falls under 2:1.
import { describe, expect, it } from 'bun:test'
import { luminance, switchThumbOn } from '../src/primitives/switchThumb'

const ratio = (a: string, b: string) => {
  const [x, y] = [luminance(a)!, luminance(b)!].sort((p, q) => q - p)
  return (x + 0.05) / (y + 0.05)
}

// Tamagui v5 dark color9 per accent, plus the hex fills and rgb() a kit may pass.
const ACCENTS = [
  'hsla(53, 92%, 55%, 1)', 'hsl(24, 94%, 50%)', 'hsla(206, 100%, 50%, 1)', 'hsla(151, 55%, 41.5%, 1)',
  '#f97316', '#eab308', '#22c55e', '#3b82f6', '#737373', 'rgb(218, 91, 7)', '#fff',
]

describe('switchThumbOn', () => {
  for (const accent of ACCENTS) {
    it(`stays visible (2:1) on ${accent}`, () => {
      expect(luminance(accent)).not.toBeNull()
      expect(ratio(switchThumbOn(accent), accent)).toBeGreaterThanOrEqual(2)
    })
  }

  it('is white on the brand oranges, as in design B', () => {
    for (const accent of ['#f97316', '#fb923c', 'rgb(218, 91, 7)']) expect(switchThumbOn(accent)).toBe('#ffffff')
  })

  it('is ink on pale accents where white disappears', () => {
    for (const accent of ['hsla(53, 92%, 55%, 1)', '#eab308', '#e5e5e5', '#fff']) expect(switchThumbOn(accent)).toBe('#111111')
  })

  it('reads hsl the same as the equivalent hex', () => {
    expect(luminance('hsl(0, 0%, 100%)')).toBeCloseTo(luminance('#ffffff')!, 5)
    expect(luminance('hsl(120, 100%, 50%)')).toBeCloseTo(luminance('#00ff00')!, 5)
    expect(luminance('hsla(240, 100%, 50%, 1)')).toBeCloseTo(luminance('#0000ff')!, 5)
    expect(luminance('hsl(53, 92%, 55%)')).toBeCloseTo(luminance('#f6dd23')!, 3)
  })
})
