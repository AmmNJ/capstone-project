import CountdownScreen from '../CountdownScreen/CountdownScreen'
import StartScreen from '../StartScreen/StartScreen'
import { useState } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'

function App() {
  const { push } = useHistory()
  const DURATIONTWENTYFIVE = { minutes: 25, seconds: 0 }
  const DURATIONFIFTY = { minutes: 50, seconds: 0 }

  const [durationLong, setDurationLong] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [timerExpired, setTimerExpired] = useState(false)
  const [[endHours, endMinutes], setEndTime] = useState([])
  const [[countdownMinutes, countdownSeconds], setCounter] = useState([
    DURATIONTWENTYFIVE.minutes,
    DURATIONTWENTYFIVE.seconds,
  ])

  function handleDurationShort() {
    setDurationLong(false)
    setCounter([DURATIONTWENTYFIVE.minutes, DURATIONTWENTYFIVE.seconds])
  }

  function handleDurationLong() {
    setDurationLong(true)
    setCounter([DURATIONFIFTY.minutes, DURATIONFIFTY.seconds])
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
    push('/')
  }

  function handleStart() {
    setIsActive(true)
    const currentDateObj = new Date()
    const endDateObj = new Date()

    if (isPaused) {
      durationLong
        ? endDateObj.setTime(
            currentDateObj.getTime() +
              (countdownMinutes + countdownSeconds / 60) * 60 * 1000
          )
        : endDateObj.setTime(
            currentDateObj.getTime() +
              (countdownMinutes + countdownSeconds / 60) * 60 * 1000
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
    push('/countdown')
  }
  function handlePause() {
    setIsPaused(true)
    setIsActive(false)
  }
  return (
    <>
      <Switch>
        <Route exact path="/">
          <StartScreen
            isActive={isActive}
            durationLong={durationLong}
            handleStart={handleStart}
            handleDurationShort={handleDurationShort}
            handleDurationLong={handleDurationLong}
          />
        </Route>
      </Switch>
      <Switch>
        <Route exact path="/countdown">
          <CountdownScreen
            DURATIONTWENTYFIVE={DURATIONTWENTYFIVE}
            DURATIONFIFTY={DURATIONFIFTY}
            countdownMinutes={countdownMinutes}
            countdownSeconds={countdownSeconds}
            endHours={endHours}
            endMinutes={endMinutes}
            isActive={isActive}
            isPaused={isPaused}
            timerExpired={timerExpired}
            durationLong={durationLong}
            setCounter={setCounter}
            setIsActive={setIsActive}
            setTimerExpired={setTimerExpired}
            handleStart={handleStart}
            handleStop={handleStop}
            handlePause={handlePause}
          />
        </Route>
      </Switch>
    </>
  )
}

export default App
