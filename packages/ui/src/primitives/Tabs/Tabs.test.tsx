import { render } from '@testing-library/react'
import { Tabs } from './Tabs'

// TODO: add full a11y + variant tests
describe('Tabs', () => {
  it('renders without throwing', () => {
    expect(() => render(<Tabs />)).not.toThrow()
  })
})
