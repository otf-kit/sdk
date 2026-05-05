import { render } from '@testing-library/react'
import { SortableTaskList } from './SortableTaskList'

// TODO: add full a11y + variant tests
describe('SortableTaskList', () => {
  it('renders without throwing', () => {
    expect(() => render(<SortableTaskList />)).not.toThrow()
  })
})
