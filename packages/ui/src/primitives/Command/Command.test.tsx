import { render } from '@testing-library/react'
import { Command } from './Command'

// TODO: add full a11y + variant tests
describe('Command', () => {
  it('renders without throwing', () => {
    expect(() => render(<Command />)).not.toThrow()
  })
})
