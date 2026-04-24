import { render } from '@testing-library/react'
import { SwipeCards } from './SwipeCards'

// TODO: add full a11y + variant tests
describe('SwipeCards', () => {
  it('renders without throwing', () => {
    expect(() => render(<SwipeCards />)).not.toThrow()
  })
})
