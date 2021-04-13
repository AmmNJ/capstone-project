import { screen, render } from '@testing-library/react'
import KpiBoard from './KpiBoard'

describe('KpiBoard', () => {
  const kpiData = {
    lastTenDaysAvg: 1.5,
    lastTenDaysTotal: 15,
    totalAvg: 2,
    total: 300,
  }
  it('renders the KpiBoard component with given data', () => {
    render(<KpiBoard kpiData={kpiData} />)
    expect(screen.getByText('1.5h')).toBeInTheDocument()
    expect(screen.getByText('15h')).toBeInTheDocument()
    expect(screen.getByText('2h')).toBeInTheDocument()
    expect(screen.getByText('300h')).toBeInTheDocument()
  })
})
