import { render } from '@testing-library/react'
import { NotificationSettings } from './NotificationSettings'

// TODO: add full a11y + variant tests
describe('NotificationSettings', () => {
  it('renders without throwing', () => {
    expect(() => render(<NotificationSettings />)).not.toThrow()
  })
})
