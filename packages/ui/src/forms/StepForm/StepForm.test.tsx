import { render } from '@testing-library/react'
import { StepForm } from './StepForm'

// TODO: add full a11y + variant tests
describe('StepForm', () => {
  it('renders without throwing', () => {
    expect(() => render(<StepForm />)).not.toThrow()
  })
})
