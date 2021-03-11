import styled from 'styled-components/macro'
import { ReactComponent as Play } from '../../assets/play-icon.svg'
import { ReactComponent as Stop } from '../../assets/stop-icon.svg'
import { useState, useEffect } from 'react'

export default function Countdown({ startMinutes = 25, startSeconds = 0 }) {
  const playIcon = <Play />
  const stopIcon = <Stop />

  const [isActive, setIsActive] = useState(false)
  const [timerExpired, setTimerExpired] = useState(false)
  const [[minutes, seconds], setCounter] = useState([
    startMinutes,
    startSeconds,
  ])

  const displayMinutes = minutes.toString().padStart(2, '0')
  const displaySeconds = seconds.toString().padStart(2, '0')

  function timer() {
    if (timerExpired) return
    if (minutes === 0 && seconds === 0) setTimerExpired(true)
    else if (seconds === 0) {
      setCounter([minutes - 1, 59])
    } else {
      setCounter([minutes, seconds - 1])
    }
  }

  useEffect(() => {
    if (isActive) {
      const timeoutID = setTimeout(() => timer(), 1000)
      return () => clearTimeout(timeoutID)
    }
  })

  function handleStart() {
    setIsActive(true)
  }

  function handleStop() {
    setCounter([parseInt(startMinutes), parseInt(startSeconds)])
    setTimerExpired(false)
    setIsActive(false)
  }

  return (
    <SectionWrapper>
      <CountdownWrapper>
        {displayMinutes}:{displaySeconds}
      </CountdownWrapper>
      {!isActive ? (
        <StartStopButton onClick={handleStart}>{playIcon}</StartStopButton>
      ) : (
        <StartStopButton onClick={handleStop}>{stopIcon}</StartStopButton>
      )}
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

const StartStopButton = styled.button`
  border: none;
  padding: 0;
  background-color: transparent;
  line-height: 0;
  width: fit-content;
  height: fit-content;
`
