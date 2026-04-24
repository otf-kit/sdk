import { render } from '@testing-library/react'
import { NavigationMenu } from './NavigationMenu'

// TODO: add full a11y + variant tests
describe('NavigationMenu', () => {
  it('renders without throwing', () => {
    expect(() => render(<NavigationMenu />)).not.toThrow()
  })
})
