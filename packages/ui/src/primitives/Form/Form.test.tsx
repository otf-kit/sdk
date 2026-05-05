import { render } from '@testing-library/react'
import { Form } from './Form'

// TODO: add full a11y + variant tests
describe('Form', () => {
  it('renders without throwing', () => {
    expect(() => render(<Form />)).not.toThrow()
  })
})
