import { render } from '@testing-library/react'
import { Toggle } from './Toggle'

// TODO: add full a11y + variant tests
describe('Toggle', () => {
  it('renders without throwing', () => {
    expect(() => render(<Toggle />)).not.toThrow()
  })
})
