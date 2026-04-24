import { render } from '@testing-library/react'
import { Separator } from './Separator'

// TODO: add full a11y + variant tests
describe('Separator', () => {
  it('renders without throwing', () => {
    expect(() => render(<Separator />)).not.toThrow()
  })
})
