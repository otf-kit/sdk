import { render } from '@testing-library/react'
import { CountdownBanner } from './CountdownBanner'

// TODO: add full a11y + variant tests
describe('CountdownBanner', () => {
  it('renders without throwing', () => {
    expect(() => render(<CountdownBanner />)).not.toThrow()
  })
})
