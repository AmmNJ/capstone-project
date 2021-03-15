import styled from 'styled-components/macro'
import Countdown from '../Countdown/Countdown'
import EndTime from '../EndTime/EndTime'
import { ReactComponent as PlayButton } from '../../assets/play-icon.svg'
import { ReactComponent as StopButton } from '../../assets/stop-icon.svg'
import { useState, useEffect } from 'react'

function App() {
  const DURATIONTWENTYFIVE = { minutes: 25, seconds: 0 }
  const DURATIONFIFTY = { minutes: 50, seconds: 0 }

  const [durationLong, setDurationLong] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [[endHours, endMinutes], setEndTime] = useState([])
  const [timerExpired, setTimerExpired] = useState(false)
  const [[minutes, seconds], setCounter] = useState([
    DURATIONTWENTYFIVE.minutes,
    DURATIONTWENTYFIVE.seconds,
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

  function handleStart() {
    setIsActive(true)
    const currentDateObj = new Date()
    const endDateObj = new Date()

    durationLong
      ? endDateObj.setTime(
          currentDateObj.getTime() + DURATIONFIFTY.minutes * 60 * 1000
        )
      : endDateObj.setTime(
          currentDateObj.getTime() + DURATIONTWENTYFIVE.minutes * 60 * 1000
        )
    setEndTime([endDateObj.getHours(), endDateObj.getMinutes()])
  }

  function handleStop() {
    durationLong
      ? setCounter([
          parseInt(DURATIONFIFTY.minutes),
          parseInt(DURATIONFIFTY.seconds),
        ])
      : setCounter([
          parseInt(DURATIONTWENTYFIVE.minutes),
          parseInt(DURATIONTWENTYFIVE.seconds),
        ])
    setTimerExpired(false)
    setIsActive(false)
  }

  function handleDurationShort() {
    setDurationLong(false)
    setCounter([DURATIONTWENTYFIVE.minutes, DURATIONTWENTYFIVE.seconds])
  }

  function handleDurationLong() {
    setDurationLong(true)
    setCounter([DURATIONFIFTY.minutes, DURATIONFIFTY.seconds])
  }

  return (
    <AppGrid>
      <CountdownGrid>
        <Countdown minutes={minutes} seconds={seconds} />
        {isActive && <EndTime endHours={endHours} endMinutes={endMinutes} />}
      </CountdownGrid>
      <ConfigurationGrid>
        <CountdownDuration
          onClick={handleDurationShort}
          disabled={isActive}
          selected={!durationLong}
        >
          25:00
        </CountdownDuration>
        <CountdownDuration
          onClick={handleDurationLong}
          disabled={isActive}
          selected={durationLong}
        >
          50:00
        </CountdownDuration>
      </ConfigurationGrid>
      <StartStopGrid>
        {!isActive ? (
          <PlayButton role="button" onClick={handleStart} />
        ) : (
          <StopButton role="button" onClick={handleStop} />
        )}
      </StartStopGrid>
    </AppGrid>
  )
}

export default App

const AppGrid = styled.main`
  display: grid;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  grid-template-rows: 1fr 1fr 100px;
`

const CountdownGrid = styled.section`
  display: grid;
  gap: 10px;
  grid-template-rows: 1fr 30px;
  align-items: end;
  justify-items: center;
`

const ConfigurationGrid = styled.section`
  display: grid;
  grid-template-columns: auto auto;
  align-content: end;
  justify-content: center;
  gap: 10px;
  padding: 20px;
`

const StartStopGrid = styled.section`
  display: grid;
  align-content: start;
  justify-content: center;
  padding: 10px;
`

const CountdownDuration = styled.button`
  color: ${props => (props.selected ? '#52DFD1' : '#585858')};
  border: none;
  background-color: transparent;
  font-size: 20px;
  width: fit-content;
  height: fit-content;
`
