import { render } from '@testing-library/react'
import { MessagesCard } from './MessagesCard'

// TODO: add full a11y + variant tests
describe('MessagesCard', () => {
  it('renders without throwing', () => {
    expect(() => render(<MessagesCard />)).not.toThrow()
  })
})
