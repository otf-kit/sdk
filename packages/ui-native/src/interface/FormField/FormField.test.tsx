import { render } from '@testing-library/react'
import { FormField } from './FormField'

// TODO: add full a11y + variant tests
describe('FormField', () => {
  it('renders without throwing', () => {
    expect(() => render(<FormField />)).not.toThrow()
  })
})
