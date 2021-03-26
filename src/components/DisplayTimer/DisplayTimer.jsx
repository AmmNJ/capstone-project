import styled from 'styled-components/macro'

export default function DisplayTimer({ timerMin, timerSec }) {
  const displayMinutes = timerMin.toString().padStart(2, '0')
  const displaySeconds = timerSec.toString().padStart(2, '0')

  return (
    <TimerWrapper>
      {displayMinutes}:{displaySeconds}
    </TimerWrapper>
  )
}

const TimerWrapper = styled.span`
  font-size: 50px;
  font-weight: 600;
  letter-spacing: -3.5px;
`
