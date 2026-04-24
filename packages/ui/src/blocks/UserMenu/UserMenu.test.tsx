import { render } from '@testing-library/react'
import { UserMenu } from './UserMenu'

// TODO: add full a11y + variant tests
describe('UserMenu', () => {
  it('renders without throwing', () => {
    expect(() => render(<UserMenu />)).not.toThrow()
  })
})
