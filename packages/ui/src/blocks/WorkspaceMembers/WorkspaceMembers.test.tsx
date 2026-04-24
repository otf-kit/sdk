import { render } from '@testing-library/react'
import { WorkspaceMembers } from './WorkspaceMembers'

// TODO: add full a11y + variant tests
describe('WorkspaceMembers', () => {
  it('renders without throwing', () => {
    expect(() => render(<WorkspaceMembers />)).not.toThrow()
  })
})
