import { render } from '@testing-library/react'
import { TabBar } from './TabBar'

// TODO: add full a11y + variant tests
describe('TabBar', () => {
  it('renders without throwing', () => {
    expect(() => render(<TabBar />)).not.toThrow()
  })
})
