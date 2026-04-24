import { render } from '@testing-library/react'
import { ScrollArea } from './ScrollArea'

// TODO: add full a11y + variant tests
describe('ScrollArea', () => {
  it('renders without throwing', () => {
    expect(() => render(<ScrollArea />)).not.toThrow()
  })
})
