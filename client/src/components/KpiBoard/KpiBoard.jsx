import styled from 'styled-components/macro'
import Kpi from '../Kpi/Kpi'
import PropTypes from 'prop-types'

KpiBoard.propTypes = {
  kpiData: PropTypes.object,
}

export default function KpiBoard({ kpiData }) {
  return (
    <Container>
      <Heading>Last Ten Days</Heading>
      <SubContainer>
        <Kpi value={kpiData.lastTenDaysAvg + 'h'} info={'Average per Day'} />
        <Kpi value={kpiData.lastTenDaysTotal + 'h'} info={'Total'} />
      </SubContainer>
      <Heading>Total</Heading>
      <SubContainer>
        <Kpi value={kpiData.totalAvg + 'h'} info={'Average per Day'} />
        <Kpi value={kpiData.total + 'h'} info={'Total'} />
      </SubContainer>
    </Container>
  )
}

const Container = styled.section`
  display: grid;
  grid-template-rows: auto 1fr auto 1fr;
  gap: 5px;
  animation: slide-opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
`

const Heading = styled.h2`
  font-size: 16px;
  font-weight: 600px;
  margin: 0;
  padding: 15px 0 0;
`

const SubContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: space-between;
`
