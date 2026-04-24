import { render } from '@testing-library/react'
import { StepPageLayout } from './StepPageLayout'

// TODO: add full a11y + variant tests
describe('StepPageLayout', () => {
  it('renders without throwing', () => {
    expect(() => render(<StepPageLayout />)).not.toThrow()
  })
})
