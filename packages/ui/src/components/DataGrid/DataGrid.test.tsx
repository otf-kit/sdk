import { render } from '@testing-library/react'
import { DataGrid } from './DataGrid'

// TODO: add full a11y + variant tests
describe('DataGrid', () => {
  it('renders without throwing', () => {
    expect(() => render(<DataGrid />)).not.toThrow()
  })
})
