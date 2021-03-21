import CountdownScreen from '../pages/CountdownScreen'
import StartScreen from '../pages/StartScreen'
import { useState, useEffect } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'

function App() {
  const { push } = useHistory()
  const DURATION_TWENTY_FIVE = { minutes: 0, seconds: 3 }
  const DURATION_FIFTY = { minutes: 0, seconds: 5 }

  const [isDurationLong, setIsDurationLong] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isTimerExpired, setIsTimerExpired] = useState(false)
  const [[endHours, endMinutes], setEndTime] = useState([])
  const [[countdownMinutes, countdownSeconds], setCounter] = useState([
    DURATION_TWENTY_FIVE.minutes,
    DURATION_TWENTY_FIVE.seconds,
  ])

  useEffect(() => {
    if (isActive) {
      const timeoutID = setTimeout(() => timer(), 1000)
      return () => clearTimeout(timeoutID)
    }
  })

  return (
    <>
      <Switch>
        <Route exact path="/">
          <StartScreen
            isActive={isActive}
            isDurationLong={isDurationLong}
            isTimerExpired={isTimerExpired}
            handleStart={handleStart}
            handleDurationShort={handleDurationShort}
            handleDurationLong={handleDurationLong}
            setIsTimerExpired={setIsTimerExpired}
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
              isDurationLong={isDurationLong}
              handleStart={handleStart}
              handleStop={handleStop}
              handlePause={handlePause}
            />
          </Route>
        )}
      </Switch>
    </>
  )

  function timer() {
    if (isTimerExpired) {
      setIsActive(false)
      push('/')
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
    setIsTimerExpired(false)
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
    } else if (isDurationLong) {
      setCounter([
        parseInt(DURATION_FIFTY.minutes),
        parseInt(DURATION_FIFTY.seconds),
      ])
      endDateObj.setTime(endTimeLong)
    } else {
      endDateObj.setTime(endTimeShort)
      setCounter([
        parseInt(DURATION_TWENTY_FIVE.minutes),
        parseInt(DURATION_TWENTY_FIVE.seconds),
      ])
    }

    setEndTime([endDateObj.getHours(), endDateObj.getMinutes()])

    setIsPaused(false)
    push('/countdown')
  }

  function handlePause() {
    setIsPaused(true)
    setIsActive(false)
  }
}

export default App
