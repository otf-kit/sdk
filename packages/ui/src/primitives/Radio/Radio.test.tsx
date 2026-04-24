import { render } from '@testing-library/react'
import { Radio } from './Radio'

// TODO: add full a11y + variant tests
describe('Radio', () => {
  it('renders without throwing', () => {
    expect(() => render(<Radio />)).not.toThrow()
  })
})
