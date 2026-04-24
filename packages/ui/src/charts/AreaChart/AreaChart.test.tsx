import { render } from '@testing-library/react'
import { AreaChart } from './AreaChart'

// TODO: add full a11y + variant tests
describe('AreaChart', () => {
  it('renders without throwing', () => {
    expect(() => render(<AreaChart />)).not.toThrow()
  })
})
