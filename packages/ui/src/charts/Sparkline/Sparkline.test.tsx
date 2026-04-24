import { render } from '@testing-library/react'
import { Sparkline } from './Sparkline'

// TODO: add full a11y + variant tests
describe('Sparkline', () => {
  it('renders without throwing', () => {
    expect(() => render(<Sparkline />)).not.toThrow()
  })
})
