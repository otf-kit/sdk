import { render } from '@testing-library/react'
import { BulkActions } from './BulkActions'

// TODO: add full a11y + variant tests
describe('BulkActions', () => {
  it('renders without throwing', () => {
    expect(() => render(<BulkActions />)).not.toThrow()
  })
})
