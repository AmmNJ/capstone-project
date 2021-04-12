import styled from 'styled-components/macro'
import Header from '../components/Header/Header'
import Chart from '../components/Chart/Chart'
import KpiBoard from '../components/KpiBoard/KpiBoard'
import { ReactComponent as ArrowLeftSVG } from '../assets/arrow-left.svg'
import { getMinValue, getDateValues } from '../services/dataManipulation'
import { toHoursMin, toHours } from '../services/time'
import { daysDifference } from '../services/date'
import { sumKeyData, roundOneDecimal } from '../services/math'

export default function HistoryScreen({
  chartData,
  historyData,
  navigateStart,
}) {
  return (
    <Grid>
      <ReturnArrow>
        <ArrowLeftSVG role="button" onClick={navigateStart} />
      </ReturnArrow>
      <HeaderGrid>
        <Header text="Productive history" />
      </HeaderGrid>
      <ChartGrid>
        <Chart
          chartData={chartData}
          todayValue={updateTodayValue(chartData)}
          timeFrame={updateTimeFrame(chartData)}
        />
      </ChartGrid>
      <KpiBoard kpiData={updateKpiData(historyData, chartData)} />
    </Grid>
  )

  function updateTodayValue(chartData) {
    return toHoursMin(chartData[chartData.length - 1].duration)
  }

  function updateTimeFrame(chartData) {
    const fromDate =
      chartData[0].date.slice(8, 10).padStart(2, '0') +
      '/' +
      chartData[0].date.slice(5, 7)

    const toDate =
      chartData[chartData.length - 1].date.slice(8, 10).padStart(2, '0') +
      '/' +
      chartData[chartData.length - 1].date.slice(5, 7)

    const timeFrameDisplay = fromDate + ' - ' + toDate

    return timeFrameDisplay
  }

  function updateKpiData(historyData, chartData) {
    const now = new Date()
    const startOfAppUsage = new Date(
      getMinValue(getDateValues(historyData, 'start'))
    )
    const daysOfAppUsage = daysDifference(startOfAppUsage, now)
    const totalHoursUsage = Math.round(
      toHours(sumKeyData(historyData, 'duration'))
    )
    const totalAvg = roundOneDecimal(totalHoursUsage / daysOfAppUsage)
    const lastTenDaysTotal = roundOneDecimal(
      toHours(sumKeyData(chartData, 'duration'))
    )
    const lastTenDaysAvg = roundOneDecimal(lastTenDaysTotal / chartData.length)

    const kpiData = {
      lastTenDaysAvg: lastTenDaysAvg,
      lastTenDaysTotal: lastTenDaysTotal,
      totalAvg: totalAvg,
      total: totalHoursUsage,
    }

    return kpiData
  }
}

const Grid = styled.main`
  display: grid;
  grid-template-rows: auto 1fr 1fr;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  padding: 70px 60px 60px;
`

const HeaderGrid = styled.section`
  display: grid;
  animation: slide-opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  padding: 0 0 50px;
  position: relative;
`

const ChartGrid = styled.section`
  display: grid;
  align-content: start;
  justify-content: center;
  animation: slide-opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  width: 100%;
  justify-content: stretch;
`

const ReturnArrow = styled.div`
  position: absolute;
  left: 34px;
  top: 34px;
  animation: slide-opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
`
