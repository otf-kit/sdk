import { render } from '@testing-library/react'
import { FilesList } from './FilesList'

// TODO: add full a11y + variant tests
describe('FilesList', () => {
  it('renders without throwing', () => {
    expect(() => render(<FilesList />)).not.toThrow()
  })
})
