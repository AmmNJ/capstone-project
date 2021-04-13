import { screen, render } from '@testing-library/react'
import Chart from './Chart'

describe('Chart', () => {
  const chartData = [
    { date: '2021/04/04', duration: 10000, weekday: 'Su', height: 1000 },
  ]
  const todayValue = '05h 34min'
  const timeFrame = '04/04 - 13/04'

  it('renders the kpi entity as a string and an info text', () => {
    render(
      <Chart
        chartData={chartData}
        todayValue={todayValue}
        timeFrame={timeFrame}
      />
    )
    expect(screen.getByText('05h 34min')).toBeInTheDocument()
    expect(screen.getByText('04/04 - 13/04')).toBeInTheDocument()
    expect(screen.getByText('Su')).toBeInTheDocument()
  })
})
