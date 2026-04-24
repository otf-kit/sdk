import { render } from '@testing-library/react'
import { Menubar } from './Menubar'

// TODO: add full a11y + variant tests
describe('Menubar', () => {
  it('renders without throwing', () => {
    expect(() => render(<Menubar />)).not.toThrow()
  })
})
