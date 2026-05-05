import { render } from '@testing-library/react'
import { StructuredList } from './StructuredList'

// TODO: add full a11y + variant tests
describe('StructuredList', () => {
  it('renders without throwing', () => {
    expect(() => render(<StructuredList />)).not.toThrow()
  })
})
