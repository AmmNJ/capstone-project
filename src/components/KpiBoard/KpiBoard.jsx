import styled from 'styled-components/macro'
import Kpi from './Kpi'

export default function KpiBoard({ kpiValues }) {
  return (
    <Container>
      <Heading>Last Ten Days</Heading>
      <SubContainer>
        <Kpi value={'4h'} info={'Average per Day'} />
        <Kpi value={'134h'} info={'Total'} />
      </SubContainer>
      <Heading>Total</Heading>
      <SubContainer>
        <Kpi value={kpiValues.totalAvg + 'h'} info={'Average per Day'} />
        <Kpi value={kpiValues.total + 'h'} info={'Total'} />
      </SubContainer>
    </Container>
  )
}

const Container = styled.section`
  display: grid;
  grid-template-rows: auto 1fr auto 1fr;
  padding: 20px 0 0px;
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
  grid-template-columns: 1fr 1fr 1fr;
  justify-content: space-between;
`
