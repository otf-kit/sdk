import { render } from '@testing-library/react'
import { Chip } from './Chip'

// TODO: add full a11y + variant tests
describe('Chip', () => {
  it('renders without throwing', () => {
    expect(() => render(<Chip />)).not.toThrow()
  })
})
