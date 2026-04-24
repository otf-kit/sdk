import { render } from '@testing-library/react'
import { Collapsible } from './Collapsible'

// TODO: add full a11y + variant tests
describe('Collapsible', () => {
  it('renders without throwing', () => {
    expect(() => render(<Collapsible />)).not.toThrow()
  })
})
