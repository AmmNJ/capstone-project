import styled from 'styled-components/macro'
import { v4 as uuidv4 } from 'uuid'
import PropTypes from 'prop-types'

Chart.propTypes = {
  chartData: PropTypes.array,
  todayValue: PropTypes.string,
  timeFrame: PropTypes.string,
}

export default function Chart({ chartData, todayValue, timeFrame }) {
  return (
    <Container>
      <InfoBox>
        <TodayBox>
          <TodayValue>{todayValue}</TodayValue>
          <TodayLabel>Today</TodayLabel>
        </TodayBox>
        <LastTenDays>{timeFrame}</LastTenDays>
      </InfoBox>
      <Graph>
        <Bars>
          {chartData.map(data => (
            <Bar key={uuidv4()} style={{ height: `${data.height}%` }} />
          ))}
        </Bars>
        <XAxis>
          {chartData.map(data => (
            <AxisEl key={uuidv4()}>{data.weekday}</AxisEl>
          ))}
        </XAxis>
      </Graph>
    </Container>
  )
}

const Container = styled.section`
  display: grid;
  grid-template-rows: auto 1fr;
`

const InfoBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: space-between;
  padding: 0 0 10px;
`

const TodayBox = styled.div`
  display: grid;
`

const TodayValue = styled.div`
  display: grid;
  justify-content: start;
  font-weight: 600;
  font-size: 16px;
  color: #585858;
`

const TodayLabel = styled.div`
  display: grid;
  justify-content: start;
  font-weight: 400;
  font-size: 12px;
  color: #a3a3a3;
`

const LastTenDays = styled.div`
  display: grid;
  justify-content: end;
  font-weight: 600;
  font-size: 12px;
  color: #a3a3a3;
`

const Graph = styled.div`
  display: grid;
  grid-template-rows: 20vh min-content;
  height: 20vh;
  justify-content: center;
`

const Bars = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 10px;
  align-items: end;
  gap: 15px;
  padding: 0 0 3px;
`

const Bar = styled.div`
  background: linear-gradient(125deg, #a4e3cc, #56dfd1);
  border-radius: 5px;
  animation: shrink 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
`

const XAxis = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 10px;
  align-items: end;
  gap: 15px;
`

const AxisEl = styled.div`
  color: #585858;
  font-size: 10px;
  font-weight: 600;
`
