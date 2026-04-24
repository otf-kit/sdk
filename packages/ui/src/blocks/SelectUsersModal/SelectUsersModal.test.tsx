import { render } from '@testing-library/react'
import { SelectUsersModal } from './SelectUsersModal'

// TODO: add full a11y + variant tests
describe('SelectUsersModal', () => {
  it('renders without throwing', () => {
    expect(() => render(<SelectUsersModal />)).not.toThrow()
  })
})
