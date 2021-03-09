import styled from 'styled-components/macro'
import { ReactComponent as Play } from '../../assets/play-icon.svg'
import { ReactComponent as Stop } from '../../assets/stop-icon.svg'
import { useEffect, useState } from 'react'

export default function Countdown({ startMinutes = 0, startSeconds = 0 }) {
  const playIcon = <Play />
  const stopIcon = <Stop />

  const [counterExpired, setCounterExpired] = useState(false)
  const [[minutes, seconds], setCounter] = useState([
    startMinutes,
    startSeconds,
  ])

  const displayMinutes = minutes.toString().padStart(2, '0')
  const displaySeconds = seconds.toString().padStart(2, '0')

  const tick = () => {
    if (counterExpired) return
    if (minutes === 0 && seconds === 0) setCounterExpired(true)
    else if (seconds === 0) {
      setCounter([minutes - 1, 59])
    } else {
      setCounter([minutes, seconds - 1])
    }
  }

  const reset = () => {
    setCounter([parseInt(startMinutes), parseInt(startSeconds)])
    setCounterExpired(false)
  }

  useEffect(() => {
    const timeoutID = setTimeout(() => tick(), 1000)
    return () => clearTimeout(timeoutID)
  })

  return (
    <SectionWrapper>
      <CountdownWrapper>
        {displayMinutes}:{displaySeconds}
      </CountdownWrapper>
      <button onClick={() => reset()}>Restart</button> <br />
      <StartStopButton>{counterExpired ? playIcon : stopIcon}</StartStopButton>
    </SectionWrapper>
  )
}

const SectionWrapper = styled.section`
  display: grid;
  place-items: center;
  gap: 10px;
`

const CountdownWrapper = styled.section`
  font-size: 50px;
`

const StartStopButton = styled.button`
  border: none;
  height: 60px;
  width: 60px;
  border-radius: 50%;
`
