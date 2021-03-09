import styled from 'styled-components/macro'
import { useEffect, useState } from 'react'

export default function Countdown({ minutes = 0, seconds = 0 }) {
  const [counterExpired, setCounterExpired] = useState(false)
  const [[min, sec], setCounter] = useState([minutes, seconds])

  const tick = () => {
    if (counterExpired) return
    if (min === 0 && sec === 0) setCounterExpired(true)
    else if (sec === 0) {
      setCounter([min - 1, 59])
    } else {
      setCounter([min, sec - 1])
    }
  }

  const reset = () => {
    setCounter([parseInt(minutes), parseInt(seconds)])
    setCounterExpired(false)
  }

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000)
    return () => clearInterval(timerID)
  })

  return (
    <CountdownWrapper>
      {`${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`}
    </CountdownWrapper>
  )
}

const CountdownWrapper = styled.section`
  display: grid;
  place-items: center;
`
