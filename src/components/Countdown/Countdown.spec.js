import { screen, render } from '@testing-library/react'
import Countdown from './Countdown'

describe('Countdown', () => {
  it('renders the countdown display with given minutes and seconds', () => {
    render(<Countdown minutes={25} seconds={0} />)
    expect(screen.getByText('25:00')).toBeInTheDocument()
  })
})
