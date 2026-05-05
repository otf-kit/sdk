import { render } from '@testing-library/react'
import { Label } from './Label'

// TODO: add full a11y + variant tests
describe('Label', () => {
  it('renders without throwing', () => {
    expect(() => render(<Label />)).not.toThrow()
  })
})
