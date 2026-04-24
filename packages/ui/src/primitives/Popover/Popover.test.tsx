import { render } from '@testing-library/react'
import { Popover } from './Popover'

// TODO: add full a11y + variant tests
describe('Popover', () => {
  it('renders without throwing', () => {
    expect(() => render(<Popover />)).not.toThrow()
  })
})
