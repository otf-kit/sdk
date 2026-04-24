import { render } from '@testing-library/react'
import { TaskCard } from './TaskCard'

// TODO: add full a11y + variant tests
describe('TaskCard', () => {
  it('renders without throwing', () => {
    expect(() => render(<TaskCard />)).not.toThrow()
  })
})
