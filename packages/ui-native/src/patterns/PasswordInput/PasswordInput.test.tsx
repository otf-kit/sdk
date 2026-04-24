import { render } from '@testing-library/react'
import { PasswordInput } from './PasswordInput'

// TODO: add full a11y + variant tests
describe('PasswordInput', () => {
  it('renders without throwing', () => {
    expect(() => render(<PasswordInput />)).not.toThrow()
  })
})
