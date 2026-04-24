import { render } from '@testing-library/react'
import { Breadcrumb } from './Breadcrumb'

// TODO: add full a11y + variant tests
describe('Breadcrumb', () => {
  it('renders without throwing', () => {
    expect(() => render(<Breadcrumb />)).not.toThrow()
  })
})
