import { render } from '@testing-library/react'
import { MediaCard } from './MediaCard'

// TODO: add full a11y + variant tests
describe('MediaCard', () => {
  it('renders without throwing', () => {
    expect(() => render(<MediaCard />)).not.toThrow()
  })
})
