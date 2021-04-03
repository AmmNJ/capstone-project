import styled from 'styled-components/macro'

export default function Kpi() {
  return (
    <Container>
      <Heading>Avg. Last Month</Heading>
      <SubContainer>
        <ValueBox>
          <Value>5h</Value>
          <InfoEl>Day</InfoEl>
        </ValueBox>
        <ValueBox>
          <Value>35h</Value>
          <InfoEl>Week</InfoEl>
        </ValueBox>
        <ValueBox>
          <Value>140h</Value>
          <InfoEl>Month</InfoEl>
        </ValueBox>
      </SubContainer>
      <Heading>Avg. Total</Heading>
      <SubContainer>
        <ValueBox>
          <Value>4h</Value>
          <InfoEl>Day</InfoEl>
        </ValueBox>
        <ValueBox>
          <Value>28h</Value>
          <InfoEl>Week</InfoEl>
        </ValueBox>
        <ValueBox>
          <Value>112h</Value>
          <InfoEl>Month</InfoEl>
        </ValueBox>
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

const ValueBox = styled.div`
  display: grid;
`

const Value = styled.span`
  color: #585858;
  font-size: 26px;
  font-weight: 600;
`

const InfoEl = styled.span`
  color: #a3a3a3;
  font-size: 12px;
`
