import { render } from '@testing-library/react'
import { TestimonialCard } from './TestimonialCard'

// TODO: add full a11y + variant tests
describe('TestimonialCard', () => {
  it('renders without throwing', () => {
    expect(() => render(<TestimonialCard />)).not.toThrow()
  })
})
