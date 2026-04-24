import { render } from '@testing-library/react'
import { BottomSheet } from './BottomSheet'

// TODO: add full a11y + variant tests
describe('BottomSheet', () => {
  it('renders without throwing', () => {
    expect(() => render(<BottomSheet />)).not.toThrow()
  })
})
