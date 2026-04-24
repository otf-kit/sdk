import { render } from '@testing-library/react'
import { PropertyList } from './PropertyList'

// TODO: add full a11y + variant tests
describe('PropertyList', () => {
  it('renders without throwing', () => {
    expect(() => render(<PropertyList />)).not.toThrow()
  })
})
