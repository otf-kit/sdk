import { render } from '@testing-library/react'
import { CommandItem } from './CommandItem'

// TODO: add full a11y + variant tests
describe('CommandItem', () => {
  it('renders without throwing', () => {
    expect(() => render(<CommandItem />)).not.toThrow()
  })
})
