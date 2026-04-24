import { render } from '@testing-library/react'
import { ProfileHeader } from './ProfileHeader'

// TODO: add full a11y + variant tests
describe('ProfileHeader', () => {
  it('renders without throwing', () => {
    expect(() => render(<ProfileHeader />)).not.toThrow()
  })
})
