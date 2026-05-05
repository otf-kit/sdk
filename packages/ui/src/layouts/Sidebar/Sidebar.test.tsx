import { render } from '@testing-library/react'
import { Sidebar } from './Sidebar'

// TODO: add full a11y + variant tests
describe('Sidebar', () => {
  it('renders without throwing', () => {
    expect(() => render(<Sidebar />)).not.toThrow()
  })
})
