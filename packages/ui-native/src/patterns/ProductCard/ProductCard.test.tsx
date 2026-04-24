import { render } from '@testing-library/react'
import { ProductCard } from './ProductCard'

// TODO: add full a11y + variant tests
describe('ProductCard', () => {
  it('renders without throwing', () => {
    expect(() => render(<ProductCard />)).not.toThrow()
  })
})
