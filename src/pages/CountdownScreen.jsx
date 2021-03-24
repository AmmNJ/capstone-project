import styled from 'styled-components/macro'
import Countdown from '../components/Countdown/Countdown'
import EndTime from '../components/EndTime/EndTime'
import { ReactComponent as PlayButton } from '../assets/play-icon.svg'
import { ReactComponent as PauseButton } from '../assets/pause-icon.svg'
import { ReactComponent as StopButton } from '../assets/stop-icon.svg'
import Timer from '../components/CountdownWorking'

export default function CountdownScreen({
  DURATION_TWENTY_FIVE,
  DURATION_FIFTY,
  countdownMinutes,
  countdownSeconds,
  endHours,
  endMinutes,
  isActive,
  isDurationLong,
  handleStart,
  handleStop,
  handlePause,
}) {
  return (
    <CountdownScreenGrid>
      <Timer />
      <CountdownGrid>
        <Countdown
          countdownMinutes={countdownMinutes}
          countdownSeconds={countdownSeconds}
        />
        {isActive && <EndTime endHours={endHours} endMinutes={endMinutes} />}
      </CountdownGrid>
      <CurrentConfigurationGrid>
        {isDurationLong
          ? DURATION_FIFTY.minutes.toString().padStart(2, '0') +
            ':' +
            DURATION_FIFTY.seconds.toString().padStart(2, '0')
          : DURATION_TWENTY_FIVE.minutes.toString().padStart(2, '0') +
            ':' +
            DURATION_TWENTY_FIVE.seconds.toString().padStart(2, '0')}
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
