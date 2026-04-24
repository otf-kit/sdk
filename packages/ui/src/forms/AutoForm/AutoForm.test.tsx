import { render } from '@testing-library/react'
import { AutoForm } from './AutoForm'

// TODO: add full a11y + variant tests
describe('AutoForm', () => {
  it('renders without throwing', () => {
    expect(() => render(<AutoForm />)).not.toThrow()
  })
})
