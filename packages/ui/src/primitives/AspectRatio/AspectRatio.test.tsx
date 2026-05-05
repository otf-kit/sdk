import { render } from '@testing-library/react'
import { AspectRatio } from './AspectRatio'

// TODO: add full a11y + variant tests
describe('AspectRatio', () => {
  it('renders without throwing', () => {
    expect(() => render(<AspectRatio />)).not.toThrow()
  })
})
