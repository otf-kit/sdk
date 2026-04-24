import { render } from '@testing-library/react'
import { SidebarLayoutSearch } from './SidebarLayoutSearch'

// TODO: add full a11y + variant tests
describe('SidebarLayoutSearch', () => {
  it('renders without throwing', () => {
    expect(() => render(<SidebarLayoutSearch />)).not.toThrow()
  })
})
