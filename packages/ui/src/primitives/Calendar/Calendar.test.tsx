import { render } from '@testing-library/react'
import { Calendar } from './Calendar'

// TODO: add full a11y + variant tests
describe('Calendar', () => {
  it('renders without throwing', () => {
    expect(() => render(<Calendar />)).not.toThrow()
  })
})
