import { render } from '@testing-library/react'
import { Switch } from './Switch'

// TODO: add full a11y + variant tests
describe('Switch', () => {
  it('renders without throwing', () => {
    expect(() => render(<Switch />)).not.toThrow()
  })
})
