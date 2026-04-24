import { render } from '@testing-library/react'
import { SwipeableRow } from './SwipeableRow'

// TODO: add full a11y + variant tests
describe('SwipeableRow', () => {
  it('renders without throwing', () => {
    expect(() => render(<SwipeableRow />)).not.toThrow()
  })
})
