import { render } from '@testing-library/react'
import { BarChart } from './BarChart'

// TODO: add full a11y + variant tests
describe('BarChart', () => {
  it('renders without throwing', () => {
    expect(() => render(<BarChart />)).not.toThrow()
  })
})
