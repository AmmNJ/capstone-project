import styled from 'styled-components/macro'
import Countdown from '../Countdown/Countdown'
import { ReactComponent as PlayButton } from '../../assets/play-icon.svg'
import { ReactComponent as StopButton } from '../../assets/stop-icon.svg'
import { useState, useEffect } from 'react'

function App() {
  const LENGTHTWENTYFIVE = { minutes: 25, seconds: 0 }
  const LENGTHFIFTY = { minutes: 50, seconds: 0 }

  const [lengthFifty, setLengthFifty] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [timerExpired, setTimerExpired] = useState(false)
  const [[minutes, seconds], setCounter] = useState([
    LENGTHTWENTYFIVE.minutes,
    LENGTHTWENTYFIVE.seconds,
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
    lengthFifty
      ? setCounter([
          parseInt(LENGTHFIFTY.minutes),
          parseInt(LENGTHFIFTY.seconds),
        ])
      : setCounter([
          parseInt(LENGTHTWENTYFIVE.minutes),
          parseInt(LENGTHTWENTYFIVE.seconds),
        ])
    setTimerExpired(false)
    setIsActive(false)
  }

  function handleStart() {
    setIsActive(true)
  }

  function handleLengthFifty() {
    setLengthFifty(true)
    setCounter([LENGTHFIFTY.minutes, LENGTHFIFTY.seconds])
  }

  function handleLengthTwentyFive() {
    setLengthFifty(false)
    setCounter([LENGTHTWENTYFIVE.minutes, LENGTHTWENTYFIVE.seconds])
  }

  return (
    <AppGrid>
      <Countdown minutes={minutes} seconds={seconds} />
      <SwitchButtonGrid>
        <TimerLength onClick={handleLengthTwentyFive} disabled={isActive}>
          25:00
        </TimerLength>
        <TimerLength onClick={handleLengthFifty} disabled={isActive}>
          50:00
        </TimerLength>
      </SwitchButtonGrid>
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
  height: 100vh;
  place-content: center;
  place-items: center;
  gap: 40px;
`

const SwitchButtonGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`

const TimerLength = styled.button`
  border: none;
  width: fit-content;
  height: fit-content;
  background-color: transparent;
  font-size: 20px;
  padding: 0;
`
