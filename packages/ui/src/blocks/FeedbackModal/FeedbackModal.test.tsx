import { render } from '@testing-library/react'
import { FeedbackModal } from './FeedbackModal'

// TODO: add full a11y + variant tests
describe('FeedbackModal', () => {
  it('renders without throwing', () => {
    expect(() => render(<FeedbackModal />)).not.toThrow()
  })
})
