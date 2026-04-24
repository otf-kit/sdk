import { render } from '@testing-library/react'
import { Toaster } from './Toaster'

// TODO: add full a11y + variant tests
describe('Toaster', () => {
  it('renders without throwing', () => {
    expect(() => render(<Toaster />)).not.toThrow()
  })
})
