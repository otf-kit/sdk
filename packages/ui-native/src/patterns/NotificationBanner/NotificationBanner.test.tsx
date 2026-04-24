import { render } from '@testing-library/react'
import { NotificationBanner } from './NotificationBanner'

// TODO: add full a11y + variant tests
describe('NotificationBanner', () => {
  it('renders without throwing', () => {
    expect(() => render(<NotificationBanner />)).not.toThrow()
  })
})
