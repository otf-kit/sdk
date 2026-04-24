import { render } from '@testing-library/react'
import { Chart } from './Chart'

// TODO: add full a11y + variant tests
describe('Chart', () => {
  it('renders without throwing', () => {
    expect(() => render(<Chart />)).not.toThrow()
  })
})
