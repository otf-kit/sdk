import { render } from '@testing-library/react'
import { Navbar } from './Navbar'

// TODO: add full a11y + variant tests
describe('Navbar', () => {
  it('renders without throwing', () => {
    expect(() => render(<Navbar />)).not.toThrow()
  })
})
