import styled from 'styled-components/macro'

export default function Countdown({ minutes, seconds }) {
  const displayMinutes = minutes.toString().padStart(2, '0')
  const displaySeconds = seconds.toString().padStart(2, '0')

  return (
    <CountdownWrapper>
      {displayMinutes}:{displaySeconds}
    </CountdownWrapper>
  )
}

const CountdownWrapper = styled.div`
  font-size: 50px;
  padding: 100px;
`
