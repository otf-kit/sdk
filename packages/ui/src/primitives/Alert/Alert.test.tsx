import { render } from '@testing-library/react'
import { Alert } from './Alert'

// TODO: add full a11y + variant tests
describe('Alert', () => {
  it('renders without throwing', () => {
    expect(() => render(<Alert />)).not.toThrow()
  })
})
