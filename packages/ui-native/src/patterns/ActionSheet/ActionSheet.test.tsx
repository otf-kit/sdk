import { render } from '@testing-library/react'
import { ActionSheet } from './ActionSheet'

// TODO: add full a11y + variant tests
describe('ActionSheet', () => {
  it('renders without throwing', () => {
    expect(() => render(<ActionSheet />)).not.toThrow()
  })
})
