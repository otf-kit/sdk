import { render } from '@testing-library/react'
import { Select } from './Select'

// TODO: add full a11y + variant tests
describe('Select', () => {
  it('renders without throwing', () => {
    expect(() => render(<Select />)).not.toThrow()
  })
})
