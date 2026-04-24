import { render } from '@testing-library/react'
import { DataTable } from './DataTable'

// TODO: add full a11y + variant tests
describe('DataTable', () => {
  it('renders without throwing', () => {
    expect(() => render(<DataTable />)).not.toThrow()
  })
})
