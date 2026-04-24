import { render } from '@testing-library/react'
import { PricingTable } from './PricingTable'

// TODO: add full a11y + variant tests
describe('PricingTable', () => {
  it('renders without throwing', () => {
    expect(() => render(<PricingTable />)).not.toThrow()
  })
})
