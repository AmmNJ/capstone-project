import styled from 'styled-components/macro'
import Countdown from '../Countdown/Countdown'
import EndTime from '../EndTime/EndTime'
import { ReactComponent as PlayButton } from '../../assets/play-icon.svg'
import { ReactComponent as PauseButton } from '../../assets/pause-icon.svg'
import { ReactComponent as StopButton } from '../../assets/stop-icon.svg'
import { useEffect } from 'react'

export default function CountdownScreen({
  handleStart,
  handleStop,
  setCounter,
  isActive,
  setIsActive,
  setTimerExpired,
  timerExpired,
  isPaused,
  setIsPaused,
  durationLong,
  DURATIONFIFTY,
  DURATIONTWENTYFIVE,
  countdownMinutes,
  countdownSeconds,
  endHours,
  endMinutes,
  handleDurationShort,
  handleDurationLong,
}) {
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
    if (countdownMinutes === 0 && countdownSeconds === 0) setTimerExpired(true)
    else if (countdownSeconds === 0) {
      setCounter([countdownMinutes - 1, 59])
    } else {
      setCounter([countdownMinutes, countdownSeconds - 1])
    }
  }

  useEffect(() => {
    if (isActive) {
      const timeoutID = setTimeout(() => timer(), 1000)
      return () => clearTimeout(timeoutID)
    }
  })

  function handlePause() {
    setIsPaused(true)
    setIsActive(false)
  }

  return (
    <CountdownScreenGrid>
      <CountdownGrid>
        <Countdown
          countdownMinutes={countdownMinutes}
          countdownSeconds={countdownSeconds}
        />
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
