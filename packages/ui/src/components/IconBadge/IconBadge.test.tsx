import { render } from '@testing-library/react'
import { IconBadge } from './IconBadge'

// TODO: add full a11y + variant tests
describe('IconBadge', () => {
  it('renders without throwing', () => {
    expect(() => render(<IconBadge />)).not.toThrow()
  })
})
