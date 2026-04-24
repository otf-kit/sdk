import { render } from '@testing-library/react'
import { SearchBar } from './SearchBar'

// TODO: add full a11y + variant tests
describe('SearchBar', () => {
  it('renders without throwing', () => {
    expect(() => render(<SearchBar />)).not.toThrow()
  })
})
