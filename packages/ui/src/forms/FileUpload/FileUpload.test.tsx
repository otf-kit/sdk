import { render } from '@testing-library/react'
import { FileUpload } from './FileUpload'

// TODO: add full a11y + variant tests
describe('FileUpload', () => {
  it('renders without throwing', () => {
    expect(() => render(<FileUpload />)).not.toThrow()
  })
})
