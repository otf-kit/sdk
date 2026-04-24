import { render } from '@testing-library/react'
import { Beacon } from './Beacon'

// TODO: add full a11y + variant tests
describe('Beacon', () => {
  it('renders without throwing', () => {
    expect(() => render(<Beacon />)).not.toThrow()
  })
})
