import { render } from '@testing-library/react'
import { Progress } from './Progress'

// TODO: add full a11y + variant tests
describe('Progress', () => {
  it('renders without throwing', () => {
    expect(() => render(<Progress />)).not.toThrow()
  })
})
