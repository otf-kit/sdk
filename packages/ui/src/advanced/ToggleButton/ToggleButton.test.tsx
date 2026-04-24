import { render } from '@testing-library/react'
import { ToggleButton } from './ToggleButton'

// TODO: add full a11y + variant tests
describe('ToggleButton', () => {
  it('renders without throwing', () => {
    expect(() => render(<ToggleButton />)).not.toThrow()
  })
})
