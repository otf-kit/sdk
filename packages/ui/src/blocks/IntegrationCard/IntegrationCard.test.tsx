import { render } from '@testing-library/react'
import { IntegrationCard } from './IntegrationCard'

// TODO: add full a11y + variant tests
describe('IntegrationCard', () => {
  it('renders without throwing', () => {
    expect(() => render(<IntegrationCard />)).not.toThrow()
  })
})
