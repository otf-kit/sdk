import { render } from '@testing-library/react'
import { Badge } from './Badge'

// TODO: add full a11y + variant tests
describe('Badge', () => {
  it('renders without throwing', () => {
    expect(() => render(<Badge />)).not.toThrow()
  })
})
