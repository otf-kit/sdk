import { render } from '@testing-library/react'
import { ScreenLayout } from './ScreenLayout'

// TODO: add full a11y + variant tests
describe('ScreenLayout', () => {
  it('renders without throwing', () => {
    expect(() => render(<ScreenLayout />)).not.toThrow()
  })
})
