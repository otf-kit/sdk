import { render } from '@testing-library/react'
import { Sonner } from './Sonner'

// TODO: add full a11y + variant tests
describe('Sonner', () => {
  it('renders without throwing', () => {
    expect(() => render(<Sonner />)).not.toThrow()
  })
})
