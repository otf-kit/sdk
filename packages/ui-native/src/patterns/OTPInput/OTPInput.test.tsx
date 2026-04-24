import { render } from '@testing-library/react'
import { OTPInput } from './OTPInput'

// TODO: add full a11y + variant tests
describe('OTPInput', () => {
  it('renders without throwing', () => {
    expect(() => render(<OTPInput />)).not.toThrow()
  })
})
