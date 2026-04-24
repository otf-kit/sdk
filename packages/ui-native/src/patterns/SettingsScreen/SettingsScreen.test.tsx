import { render } from '@testing-library/react'
import { SettingsScreen } from './SettingsScreen'

// TODO: add full a11y + variant tests
describe('SettingsScreen', () => {
  it('renders without throwing', () => {
    expect(() => render(<SettingsScreen />)).not.toThrow()
  })
})
