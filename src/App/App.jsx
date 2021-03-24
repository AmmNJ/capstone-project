import CountdownScreen from '../pages/CountdownScreen'
import StartScreen from '../pages/StartScreen'
import { useState, useEffect } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'

function App() {
  const { push } = useHistory()
  const DURATION_TWENTY_FIVE = {
    minutes: 25,
    seconds: 0,
    breakMinutes: 5,
    breakSeconds: 0,
  }
  const DURATION_FIFTY = {
    minutes: 50,
    seconds: 0,
    breakMinutes: 10,
    breakSeconds: 0,
  }

  // active -> countdown active, countdown not paused, break not active, time not expired
  // paused -> countdown not active, countdown paused, break not active, time not expired
  // break -> countdown not active, countdown not paused, break active, time not expired
  // default -> nothing active

  const [timerStatus, setTimerStatus] = useState('')
  // const [isActive, setIsActive] = useState(false)
  // const [isPaused, setIsPaused] = useState(false)
  // const [isTimerExpired, setIsTimerExpired] = useState(false)
  // const [isBreakTimerExpired, setIsBreakTimerExpired] = useState(false)
  const [isDurationLong, setIsDurationLong] = useState(false)
  const [[endHours, endMinutes], setEndTime] = useState([])
  const [[countdownMinutes, countdownSeconds], setCounter] = useState([
    DURATION_TWENTY_FIVE.minutes,
    DURATION_TWENTY_FIVE.seconds,
  ])
  const [
    [breakCountdownMinutes, breakCountdownSeconds],
    setBreakCounter,
  ] = useState([
    DURATION_TWENTY_FIVE.breakMinutes,
    DURATION_TWENTY_FIVE.breakSeconds,
  ])

  useEffect(() => {
    if (timerStatus === 'active') {
      const timeoutID = setTimeout(() => timer(), 1000)
      return () => clearTimeout(timeoutID)
    } else if (timerStatus === 'break') {
      const breakTimeoutID = setTimeout(() => breakTimer(), 1000)
      return () => clearTimeout(breakTimeoutID)
    }
  })

  return (
    <>
      <Switch>
        <Route exact path="/">
          <StartScreen
            DURATION_TWENTY_FIVE={DURATION_TWENTY_FIVE}
            DURATION_FIFTY={DURATION_FIFTY}
            breakCountdownMinutes={breakCountdownMinutes}
            breakCountdownSeconds={breakCountdownSeconds}
            isDurationLong={isDurationLong}
            timerStatus={timerStatus}
            setTimerStatus={setTimerStatus}
            handleStart={handleStart}
            handleDurationShort={handleDurationShort}
            handleDurationLong={handleDurationLong}
          />
        </Route>
        {(timerStatus === 'active' || timerStatus === 'paused') && (
          <Route path="/countdown">
            <CountdownScreen
              DURATION_TWENTY_FIVE={DURATION_TWENTY_FIVE}
              DURATION_FIFTY={DURATION_FIFTY}
              countdownMinutes={countdownMinutes}
              countdownSeconds={countdownSeconds}
              endHours={endHours}
              endMinutes={endMinutes}
              timerStatus={timerStatus}
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
    if (timerStatus === 'break') {
      isDurationLong
        ? setBreakCounter([
            DURATION_FIFTY.breakMinutes,
            DURATION_FIFTY.breakSeconds,
          ])
        : setBreakCounter([
            DURATION_TWENTY_FIVE.breakMinutes,
            DURATION_TWENTY_FIVE.breakSeconds,
          ])
      push('/')
      return alert('Congratulations! Time is up.')
    }
    if (timerStatus === 'break') return
    if (countdownMinutes === 0 && countdownSeconds === 0) {
      setTimerStatus('break')
    } else if (countdownSeconds === 0) {
      setCounter([countdownMinutes - 1, 59])
    } else {
      setCounter([countdownMinutes, countdownSeconds - 1])
    }
  }

  function breakTimer() {
    if (timerStatus === 'default') {
      return
    }
    if (breakCountdownMinutes === 0 && breakCountdownSeconds === 0)
      setTimerStatus('default')
    else if (breakCountdownSeconds === 0) {
      setBreakCounter([breakCountdownMinutes - 1, 59])
    } else {
      setBreakCounter([breakCountdownMinutes, breakCountdownSeconds - 1])
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
    setTimerStatus('default')
    push('/')
  }

  function handleStart() {
    setTimerStatus('active')
    const currentDateObj = new Date()
    const endDateObj = new Date()
    const endTimeActive =
      currentDateObj.getTime() +
      (countdownMinutes + countdownSeconds / 60) * 60 * 1000
    const endTimeShort =
      currentDateObj.getTime() + DURATION_TWENTY_FIVE.minutes * 60 * 1000
    const endTimeLong =
      currentDateObj.getTime() + DURATION_FIFTY.minutes * 60 * 1000

    if (timerStatus === 'paused') {
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
    setTimerStatus('active')
    push('/countdown')
  }

  function handlePause() {
    setTimerStatus('paused')
  }
}

export default App
