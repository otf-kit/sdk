import { render } from '@testing-library/react'
import { Resizable } from './Resizable'

// TODO: add full a11y + variant tests
describe('Resizable', () => {
  it('renders without throwing', () => {
    expect(() => render(<Resizable />)).not.toThrow()
  })
})
