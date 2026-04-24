import { render } from '@testing-library/react'
import { OtfPopover } from './OtfPopover'

// TODO: add full a11y + variant tests
describe('OtfPopover', () => {
  it('renders without throwing', () => {
    expect(() => render(<OtfPopover />)).not.toThrow()
  })
})
