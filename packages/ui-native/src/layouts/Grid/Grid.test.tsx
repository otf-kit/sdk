import { render } from '@testing-library/react'
import { Grid } from './Grid'

// TODO: add full a11y + variant tests
describe('Grid', () => {
  it('renders without throwing', () => {
    expect(() => render(<Grid />)).not.toThrow()
  })
})
