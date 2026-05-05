import { render } from '@testing-library/react'
import { Button } from './Button'

// TODO: add full a11y + variant tests
describe('Button', () => {
  it('renders without throwing', () => {
    expect(() => render(<Button />)).not.toThrow()
  })
})
