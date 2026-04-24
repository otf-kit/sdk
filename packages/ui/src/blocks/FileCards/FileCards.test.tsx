import { render } from '@testing-library/react'
import { FileCards } from './FileCards'

// TODO: add full a11y + variant tests
describe('FileCards', () => {
  it('renders without throwing', () => {
    expect(() => render(<FileCards />)).not.toThrow()
  })
})
