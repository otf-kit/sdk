import { render } from '@testing-library/react'
import { AvatarGroup } from './AvatarGroup'

// TODO: add full a11y + variant tests
describe('AvatarGroup', () => {
  it('renders without throwing', () => {
    expect(() => render(<AvatarGroup />)).not.toThrow()
  })
})
