import { render } from '@testing-library/react'
import { PageContainer } from './PageContainer'

// TODO: add full a11y + variant tests
describe('PageContainer', () => {
  it('renders without throwing', () => {
    expect(() => render(<PageContainer />)).not.toThrow()
  })
})
