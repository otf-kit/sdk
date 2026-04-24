import { render } from '@testing-library/react'
import { AppHeader } from './AppHeader'

// TODO: add full a11y + variant tests
describe('AppHeader', () => {
  it('renders without throwing', () => {
    expect(() => render(<AppHeader />)).not.toThrow()
  })
})
