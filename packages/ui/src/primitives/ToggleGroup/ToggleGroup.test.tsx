import { render } from '@testing-library/react'
import { ToggleGroup } from './ToggleGroup'

// TODO: add full a11y + variant tests
describe('ToggleGroup', () => {
  it('renders without throwing', () => {
    expect(() => render(<ToggleGroup />)).not.toThrow()
  })
})
