import { screen, render } from '@testing-library/react'
import DisplayTimerEnd from './DisplayTimerEnd'

describe('DisplayTimerEnd', () => {
  it('renders the prospective time for the end of the countdown', () => {
    render(<DisplayTimerEnd endHrs={8} endMin={10} />)
    expect(screen.getByText('08:10')).toBeInTheDocument()
  })
})
