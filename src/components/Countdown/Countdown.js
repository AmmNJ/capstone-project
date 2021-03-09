import styled from 'styled-components/macro'
import { useEffect, useState } from 'react'

export default function Countdown({ minutes = 0, seconds = 0 }) {
  const [counterExpired, setCounterExpired] = useState(false)
  const [[min, sec], setCounter] = useState([minutes, seconds])

  const displayMinutes = min.toString().padStart(2, '0')
  const displaySeconds = sec.toString().padStart(2, '0')

  const tick = () => {
    if (counterExpired) return
    if (min === 0 && sec === 0) setCounterExpired(true)
    else if (sec === 0) {
      setCounter([min - 1, 59])
    } else {
      setCounter([min, sec - 1])
    }
  }

  useEffect(() => {
    const timerId = setInterval(() => tick(), 1000)
    return () => clearInterval(timerId)
  })

  return (
    <CountdownWrapper>
      {displayMinutes}:{displaySeconds}
    </CountdownWrapper>
  )
}

const CountdownWrapper = styled.section`
  display: grid;
  place-items: center;
`
