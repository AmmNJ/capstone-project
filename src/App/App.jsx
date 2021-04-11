import CountdownScreen from '../pages/CountdownScreen'
import StartScreen from '../pages/StartScreen'
import HistoryScreen from '../pages/HistoryScreen'
import useLocalStorage from '../hooks/useLocalStorage'
import { useState, useEffect } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { toHoursMin, addMinToMs, toHours } from '../services/time'
import {
  allocateData,
  calcHeight,
  getMinValue,
  getKeyDateValues,
} from '../services/dataManipulation'
import { uniqueDates, daysDifference } from '../services/date'
import { sumKeyData } from '../services/math'

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

  // TODO refactor all states to each screen component and make navigation path dynamic

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
    toHoursMin(chartData[chartData.length - 1].duration)
  )
  const [timeFrame, setTimeFrame] = useState()
  const [kpiValues, setKpiValues] = useState({})

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
            kpiValues={kpiValues}
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
      updateData()
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
    updateData()
    push('/')
  }

  function handleStart() {
    const now = new Date()
    setStartDate(new Date())
    const nowMS = now.getTime()
    const endTimeShort = addMinToMs(nowMS, SHORT.min)
    const endTimeLong = addMinToMs(nowMS, LONG.min)

    if (isDurationLong) {
      setTimer([LONG.min, 0])
      now.setTime(endTimeLong)
    } else {
      now.setTime(endTimeShort)
      setTimer([SHORT.min, 0])
    }

    setEndTime([now.getHours(), now.getMinutes()])
    setAppStatus('active')
    push('/countdown')
  }

  function updateData() {
    const updatedHistoryData = [
      {
        id: uuidv4(),
        start: startDate,
        end: new Date(),
        duration: new Date().getTime() - startDate.getTime(),
      },
      ...historyData,
    ]
    const cData = calcHeight(allocateData(updatedHistoryData))
    setHistoryData(updatedHistoryData)
    setChartData(cData)
    setTodayValue(toHoursMin(cData[cData.length - 1].duration))
    setTimeFrame(updateTimeFrame(cData))
    setKpiValues(updateKpiValues(updatedHistoryData))
  }

  function updateTimeFrame(data) {
    const fromDate =
      data[0].date.slice(8, 10).padStart(2, '0') +
      '/' +
      data[0].date.slice(5, 7)

    const toDate =
      data[data.length - 1].date.slice(8, 10).padStart(2, '0') +
      '/' +
      data[data.length - 1].date.slice(5, 7)

    const timeFrameDisplay = fromDate + ' - ' + toDate

    return timeFrameDisplay
  }

  // TODO Fix today value update timing
  function handleHistory() {
    push('/history')
  }

  function updateKpiValues(rawData) {
    const now = new Date()
    const startOfAppUsage = new Date(
      getMinValue(getKeyDateValues(rawData, 'start'))
    )
    const daysOfAppUsage = daysDifference(startOfAppUsage, now)
    const totalHoursUsage = toHours(sumKeyData(rawData, 'duration'))
    const totalAvg = Math.round((totalHoursUsage / daysOfAppUsage) * 10) / 10
    console.log(totalAvg)
    console.log(totalHoursUsage)

    // TODO find min start value of all with reduce
    const kpiValues = {
      lastTenDaysAvg: 0,
      lastTenDaysTotal: 0,
      totalAvg: totalAvg,
      total: totalHoursUsage,
    }
    return kpiValues
  }

  function returnHomeScreen() {
    push('/')
  }
}

export default App
