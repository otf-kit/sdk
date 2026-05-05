import { render } from '@testing-library/react'
import { Avatar } from './Avatar'

// TODO: add full a11y + variant tests
describe('Avatar', () => {
  it('renders without throwing', () => {
    expect(() => render(<Avatar />)).not.toThrow()
  })
})
