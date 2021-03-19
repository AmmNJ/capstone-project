import styled from 'styled-components/macro'
import Countdown from '../components/Countdown/Countdown'
import EndTime from '../components/EndTime/EndTime'
import { ReactComponent as PlayButton } from '../assets/play-icon.svg'
import { ReactComponent as PauseButton } from '../assets/pause-icon.svg'
import { ReactComponent as StopButton } from '../assets/stop-icon.svg'
import { useEffect } from 'react'

export default function CountdownScreen({
  DURATIONTWENTYFIVE,
  DURATIONFIFTY,
  countdownMinutes,
  countdownSeconds,
  endHours,
  endMinutes,
  isActive,
  isPaused,
  isTimerExpired,
  isDurationLong,
  setCounter,
  setIsActive,
  setIsTimerExpired,
  handleStart,
  handleStop,
  handlePause,
}) {
  function timer() {
    if (isTimerExpired) {
      setIsActive(false)
      isDurationLong
        ? setCounter([
            parseInt(DURATIONFIFTY.minutes),
            parseInt(DURATIONFIFTY.seconds),
          ])
        : setCounter([
            parseInt(DURATIONTWENTYFIVE.minutes),
            parseInt(DURATIONTWENTYFIVE.seconds),
          ])
      setIsTimerExpired(false)
      return alert('Congratulations! Time is up.')
    }
    if (isPaused) return
    if (countdownMinutes === 0 && countdownSeconds === 0)
      setIsTimerExpired(true)
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

  return (
    <CountdownScreenGrid>
      <CountdownGrid>
        <Countdown
          countdownMinutes={countdownMinutes}
          countdownSeconds={countdownSeconds}
        />
        {isActive && <EndTime endHours={endHours} endMinutes={endMinutes} />}
      </CountdownGrid>
      <CurrentConfigurationGrid>
        {isDurationLong
          ? DURATIONFIFTY.minutes + ':' + DURATIONFIFTY.seconds
          : DURATIONTWENTYFIVE.minutes + ':' + DURATIONTWENTYFIVE.seconds}
      </CurrentConfigurationGrid>
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
  grid-template-rows: 1fr 1fr auto;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  padding: 70px 50px 60px;
`

const CountdownGrid = styled.section`
  display: grid;
  gap: 10px;
  grid-template-rows: 1fr 30px;
  align-items: end;
  justify-items: center;
  padding: 0 0 20px;
  animation: slide-opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
`

const CurrentConfigurationGrid = styled.section`
  display: grid;
  color: #52dfd1;
  align-content: end;
  justify-content: center;
  padding: 0 0 40px;
  font-size: 20px;
  animation: slide-opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
`

const ExecutionGrid = styled.section`
  display: grid;
  grid-template-columns: auto auto;
  gap: 40px;
  align-content: start;
  justify-content: center;
  animation: slide-opacity 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
`
