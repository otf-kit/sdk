import { render } from '@testing-library/react'
import { Stack } from './Stack'

// TODO: add full a11y + variant tests
describe('Stack', () => {
  it('renders without throwing', () => {
    expect(() => render(<Stack />)).not.toThrow()
  })
})
