import { render } from '@testing-library/react'
import { Divider } from './Divider'

// TODO: add full a11y + variant tests
describe('Divider', () => {
  it('renders without throwing', () => {
    expect(() => render(<Divider />)).not.toThrow()
  })
})
