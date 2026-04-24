import { render } from '@testing-library/react'
import { SidebarLayoutUser } from './SidebarLayoutUser'

// TODO: add full a11y + variant tests
describe('SidebarLayoutUser', () => {
  it('renders without throwing', () => {
    expect(() => render(<SidebarLayoutUser />)).not.toThrow()
  })
})
