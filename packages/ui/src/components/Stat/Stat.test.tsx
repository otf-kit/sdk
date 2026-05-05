import { render } from '@testing-library/react'
import { Stat } from './Stat'

// TODO: add full a11y + variant tests
describe('Stat', () => {
  it('renders without throwing', () => {
    expect(() => render(<Stat />)).not.toThrow()
  })
})
