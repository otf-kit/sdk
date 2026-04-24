import { render } from '@testing-library/react'
import { SidebarLayoutMinimal } from './SidebarLayoutMinimal'

// TODO: add full a11y + variant tests
describe('SidebarLayoutMinimal', () => {
  it('renders without throwing', () => {
    expect(() => render(<SidebarLayoutMinimal />)).not.toThrow()
  })
})
