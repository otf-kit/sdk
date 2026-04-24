import { render } from '@testing-library/react'
import { Pressable } from './Pressable'

// TODO: add full a11y + variant tests
describe('Pressable', () => {
  it('renders without throwing', () => {
    expect(() => render(<Pressable />)).not.toThrow()
  })
})
