import { render } from '@testing-library/react'
import { OtfToast } from './OtfToast'

// TODO: add full a11y + variant tests
describe('OtfToast', () => {
  it('renders without throwing', () => {
    expect(() => render(<OtfToast />)).not.toThrow()
  })
})
