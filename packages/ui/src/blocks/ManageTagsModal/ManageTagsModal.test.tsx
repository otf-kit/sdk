import { render } from '@testing-library/react'
import { ManageTagsModal } from './ManageTagsModal'

// TODO: add full a11y + variant tests
describe('ManageTagsModal', () => {
  it('renders without throwing', () => {
    expect(() => render(<ManageTagsModal />)).not.toThrow()
  })
})
