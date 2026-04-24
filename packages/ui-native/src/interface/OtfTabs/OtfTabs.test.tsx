import { render } from '@testing-library/react'
import { OtfTabs } from './OtfTabs'

// TODO: add full a11y + variant tests
describe('OtfTabs', () => {
  it('renders without throwing', () => {
    expect(() => render(<OtfTabs />)).not.toThrow()
  })
})
