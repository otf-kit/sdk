import { render } from '@testing-library/react'
import { Textarea } from './Textarea'

// TODO: add full a11y + variant tests
describe('Textarea', () => {
  it('renders without throwing', () => {
    expect(() => render(<Textarea />)).not.toThrow()
  })
})
