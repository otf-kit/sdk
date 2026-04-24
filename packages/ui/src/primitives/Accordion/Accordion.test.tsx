import { render } from '@testing-library/react'
import { Accordion } from './Accordion'

// TODO: add full a11y + variant tests
describe('Accordion', () => {
  it('renders without throwing', () => {
    expect(() => render(<Accordion />)).not.toThrow()
  })
})
