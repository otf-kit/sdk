import { render } from '@testing-library/react'
import { LoginScreen } from './LoginScreen'

// TODO: add full a11y + variant tests
describe('LoginScreen', () => {
  it('renders without throwing', () => {
    expect(() => render(<LoginScreen />)).not.toThrow()
  })
})
