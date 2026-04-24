import { render } from '@testing-library/react'
import { Pagination } from './Pagination'

// TODO: add full a11y + variant tests
describe('Pagination', () => {
  it('renders without throwing', () => {
    expect(() => render(<Pagination />)).not.toThrow()
  })
})
