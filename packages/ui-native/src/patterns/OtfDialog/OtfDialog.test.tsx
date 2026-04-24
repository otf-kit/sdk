import { render } from '@testing-library/react'
import { OtfDialog } from './OtfDialog'

// TODO: add full a11y + variant tests
describe('OtfDialog', () => {
  it('renders without throwing', () => {
    expect(() => render(<OtfDialog />)).not.toThrow()
  })
})
