import styled from 'styled-components/macro'

export default function Countdown({ minutes, seconds }) {
  const displayMinutes = minutes.toString().padStart(2, '0')
  const displaySeconds = seconds.toString().padStart(2, '0')

  return (
    <SectionWrapper>
      <CountdownWrapper>
        {displayMinutes}:{displaySeconds}
      </CountdownWrapper>
    </SectionWrapper>
  )
}

const SectionWrapper = styled.section`
  display: grid;
  place-items: center;
  gap: 10px;
`

const CountdownWrapper = styled.div`
  font-size: 50px;
`
