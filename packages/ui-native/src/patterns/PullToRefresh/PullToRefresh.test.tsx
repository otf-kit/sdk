import { render } from '@testing-library/react'
import { PullToRefresh } from './PullToRefresh'

// TODO: add full a11y + variant tests
describe('PullToRefresh', () => {
  it('renders without throwing', () => {
    expect(() => render(<PullToRefresh />)).not.toThrow()
  })
})
