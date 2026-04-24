import { render } from '@testing-library/react'
import { Input } from './Input'

// TODO: add full a11y + variant tests
describe('Input', () => {
  it('renders without throwing', () => {
    expect(() => render(<Input />)).not.toThrow()
  })
})
