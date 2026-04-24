import { render } from '@testing-library/react'
import { ChatBubble } from './ChatBubble'

// TODO: add full a11y + variant tests
describe('ChatBubble', () => {
  it('renders without throwing', () => {
    expect(() => render(<ChatBubble />)).not.toThrow()
  })
})
