import { render } from '@testing-library/react'
import { ConfirmDialog } from './ConfirmDialog'

// TODO: add full a11y + variant tests
describe('ConfirmDialog', () => {
  it('renders without throwing', () => {
    expect(() => render(<ConfirmDialog />)).not.toThrow()
  })
})
