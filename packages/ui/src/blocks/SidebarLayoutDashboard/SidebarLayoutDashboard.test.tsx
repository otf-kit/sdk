import { render } from '@testing-library/react'
import { SidebarLayoutDashboard } from './SidebarLayoutDashboard'

// TODO: add full a11y + variant tests
describe('SidebarLayoutDashboard', () => {
  it('renders without throwing', () => {
    expect(() => render(<SidebarLayoutDashboard />)).not.toThrow()
  })
})
