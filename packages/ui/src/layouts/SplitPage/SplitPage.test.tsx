import { render } from '@testing-library/react'
import { SplitPage } from './SplitPage'

// TODO: add full a11y + variant tests
describe('SplitPage', () => {
  it('renders without throwing', () => {
    expect(() => render(<SplitPage />)).not.toThrow()
  })
})
