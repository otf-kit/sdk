import { render } from '@testing-library/react'
import { SidebarLayoutGroups } from './SidebarLayoutGroups'

// TODO: add full a11y + variant tests
describe('SidebarLayoutGroups', () => {
  it('renders without throwing', () => {
    expect(() => render(<SidebarLayoutGroups />)).not.toThrow()
  })
})
