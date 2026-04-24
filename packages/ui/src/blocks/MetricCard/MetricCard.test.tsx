import { render } from '@testing-library/react'
import { MetricCard } from './MetricCard'

// TODO: add full a11y + variant tests
describe('MetricCard', () => {
  it('renders without throwing', () => {
    expect(() => render(<MetricCard />)).not.toThrow()
  })
})
