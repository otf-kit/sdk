import { render } from '@testing-library/react'
import { CommandBar } from './CommandBar'

// TODO: add full a11y + variant tests
describe('CommandBar', () => {
  it('renders without throwing', () => {
    expect(() => render(<CommandBar />)).not.toThrow()
  })
})
