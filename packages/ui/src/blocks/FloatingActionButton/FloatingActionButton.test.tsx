import { render, screen, fireEvent } from '@testing-library/react'
import { FloatingActionButton, FloatingThemePicker } from './FloatingActionButton'

describe('FloatingActionButton', () => {
  it('renders the FAB trigger without throwing', () => {
    expect(() =>
      render(<FloatingActionButton label="Open panel" sections={[]} />)
    ).not.toThrow()
  })

  it('shows the FAB button with aria-label', () => {
    render(<FloatingActionButton label="Open panel" sections={[]} />)
    expect(screen.getByRole('button', { name: /open panel/i })).toBeInTheDocument()
  })

  it('opens the panel when FAB is clicked', () => {
    render(
      <FloatingActionButton
        label="Open panel"
        title="My Panel"
        sections={[{ label: 'Section', content: <span>Hello</span> }]}
      />
    )
    fireEvent.click(screen.getByRole('button', { name: /open panel/i }))
    expect(screen.getByText('My Panel')).toBeInTheDocument()
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })
})

describe('FloatingThemePicker', () => {
  it('renders without throwing', () => {
    expect(() => render(<FloatingThemePicker />)).not.toThrow()
  })

  it('shows the FAB button with aria-label', () => {
    render(<FloatingThemePicker />)
    expect(screen.getByRole('button', { name: /open theme picker/i })).toBeInTheDocument()
  })

  it('opens the appearance panel when FAB is clicked', () => {
    render(<FloatingThemePicker />)
    fireEvent.click(screen.getByRole('button', { name: /open theme picker/i }))
    expect(screen.getByText('Appearance')).toBeInTheDocument()
  })

  // TODO: add tests for palette switching, mode switching, localStorage persistence
})
