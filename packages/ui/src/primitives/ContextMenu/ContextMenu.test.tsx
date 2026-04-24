import { render } from '@testing-library/react'
import { ContextMenu } from './ContextMenu'

// TODO: add full a11y + variant tests
describe('ContextMenu', () => {
  it('renders without throwing', () => {
    expect(() => render(<ContextMenu />)).not.toThrow()
  })
})
