import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Countdown from './Countdown'

describe('Countdown', () => {
  const handleStart = jest.fn()

  it('renders the countdown display and one buttons', () => {
    render(<Countdown />)
    expect(screen.getByText('25:00')).toBeInTheDocument()
    expect(screen.getAllByRole('button')).toHaveLength(1)
  })

  it('calls handleStart when clicking the button', () => {
    render(<Countdown />)
    const button = screen.getByRole('button', { name: 'play-icon.svg' })
    userEvent.click(button)
    expect(handleStart).toHaveBeenCalled()
  })
})
