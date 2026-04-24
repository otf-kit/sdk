import { render } from '@testing-library/react'
import { OrganizationMenu } from './OrganizationMenu'

// TODO: add full a11y + variant tests
describe('OrganizationMenu', () => {
  it('renders without throwing', () => {
    expect(() => render(<OrganizationMenu />)).not.toThrow()
  })
})
