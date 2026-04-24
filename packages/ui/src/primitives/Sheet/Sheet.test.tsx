import { render } from '@testing-library/react'
import { Sheet } from './Sheet'

// TODO: add full a11y + variant tests
describe('Sheet', () => {
  it('renders without throwing', () => {
    expect(() => render(<Sheet />)).not.toThrow()
  })
})
