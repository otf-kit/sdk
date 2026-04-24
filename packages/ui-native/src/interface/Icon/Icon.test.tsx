import { render } from '@testing-library/react'
import { Icon } from './Icon'

// TODO: add full a11y + variant tests
describe('Icon', () => {
  it('renders without throwing', () => {
    expect(() => render(<Icon />)).not.toThrow()
  })
})
