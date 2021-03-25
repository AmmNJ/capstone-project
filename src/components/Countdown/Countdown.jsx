import styled from 'styled-components/macro'

export default function Countdown({ timerMin, timerSec }) {
  const displayMinutes = timerMin.toString().padStart(2, '0')
  const displaySeconds = timerSec.toString().padStart(2, '0')

  return (
    <CountdownWrapper>
      {displayMinutes}:{displaySeconds}
    </CountdownWrapper>
  )
}

const CountdownWrapper = styled.span`
  font-size: 50px;
  font-weight: 600;
  letter-spacing: -3.5px;
`
