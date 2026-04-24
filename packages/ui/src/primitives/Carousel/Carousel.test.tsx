import { render } from '@testing-library/react'
import { Carousel } from './Carousel'

// TODO: add full a11y + variant tests
describe('Carousel', () => {
  it('renders without throwing', () => {
    expect(() => render(<Carousel />)).not.toThrow()
  })
})
