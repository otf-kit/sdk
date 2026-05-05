import { render } from '@testing-library/react'
import { StackedLayoutTabs } from './StackedLayoutTabs'

// TODO: add full a11y + variant tests
describe('StackedLayoutTabs', () => {
  it('renders without throwing', () => {
    expect(() => render(<StackedLayoutTabs />)).not.toThrow()
  })
})
