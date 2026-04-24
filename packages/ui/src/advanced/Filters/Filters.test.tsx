import { render } from '@testing-library/react'
import { Filters } from './Filters'

// TODO: add full a11y + variant tests
describe('Filters', () => {
  it('renders without throwing', () => {
    expect(() => render(<Filters />)).not.toThrow()
  })
})
