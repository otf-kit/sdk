import { render } from '@testing-library/react'
import { RolesMenu } from './RolesMenu'

// TODO: add full a11y + variant tests
describe('RolesMenu', () => {
  it('renders without throwing', () => {
    expect(() => render(<RolesMenu />)).not.toThrow()
  })
})
