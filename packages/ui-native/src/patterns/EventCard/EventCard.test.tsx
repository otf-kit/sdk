import { render } from '@testing-library/react'
import { EventCard } from './EventCard'

// TODO: add full a11y + variant tests
describe('EventCard', () => {
  it('renders without throwing', () => {
    expect(() => render(<EventCard />)).not.toThrow()
  })
})
