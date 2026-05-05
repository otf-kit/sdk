import { render } from '@testing-library/react'
import { Checkbox } from './Checkbox'

// TODO: add full a11y + variant tests
describe('Checkbox', () => {
  it('renders without throwing', () => {
    expect(() => render(<Checkbox />)).not.toThrow()
  })
})
