import { render } from '@testing-library/react'
import { ResizeBox } from './ResizeBox'

// TODO: add full a11y + variant tests
describe('ResizeBox', () => {
  it('renders without throwing', () => {
    expect(() => render(<ResizeBox />)).not.toThrow()
  })
})
