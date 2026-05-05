import { render } from '@testing-library/react'
import { ObjectField } from './ObjectField'

// TODO: add full a11y + variant tests
describe('ObjectField', () => {
  it('renders without throwing', () => {
    expect(() => render(<ObjectField />)).not.toThrow()
  })
})
