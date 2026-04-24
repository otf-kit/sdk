import { render } from '@testing-library/react'
import { Headings } from './Headings'

// TODO: add full a11y + variant tests
describe('Headings', () => {
  it('renders without throwing', () => {
    expect(() => render(<Headings />)).not.toThrow()
  })
})
