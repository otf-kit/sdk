import { render } from '@testing-library/react'
import { Field } from './Field'

// TODO: add full a11y + variant tests
describe('Field', () => {
  it('renders without throwing', () => {
    expect(() => render(<Field />)).not.toThrow()
  })
})
