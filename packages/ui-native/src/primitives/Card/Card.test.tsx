import { render } from '@testing-library/react'
import { Card } from './Card'

// TODO: add full a11y + variant tests
describe('Card', () => {
  it('renders without throwing', () => {
    expect(() => render(<Card />)).not.toThrow()
  })
})
