import styled from 'styled-components/macro'
import Kpi from './Kpi'

export default function KpiBoard({ totalAvg }) {
  return (
    <Container>
      <Heading>Avg. Last Month</Heading>
      <SubContainer>
        <Kpi value={'4h'} info={'Day'} />
        <Kpi value={'30h'} info={'Week'} />
        <Kpi value={'134h'} info={'Month'} />
      </SubContainer>
      <Heading>Avg. Total</Heading>
      <SubContainer>
        <Kpi value={totalAvg + 'h'} info={'Day'} />
        <Kpi value={'35h'} info={'Week'} />
        <Kpi value={'157h'} info={'Month'} />
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
