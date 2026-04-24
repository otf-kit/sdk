import { render } from '@testing-library/react'
import { UserPreferences } from './UserPreferences'

// TODO: add full a11y + variant tests
describe('UserPreferences', () => {
  it('renders without throwing', () => {
    expect(() => render(<UserPreferences />)).not.toThrow()
  })
})
