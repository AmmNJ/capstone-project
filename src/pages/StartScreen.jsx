import styled from 'styled-components/macro'
import Header from '../components/Header/Header'
import { ReactComponent as GetThingsDoneSVG } from '../assets/get-things-done.svg'
import { ReactComponent as BreakSVG } from '../assets/break.svg'
import { useState } from 'react'

export default function StartScreen({
  isActive,
  isDurationLong,
  isTimerExpired,
  handleStart,
  handleDurationShort,
  handleDurationLong,
  setIsTimerExpired,
}) {
  const [isBreakTimerExpired, setIsBreakTimerExpired] = useState(false)

  return (
    <StartScreenGrid>
      <HeaderGrid>
        <Header text="Let’s get things done" />
      </HeaderGrid>
      <IllustrationGrid>
        {isTimerExpired ? <BreakSVG /> : <GetThingsDoneSVG />}
      </IllustrationGrid>
      <ConfigutationGrid>
        <CountdownDuration
          onClick={handleDurationShort}
          selected={!isDurationLong}
        >
          25:00
        </CountdownDuration>
        <CountdownDuration
          onClick={handleDurationLong}
          selected={isDurationLong}
        >
          50:00
        </CountdownDuration>
      </ConfigutationGrid>
      <StartTimerGrid>
        {isTimerExpired ? (
          <BreakTimerButton onClick={handleBreakAlert}>
            Start Timer
          </BreakTimerButton>
        ) : (
          <StartTimerButton onClick={handleStart}>Start Timer</StartTimerButton>
        )}
      </StartTimerGrid>
    </StartScreenGrid>
  )
  function handleBreakAlert() {
    if (
      window.confirm(
        'Your break is not finished yet. Are you sure to continue?'
      )
    ) {
      setIsTimerExpired(false)
    }
  }
  // function breakTimer() {
  //   if (isTimerExpired) {
  //     setIsBreakTimerExpired(false)
  //     return alert('Congratulations! Time is up.')
  //   }
  //   if (isPaused) return
  //   if (countdownMinutes === 0 && countdownSeconds === 0)
  //     setIsBreakTimerExpired(true)
  //   else if (countdownSeconds === 0) {
  //     setBreakCounter([countdownMinutes - 1, 59])
  //   } else {
  //     setBreakCounter([countdownMinutes, countdownSeconds - 1])
  //   }
  // }
}

const StartScreenGrid = styled.main`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr auto;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  padding: 70px 50px 60px;
`

const HeaderGrid = styled.section`
  display: grid;
  align-items: start;
  justify-items: center;
  animation: slide-opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
`

const IllustrationGrid = styled.section`
  display: grid;
  align-content: start;
  justify-content: center;
  animation: slide-opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
`

const ConfigutationGrid = styled.section`
  display: grid;
  grid-template-columns: auto auto;
  gap: 10px;
  align-content: end;
  justify-content: center;
  animation: slide-opacity 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  padding: 0 0 40px;
`

const StartTimerGrid = styled.section`
  animation: slide-opacity 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  align-content: end;
  justify-content: center;
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

const StartTimerButton = styled.button`
  font-size: 20px;
  color: white;
  background: linear-gradient(125deg, #a4e3cc, #56dfd1);
  height: 50px;
  width: 100%;
  border: none;
  border-radius: 8px;
  padding: 0;
`

const BreakTimerButton = styled.button`
  font-size: 20px;
  color: white;
  background: gray;
  height: 50px;
  width: 100%;
  border: none;
  border-radius: 8px;
  padding: 0;
`
