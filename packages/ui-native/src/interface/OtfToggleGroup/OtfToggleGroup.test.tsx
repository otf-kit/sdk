import { render } from '@testing-library/react'
import { OtfToggleGroup } from './OtfToggleGroup'

// TODO: add full a11y + variant tests
describe('OtfToggleGroup', () => {
  it('renders without throwing', () => {
    expect(() => render(<OtfToggleGroup />)).not.toThrow()
  })
})
