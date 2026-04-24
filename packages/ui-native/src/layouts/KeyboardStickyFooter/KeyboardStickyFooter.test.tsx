import { render } from '@testing-library/react'
import { KeyboardStickyFooter } from './KeyboardStickyFooter'

// TODO: add full a11y + variant tests
describe('KeyboardStickyFooter', () => {
  it('renders without throwing', () => {
    expect(() => render(<KeyboardStickyFooter />)).not.toThrow()
  })
})
