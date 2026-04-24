import { render } from '@testing-library/react'
import { DropdownMenu } from './DropdownMenu'

// TODO: add full a11y + variant tests
describe('DropdownMenu', () => {
  it('renders without throwing', () => {
    expect(() => render(<DropdownMenu />)).not.toThrow()
  })
})
