import { render } from '@testing-library/react'
import { Tooltip } from './Tooltip'

// TODO: add full a11y + variant tests
describe('Tooltip', () => {
  it('renders without throwing', () => {
    expect(() => render(<Tooltip />)).not.toThrow()
  })
})
