import { render } from '@testing-library/react'
import { Drawer } from './Drawer'

// TODO: add full a11y + variant tests
describe('Drawer', () => {
  it('renders without throwing', () => {
    expect(() => render(<Drawer />)).not.toThrow()
  })
})
