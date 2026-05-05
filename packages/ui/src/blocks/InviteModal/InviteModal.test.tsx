import { render } from '@testing-library/react'
import { InviteModal } from './InviteModal'

// TODO: add full a11y + variant tests
describe('InviteModal', () => {
  it('renders without throwing', () => {
    expect(() => render(<InviteModal />)).not.toThrow()
  })
})
