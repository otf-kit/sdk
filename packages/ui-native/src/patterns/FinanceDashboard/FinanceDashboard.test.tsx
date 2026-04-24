import { render } from '@testing-library/react'
import { FinanceDashboard } from './FinanceDashboard'

// TODO: add full a11y + variant tests
describe('FinanceDashboard', () => {
  it('renders without throwing', () => {
    expect(() => render(<FinanceDashboard />)).not.toThrow()
  })
})
