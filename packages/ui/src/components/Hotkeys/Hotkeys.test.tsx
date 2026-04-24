import { render } from '@testing-library/react'
import { Hotkeys } from './Hotkeys'

// TODO: add full a11y + variant tests
describe('Hotkeys', () => {
  it('renders without throwing', () => {
    expect(() => render(<Hotkeys />)).not.toThrow()
  })
})
