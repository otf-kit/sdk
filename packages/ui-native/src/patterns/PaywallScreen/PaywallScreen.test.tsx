import { render } from '@testing-library/react'
import { PaywallScreen } from './PaywallScreen'

// TODO: add full a11y + variant tests
describe('PaywallScreen', () => {
  it('renders without throwing', () => {
    expect(() => render(<PaywallScreen />)).not.toThrow()
  })
})
