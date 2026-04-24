import { render } from '@testing-library/react'
import { Stepper } from './Stepper'

// TODO: add full a11y + variant tests
describe('Stepper', () => {
  it('renders without throwing', () => {
    expect(() => render(<Stepper />)).not.toThrow()
  })
})
