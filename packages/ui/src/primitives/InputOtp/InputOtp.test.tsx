import { render } from '@testing-library/react'
import { InputOtp } from './InputOtp'

// TODO: add full a11y + variant tests
describe('InputOtp', () => {
  it('renders without throwing', () => {
    expect(() => render(<InputOtp />)).not.toThrow()
  })
})
