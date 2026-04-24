import { render } from '@testing-library/react'
import { Timeline } from './Timeline'

// TODO: add full a11y + variant tests
describe('Timeline', () => {
  it('renders without throwing', () => {
    expect(() => render(<Timeline />)).not.toThrow()
  })
})
