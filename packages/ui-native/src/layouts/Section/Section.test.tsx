import { render } from '@testing-library/react'
import { Section } from './Section'

// TODO: add full a11y + variant tests
describe('Section', () => {
  it('renders without throwing', () => {
    expect(() => render(<Section />)).not.toThrow()
  })
})
