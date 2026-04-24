import { render } from '@testing-library/react'
import { Spinner } from './Spinner'

// TODO: add full a11y + variant tests
describe('Spinner', () => {
  it('renders without throwing', () => {
    expect(() => render(<Spinner />)).not.toThrow()
  })
})
