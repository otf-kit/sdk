import { render } from '@testing-library/react'
import { ListItem } from './ListItem'

// TODO: add full a11y + variant tests
describe('ListItem', () => {
  it('renders without throwing', () => {
    expect(() => render(<ListItem />)).not.toThrow()
  })
})
