import { render } from '@testing-library/react'
import { OnboardingCarousel } from './OnboardingCarousel'

// TODO: add full a11y + variant tests
describe('OnboardingCarousel', () => {
  it('renders without throwing', () => {
    expect(() => render(<OnboardingCarousel />)).not.toThrow()
  })
})
