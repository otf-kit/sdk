import { render } from '@testing-library/react'
import { Persona } from './Persona'

// TODO: add full a11y + variant tests
describe('Persona', () => {
  it('renders without throwing', () => {
    expect(() => render(<Persona />)).not.toThrow()
  })
})
