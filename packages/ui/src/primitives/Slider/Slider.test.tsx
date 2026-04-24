import { render } from '@testing-library/react'
import { Slider } from './Slider'

// TODO: add full a11y + variant tests
describe('Slider', () => {
  it('renders without throwing', () => {
    expect(() => render(<Slider />)).not.toThrow()
  })
})
