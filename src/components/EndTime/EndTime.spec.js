import { screen, render } from '@testing-library/react'
import EndTime from './EndTime'

describe('EndTime', () => {
  it('renders the prospective time for the end of the countdown', () => {
    render(<EndTime endHours={8} endMinutes={10} />)
    expect(screen.getByText('08:10')).toBeInTheDocument()
  })
})
