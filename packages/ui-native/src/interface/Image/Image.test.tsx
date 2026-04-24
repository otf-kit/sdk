import { render } from '@testing-library/react'
import { Image } from './Image'

// TODO: add full a11y + variant tests
describe('Image', () => {
  it('renders without throwing', () => {
    expect(() => render(<Image />)).not.toThrow()
  })
})
