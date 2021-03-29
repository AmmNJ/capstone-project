import styled from 'styled-components/macro'
import Header from '../components/Header/Header'
import Chart from '../components/Chart/Chart'

export default function HistoryScreen({ bars }) {
  return (
    <Grid>
      <HeaderGrid>
        <Header text="Productive history" />
      </HeaderGrid>
      <ChartGrid>
        <Chart bars={bars} />
      </ChartGrid>
    </Grid>
  )
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
  align-items: start;
  justify-items: center;
  animation: slide-opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  padding: 0 0 50px;
`

const ChartGrid = styled.section`
  display: grid;
  align-content: start;
  justify-content: center;
  animation: slide-opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  width: 100%;
  justify-content: stretch;
`
