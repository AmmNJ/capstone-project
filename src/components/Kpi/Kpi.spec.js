import { screen, render } from '@testing-library/react'
import Kpi from './Kpi'

describe('Kpi', () => {
  it('renders the kpi entity as a string and an info text', () => {
    render(<Kpi value={8 + 'h'} info={'Average per Day'} />)
    expect(screen.getByText('8h')).toBeInTheDocument()
    expect(screen.getByText('Average per Day')).toBeInTheDocument()
  })
})
