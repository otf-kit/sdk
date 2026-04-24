import { render } from '@testing-library/react'
import { ImmersiveMediaScreen } from './ImmersiveMediaScreen'

// TODO: add full a11y + variant tests
describe('ImmersiveMediaScreen', () => {
  it('renders without throwing', () => {
    expect(() => render(<ImmersiveMediaScreen />)).not.toThrow()
  })
})
