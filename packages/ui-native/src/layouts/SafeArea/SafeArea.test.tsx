import { render } from '@testing-library/react'
import { SafeArea } from './SafeArea'

// TODO: add full a11y + variant tests
describe('SafeArea', () => {
  it('renders without throwing', () => {
    expect(() => render(<SafeArea />)).not.toThrow()
  })
})
