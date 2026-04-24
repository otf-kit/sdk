import { render } from '@testing-library/react'
import { BrandIcons } from './BrandIcons'

// TODO: add full a11y + variant tests
describe('BrandIcons', () => {
  it('renders without throwing', () => {
    expect(() => render(<BrandIcons />)).not.toThrow()
  })
})
