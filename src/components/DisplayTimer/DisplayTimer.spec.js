import { screen, render } from '@testing-library/react'
import DisplayTimer from './DisplayTimer'

describe('DisplayTimer', () => {
  it('renders the countdown display with given minutes and seconds', () => {
    render(<DisplayTimer timerMin={25} timerSec={0} />)
    expect(screen.getByText('25:00')).toBeInTheDocument()
  })
})
