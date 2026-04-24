import { render } from '@testing-library/react'
import { Dialog } from './Dialog'

// TODO: add full a11y + variant tests
describe('Dialog', () => {
  it('renders without throwing', () => {
    expect(() => render(<Dialog />)).not.toThrow()
  })
})
