import { render } from '@testing-library/react'
import { Table } from './Table'

// TODO: add full a11y + variant tests
describe('Table', () => {
  it('renders without throwing', () => {
    expect(() => render(<Table />)).not.toThrow()
  })
})
