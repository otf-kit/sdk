import { render } from '@testing-library/react'
import { OtfSelect } from './OtfSelect'

// TODO: add full a11y + variant tests
describe('OtfSelect', () => {
  it('renders without throwing', () => {
    expect(() => render(<OtfSelect />)).not.toThrow()
  })
})
