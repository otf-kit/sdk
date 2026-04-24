import { render } from '@testing-library/react'
import { ProgressSteps } from './ProgressSteps'

// TODO: add full a11y + variant tests
describe('ProgressSteps', () => {
  it('renders without throwing', () => {
    expect(() => render(<ProgressSteps />)).not.toThrow()
  })
})
