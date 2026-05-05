import { render } from '@testing-library/react'
import { Kanban } from './Kanban'

// TODO: add full a11y + variant tests
describe('Kanban', () => {
  it('renders without throwing', () => {
    expect(() => render(<Kanban />)).not.toThrow()
  })
})
