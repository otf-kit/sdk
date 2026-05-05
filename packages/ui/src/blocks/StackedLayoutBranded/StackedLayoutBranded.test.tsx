import { render } from '@testing-library/react'
import { StackedLayoutBranded } from './StackedLayoutBranded'

// TODO: add full a11y + variant tests
describe('StackedLayoutBranded', () => {
  it('renders without throwing', () => {
    expect(() => render(<StackedLayoutBranded />)).not.toThrow()
  })
})
