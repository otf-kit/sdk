import { render } from '@testing-library/react'
import { HoverCard } from './HoverCard'

// TODO: add full a11y + variant tests
describe('HoverCard', () => {
  it('renders without throwing', () => {
    expect(() => render(<HoverCard />)).not.toThrow()
  })
})
