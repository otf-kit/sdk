import { render } from '@testing-library/react'
import { FloatingActionButton } from './FloatingActionButton'

// TODO: add full a11y + variant tests
describe('FloatingActionButton', () => {
  it('renders without throwing', () => {
    expect(() => render(<FloatingActionButton />)).not.toThrow()
  })
})
