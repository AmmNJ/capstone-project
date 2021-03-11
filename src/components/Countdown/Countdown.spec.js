import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Countdown from './Countdown'

jest.useFakeTimers()

describe('Countdown', () => {
  it('renders the countdown display and one button', () => {
    render(<Countdown />)
    expect(screen.getByText('25:00')).toBeInTheDocument()
    expect(screen.getAllByRole('button')).toHaveLength(1)
  })

  it('calls setTimeout by clicking the button', () => {
    render(<Countdown />)
    expect(setTimeout).toHaveBeenCalledTimes(0)
    userEvent.click(screen.getByRole('button'))
    expect(setTimeout).toHaveBeenCalledTimes(1)
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000)
  })

  it('does not call setTimeout function by clicking the button a second time, but does on a third time', () => {
    render(<Countdown />)
    const button = screen.getByRole('button')
    userEvent.click(button)
    userEvent.click(button)
    expect(setTimeout).toBeCalled()
    expect(setTimeout).toHaveBeenCalledTimes(1)
    userEvent.click(button)
    expect(setTimeout).toHaveBeenCalledTimes(2)
  })
})
