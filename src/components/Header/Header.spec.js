import { screen, render } from '@testing-library/react'
import Header from './Header'

describe('EndTime', () => {
  it('renders the Header text as defined', () => {
    render(<Header text="Welcome" />)
    expect(screen.getByText('Welcome')).toBeInTheDocument()
  })
})
