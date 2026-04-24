import { render } from '@testing-library/react'
import { Text } from './Text'

// TODO: add full a11y + variant tests
describe('Text', () => {
  it('renders without throwing', () => {
    expect(() => render(<Text />)).not.toThrow()
  })
})
