import { render } from '@testing-library/react'
import { LineChart } from './LineChart'

// TODO: add full a11y + variant tests
describe('LineChart', () => {
  it('renders without throwing', () => {
    expect(() => render(<LineChart />)).not.toThrow()
  })
})
