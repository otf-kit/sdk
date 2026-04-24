import { render } from '@testing-library/react'
import { ChatDetail } from './ChatDetail'

// TODO: add full a11y + variant tests
describe('ChatDetail', () => {
  it('renders without throwing', () => {
    expect(() => render(<ChatDetail />)).not.toThrow()
  })
})
