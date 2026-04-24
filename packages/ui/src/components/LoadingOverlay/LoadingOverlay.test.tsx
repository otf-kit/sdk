import { render } from '@testing-library/react'
import { LoadingOverlay } from './LoadingOverlay'

// TODO: add full a11y + variant tests
describe('LoadingOverlay', () => {
  it('renders without throwing', () => {
    expect(() => render(<LoadingOverlay />)).not.toThrow()
  })
})
