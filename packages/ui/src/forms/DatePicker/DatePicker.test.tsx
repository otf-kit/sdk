import { render } from '@testing-library/react'
import { DatePicker } from './DatePicker'

// TODO: add full a11y + variant tests
describe('DatePicker', () => {
  it('renders without throwing', () => {
    expect(() => render(<DatePicker />)).not.toThrow()
  })
})
