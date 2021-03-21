import CountdownScreen from '../pages/CountdownScreen'
import StartScreen from '../pages/StartScreen'
import { useState } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'

function App() {
  const { push } = useHistory()
  const DURATION_TWENTY_FIVE = { minutes: 25, seconds: 0 }
  const DURATION_FIFTY = { minutes: 50, seconds: 0 }

  const [isDurationLong, setIsDurationLong] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isTimerExpired, setIsTimerExpired] = useState(false)
  const [[endHours, endMinutes], setEndTime] = useState([])
  const [[countdownMinutes, countdownSeconds], setCounter] = useState([
    DURATION_TWENTY_FIVE.minutes,
    DURATION_TWENTY_FIVE.seconds,
  ])

  return (
    <>
      <Switch>
        <Route exact path="/">
          <StartScreen
            isActive={isActive}
            isDurationLong={isDurationLong}
            handleStart={handleStart}
            handleDurationShort={handleDurationShort}
            handleDurationLong={handleDurationLong}
          />
        </Route>
        {(isActive || isPaused) && (
          <Route path="/countdown">
            <CountdownScreen
              DURATION_TWENTY_FIVE={DURATION_TWENTY_FIVE}
              DURATION_FIFTY={DURATION_FIFTY}
              countdownMinutes={countdownMinutes}
              countdownSeconds={countdownSeconds}
              endHours={endHours}
              endMinutes={endMinutes}
              isActive={isActive}
              isPaused={isPaused}
              isDurationLong={isDurationLong}
              isTimerExpired={isTimerExpired}
              setCounter={setCounter}
              setIsActive={setIsActive}
              setIsTimerExpired={setIsTimerExpired}
              handleStart={handleStart}
              handleStop={handleStop}
              handlePause={handlePause}
            />
          </Route>
        )}
      </Switch>
    </>
  )

  function handleDurationShort() {
    setIsDurationLong(false)
    setCounter([DURATION_TWENTY_FIVE.minutes, DURATION_TWENTY_FIVE.seconds])
  }

  function handleDurationLong() {
    setIsDurationLong(true)
    setCounter([DURATION_FIFTY.minutes, DURATION_FIFTY.seconds])
  }

  function handleStop() {
    isDurationLong
      ? setCounter([
          parseInt(DURATION_FIFTY.minutes),
          parseInt(DURATION_FIFTY.seconds),
        ])
      : setCounter([
          parseInt(DURATION_TWENTY_FIVE.minutes),
          parseInt(DURATION_TWENTY_FIVE.seconds),
        ])
    setIsTimerExpired(false)
    setIsActive(false)
    setIsPaused(false)
    push('/')
  }

  function handleStart() {
    setIsActive(true)
    const currentDateObj = new Date()
    const endDateObj = new Date()
    const endTimeActive =
      currentDateObj.getTime() +
      (countdownMinutes + countdownSeconds / 60) * 60 * 1000
    const endTimeShort =
      currentDateObj.getTime() + DURATION_FIFTY.minutes * 60 * 1000
    const endTimeLong =
      currentDateObj.getTime() + DURATION_TWENTY_FIVE.minutes * 60 * 1000

    if (isPaused) {
      endDateObj.setTime(endTimeActive)
      setEndTime([endDateObj.getHours(), endDateObj.getMinutes()])
    } else {
      isDurationLong
        ? endDateObj.setTime(endTimeShort)
        : endDateObj.setTime(endTimeLong)
      setEndTime([endDateObj.getHours(), endDateObj.getMinutes()])
    }
    setIsPaused(false)
    push('/countdown')
  }

  function handlePause() {
    setIsPaused(true)
    setIsActive(false)
  }
}

export default App
