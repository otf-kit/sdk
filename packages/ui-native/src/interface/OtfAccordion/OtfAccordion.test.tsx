import { render } from '@testing-library/react'
import { OtfAccordion } from './OtfAccordion'

// TODO: add full a11y + variant tests
describe('OtfAccordion', () => {
  it('renders without throwing', () => {
    expect(() => render(<OtfAccordion />)).not.toThrow()
  })
})
