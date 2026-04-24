import { render } from '@testing-library/react'
import { Banner } from './Banner'

// TODO: add full a11y + variant tests
describe('Banner', () => {
  it('renders without throwing', () => {
    expect(() => render(<Banner />)).not.toThrow()
  })
})
