import styled from 'styled-components/macro'
import Countdown from '../Countdown/Countdown'
import EndTime from '../EndTime/EndTime'
import { ReactComponent as PlayButton } from '../../assets/play-icon.svg'
import { ReactComponent as PauseButton } from '../../assets/pause-icon.svg'
import { ReactComponent as StopButton } from '../../assets/stop-icon.svg'
import { useState, useEffect } from 'react'

export default function CountdownScreen({ onStop }) {
  const DURATIONTWENTYFIVE = { minutes: 25, seconds: 0 }
  const DURATIONFIFTY = { minutes: 50, seconds: 0 }

  const [durationLong, setDurationLong] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [timerExpired, setTimerExpired] = useState(false)
  const [[endHours, endMinutes], setEndTime] = useState([])
  const [[minutes, seconds], setCounter] = useState([
    DURATIONTWENTYFIVE.minutes,
    DURATIONTWENTYFIVE.seconds,
  ])

  function timer() {
    if (timerExpired) {
      setIsActive(false)
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
      return alert('Congratulations! Time is up.')
    }
    if (isPaused) return
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

    if (isPaused) {
      durationLong
        ? endDateObj.setTime(
            currentDateObj.getTime() + (minutes + seconds / 60) * 60 * 1000
          )
        : endDateObj.setTime(
            currentDateObj.getTime() + (minutes + seconds / 60) * 60 * 1000
          )
      setEndTime([endDateObj.getHours(), endDateObj.getMinutes()])
    } else {
      durationLong
        ? endDateObj.setTime(
            currentDateObj.getTime() + DURATIONFIFTY.minutes * 60 * 1000
          )
        : endDateObj.setTime(
            currentDateObj.getTime() + DURATIONTWENTYFIVE.minutes * 60 * 1000
          )
      setEndTime([endDateObj.getHours(), endDateObj.getMinutes()])
    }
    setIsPaused(false)
  }

  function handlePause() {
    setIsPaused(true)
    setIsActive(false)
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
    setIsPaused(false)
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
    <CountdownScreenGrid>
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
      <ExecutionGrid>
        <StopButton role="button" onClick={handleStop} />
        {!isActive ? (
          <PlayButton role="button" onClick={handleStart} />
        ) : (
          <PauseButton role="button" onClick={handlePause} />
        )}
      </ExecutionGrid>
    </CountdownScreenGrid>
  )
}

const CountdownScreenGrid = styled.main`
  display: grid;
  grid-template-rows: 1fr 1fr 100px;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`

const CountdownGrid = styled.section`
  display: grid;
  gap: 10px;
  grid-template-rows: 1fr 30px;
  align-items: end;
  justify-items: center;
  animation: slide-opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
`

const ConfigurationGrid = styled.section`
  display: grid;
  grid-template-columns: auto auto;
  gap: 10px;
  margin: 0 0 20px;
  align-content: end;
  justify-content: center;
  animation: slide-opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
`

const ExecutionGrid = styled.section`
  display: grid;
  grid-template-columns: auto auto;
  gap: 40px;
  align-content: start;
  justify-content: center;
  padding: 10px;
  animation: slide-opacity 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
`

const CountdownDuration = styled.button`
  color: ${props => (props.selected ? '#52DFD1' : '#585858')};
  border: none;
  background-color: transparent;
  font-size: 20px;
  width: fit-content;
  height: fit-content;
  transition: 0.2s;
`
