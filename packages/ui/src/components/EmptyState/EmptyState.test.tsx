import { render } from '@testing-library/react'
import { EmptyState } from './EmptyState'

// TODO: add full a11y + variant tests
describe('EmptyState', () => {
  it('renders without throwing', () => {
    expect(() => render(<EmptyState />)).not.toThrow()
  })
})
