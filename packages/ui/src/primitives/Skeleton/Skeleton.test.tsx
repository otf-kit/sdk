import { render } from '@testing-library/react'
import { Skeleton } from './Skeleton'

// TODO: add full a11y + variant tests
describe('Skeleton', () => {
  it('renders without throwing', () => {
    expect(() => render(<Skeleton />)).not.toThrow()
  })
})
