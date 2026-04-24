import { render } from '@testing-library/react'
import { AlertDialog } from './AlertDialog'

// TODO: add full a11y + variant tests
describe('AlertDialog', () => {
  it('renders without throwing', () => {
    expect(() => render(<AlertDialog />)).not.toThrow()
  })
})
