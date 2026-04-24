import { render } from '@testing-library/react'
import { Tour } from './Tour'

// TODO: add full a11y + variant tests
describe('Tour', () => {
  it('renders without throwing', () => {
    expect(() => render(<Tour />)).not.toThrow()
  })
})
