import styled from 'styled-components/macro'

export default function Kpi({ value, info }) {
  return (
    <ValueBox>
      <Value>{value}</Value>
      <InfoEl>{info}</InfoEl>
    </ValueBox>
  )
}

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
