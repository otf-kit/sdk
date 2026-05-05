import { render } from '@testing-library/react'
import { SearchInput } from './SearchInput'

// TODO: add full a11y + variant tests
describe('SearchInput', () => {
  it('renders without throwing', () => {
    expect(() => render(<SearchInput />)).not.toThrow()
  })
})
