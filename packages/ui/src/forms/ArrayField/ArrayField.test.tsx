import { render } from '@testing-library/react'
import { ArrayField } from './ArrayField'

// TODO: add full a11y + variant tests
describe('ArrayField', () => {
  it('renders without throwing', () => {
    expect(() => render(<ArrayField />)).not.toThrow()
  })
})
