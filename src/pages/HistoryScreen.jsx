import styled from 'styled-components/macro'
import Header from '../components/Header/Header'
import Chart from '../components/Chart/Chart'
import { ReactComponent as ArrowLeftSVG } from '../assets/arrow-left.svg'

export default function HistoryScreen({
  chartData,
  todayValue,
  timeFrame,
  returnHomeScreen,
}) {
  return (
    <Grid>
      <ReturnArrow>
        <ArrowLeftSVG role="button" onClick={returnHomeScreen} />
      </ReturnArrow>
      <HeaderGrid>
        <Header text="Productive history" />
      </HeaderGrid>
      <ChartGrid>
        <Chart
          chartData={chartData}
          todayValue={todayValue}
          timeFrame={timeFrame}
        />
      </ChartGrid>
    </Grid>
  )
}

// TODO Average vs last month

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
  align-items: start;
  justify-items: center;
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
