import { render } from '@testing-library/react'
import { Container } from './Container'

// TODO: add full a11y + variant tests
describe('Container', () => {
  it('renders without throwing', () => {
    expect(() => render(<Container />)).not.toThrow()
  })
})
