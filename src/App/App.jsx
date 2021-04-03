import CountdownScreen from '../pages/CountdownScreen'
import StartScreen from '../pages/StartScreen'
import HistoryScreen from '../pages/HistoryScreen'
import useLocalStorage from '../hooks/useLocalStorage'
import { useState, useEffect } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import {
  addMinToDate,
  allocateData,
  calcHeight,
  msToHoursMin,
} from '../services/convertData'

function App() {
  const { push } = useHistory()
  const SHORT = {
    min: 25,
    brMin: 5,
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
  const [startDate, setStartDate] = useState(0)
  const [historyData, setHistoryData] = useLocalStorage('historyData', [])
  const [chartData, setChartData] = useState(
    calcHeight(allocateData(historyData))
  )
  const [todayValue, setTodayValue] = useState(
    msToHoursMin(chartData[chartData.length - 1].duration)
  )
  const [timeFrame, setTimeFrame] = useState(updateTimeFrame())

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
        {appStatus === 'active' && (
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
            />
          </Route>
        )}
        <Route path="/history">
          <HistoryScreen
            chartData={chartData}
            todayValue={todayValue}
            timeFrame={timeFrame}
            returnHomeScreen={returnHomeScreen}
          />
        </Route>
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
            handleHistory={handleHistory}
          />
        </Route>
      </Switch>
    </>
  )

  function timer() {
    if (timerMin === 0 && timerSec === 0) {
      updateHistory()
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
    if (brTimerMin === 0 && brTimerSec === 0) {
      setAppStatus('default')
      return
    } else if (brTimerSec === 0) {
      setBrTimer([brTimerMin - 1, 59])
    } else {
      setBrTimer([brTimerMin, brTimerSec - 1])
    }
  }

  function handleShort() {
    setIsDurationLong(false)
    setTimer([SHORT.min, 0])
    setBrTimer([SHORT.brMin, 0])
  }

  function handleLong() {
    setIsDurationLong(true)
    setTimer([LONG.min, 0])
    setBrTimer([LONG.brMin, 0])
  }

  function handleStop() {
    setAppStatus('default')
    updateHistory()
    push('/')
  }

  function handleStart() {
    const now = new Date()
    setStartDate(new Date())
    const nowMS = now.getTime()
    const endTimeShort = addMinToDate(nowMS, SHORT.min)
    const endTimeLong = addMinToDate(nowMS, LONG.min)

    if (isDurationLong) {
      setTimer([LONG.min, 0])
      now.setTime(endTimeLong)
    } else {
      now.setTime(endTimeShort)
      setTimer([SHORT.min, 0])
    }

    setEndTime([now.getHours(), now.getMinutes()])
    updateChart()
    updateTodayValue()
    setTimeFrame(updateTimeFrame())
    setAppStatus('active')
    push('/countdown')
  }

  function updateHistory() {
    setHistoryData([
      {
        id: uuidv4(),
        start: startDate,
        end: new Date(),
        duration: new Date().getTime() - startDate.getTime(),
      },
      ...historyData,
    ])
  }

  function updateChart() {
    setChartData(calcHeight(allocateData(historyData)))
  }

  function updateTodayValue() {
    setTodayValue(msToHoursMin(chartData[chartData.length - 1].duration))
  }

  function updateTimeFrame() {
    const fromDate =
      chartData[0].date.slice(8, 10).padStart(2, '0') +
      '/' +
      chartData[0].date.slice(5, 7)

    const toDate =
      chartData[chartData.length - 1].date.slice(8, 10).padStart(2, '0') +
      '/' +
      chartData[chartData.length - 1].date.slice(5, 7)

    const timeFrameDisplay = fromDate + ' - ' + toDate

    return timeFrameDisplay
  }

  function handleHistory() {
    push('/history')
  }

  function returnHomeScreen() {
    push('/')
  }
}

export default App
