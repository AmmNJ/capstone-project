import CountdownScreen from '../pages/CountdownScreen'
import StartScreen from '../pages/StartScreen'
import { useState, useEffect } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'

function App() {
  const { push } = useHistory()
  const SHORT = {
    min: 2,
    brMin: 2,
  }
  const LONG = {
    min: 50,
    brMin: 10,
  }
  const [appStatus, setAppStatus] = useState('')

  const [isDurationLong, setIsDurationLong] = useState(false)
  const [[endHrs, endMin], setEndTime] = useState([])
  const [[timerMin, timerSec], setTimer] = useState([SHORT.min, 0])
  const [[brTimerMin, brTimerSec], setBrTimer] = useState([SHORT.brMin, 0])

  useEffect(() => {
    if (appStatus === 'active') {
      const timeoutID = setTimeout(() => timer(), 1000)
      return () => clearTimeout(timeoutID)
    }
    if (appStatus === 'break') {
      const breakTimeoutID = setTimeout(() => breakTimer(), 1000)
      return () => clearTimeout(breakTimeoutID)
    }
  })

  return (
    <>
      <Switch>
        {(appStatus === 'active' || appStatus === 'paused') && (
          <Route path="/countdown">
            <CountdownScreen
              SHORT={SHORT}
              LONG={LONG}
              timerMin={timerMin}
              timerSec={timerSec}
              endHrs={endHrs}
              endMin={endMin}
              appStatus={appStatus}
              isDurationLong={isDurationLong}
              handleStart={handleStart}
              handleStop={handleStop}
              handlePause={handlePause}
            />
          </Route>
        )}
        <Route path="/*">
          <StartScreen
            SHORT={SHORT}
            LONG={LONG}
            brTimerMin={brTimerMin}
            brTimerSec={brTimerSec}
            isDurationLong={isDurationLong}
            appStatus={appStatus}
            setAppStatus={setAppStatus}
            handleStart={handleStart}
            handleShort={handleShort}
            handleLong={handleLong}
          />
        </Route>
      </Switch>
    </>
  )

  function timer() {
    if (appStatus === 'paused') return
    if (timerMin === 0 && timerSec === 0) {
      isDurationLong
        ? setBrTimer([LONG.brMin, 0])
        : setBrTimer([SHORT.brMin, 0])
      push('/')
      setAppStatus('break')
      return alert('Congratulations! Time is up.')
    } else if (timerSec === 0) {
      setTimer([timerMin - 1, 59])
    } else {
      setTimer([timerMin, timerSec - 1])
    }
  }

  function breakTimer() {
    if (appStatus === 'default') {
      return
    }
    if (brTimerMin === 0 && brTimerSec === 0) setAppStatus('default')
    else if (brTimerSec === 0) {
      setBrTimer([brTimerMin - 1, 59])
    } else {
      setBrTimer([brTimerMin, brTimerSec - 1])
    }
  }

  function handleShort() {
    setIsDurationLong(false)
    setTimer([SHORT.min, 0])
  }

  function handleLong() {
    setIsDurationLong(true)
    setTimer([LONG.min, 0])
  }

  function handleStop() {
    isDurationLong
      ? setTimer([parseInt(LONG.min), 0])
      : setTimer([parseInt(SHORT.min), 0])
    setAppStatus('default')
    push('/')
  }

  function handleStart() {
    const currentDateObj = new Date()
    const endDateObj = new Date()
    const endTimeActive =
      currentDateObj.getTime() + (timerMin + timerSec / 60) * 60 * 1000
    const endTimeShort = currentDateObj.getTime() + SHORT.min * 60 * 1000
    const endTimeLong = currentDateObj.getTime() + LONG.min * 60 * 1000

    if (appStatus === 'paused') {
      endDateObj.setTime(endTimeActive)
      setEndTime([endDateObj.getHours(), endDateObj.getMinutes()])
    } else if (isDurationLong) {
      setTimer([parseInt(LONG.min), 0])
      endDateObj.setTime(endTimeLong)
    } else {
      endDateObj.setTime(endTimeShort)
      setTimer([parseInt(SHORT.min), 0])
    }
    setEndTime([endDateObj.getHours(), endDateObj.getMinutes()])
    setAppStatus('active')
    push('/countdown')
  }

  function handlePause() {
    setAppStatus('paused')
  }
}

export default App
