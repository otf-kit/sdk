import { render } from '@testing-library/react'
import { Page } from './Page'

// TODO: add full a11y + variant tests
describe('Page', () => {
  it('renders without throwing', () => {
    expect(() => render(<Page />)).not.toThrow()
  })
})
