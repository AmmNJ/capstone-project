import styled from 'styled-components/macro'

export default function Countdown({ countdownMinutes, countdownSeconds }) {
  const displayMinutes = countdownMinutes.toString().padStart(2, '0')
  const displaySeconds = countdownSeconds.toString().padStart(2, '0')

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
