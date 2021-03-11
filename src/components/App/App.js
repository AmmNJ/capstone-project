import styled from 'styled-components/macro'
import Countdown from '../Countdown/Countdown'
import { ReactComponent as PlayButton } from '../../assets/play-icon.svg'
import { ReactComponent as StopButton } from '../../assets/stop-icon.svg'
import { useState, useEffect } from 'react'

function App({ startMinutes = 25, startSeconds = 0 }) {
  const [isActive, setIsActive] = useState(false)
  const [timerExpired, setTimerExpired] = useState(false)
  const [[minutes, seconds], setCounter] = useState([
    startMinutes,
    startSeconds,
  ])

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

  function handleStop() {
    setCounter([parseInt(startMinutes), parseInt(startSeconds)])
    setTimerExpired(false)
    setIsActive(false)
  }

  function handleStart() {
    setIsActive(true)
  }

  return (
    <AppGrid>
      <Countdown minutes={minutes} seconds={seconds} />
      {!isActive ? (
        <PlayButton role="button" onClick={handleStart} />
      ) : (
        <StopButton role="button" onClick={handleStop} />
      )}
    </AppGrid>
  )
}

export default App

const AppGrid = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
`
