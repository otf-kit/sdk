import { render } from '@testing-library/react'
import { GlassCard } from './GlassCard'

// TODO: add full a11y + variant tests
describe('GlassCard', () => {
  it('renders without throwing', () => {
    expect(() => render(<GlassCard />)).not.toThrow()
  })
})
