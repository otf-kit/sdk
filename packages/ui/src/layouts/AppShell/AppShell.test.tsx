import { render } from '@testing-library/react'
import { AppShell } from './AppShell'

// TODO: add full a11y + variant tests
describe('AppShell', () => {
  it('renders without throwing', () => {
    expect(() => render(<AppShell />)).not.toThrow()
  })
})
