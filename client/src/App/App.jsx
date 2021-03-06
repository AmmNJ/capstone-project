import CountdownScreen from '../pages/CountdownScreen'
import StartScreen from '../pages/StartScreen'
import HistoryScreen from '../pages/HistoryScreen'
import LoginScreen from '../pages/LoginScreen'
import useLocalStorage from '../hooks/useLocalStorage'
import getHistory from '../services/getHistory'
import postHistory from '../services/postHistory'
import postUser from '../services/postUser'
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Route, Switch, useHistory } from 'react-router-dom'
import { getMaxValue } from '../lib/dataExtraction'
import { toShortDate, getWeekDay } from '../lib/date'
import { relativeShare } from '../lib/math'

function App() {
  const { push } = useHistory()
  const SHORT = {
    lengthMin: 25,
    lengthMs: 1500000,
    brLengthMin: 5,
    brLengthMs: 300000,
  }
  const LONG = {
    lengthMin: 50,
    lengthMs: 3000000,
    brLengthMin: 10,
    brLengthMs: 600000,
  }

  const [error, setError] = useState(null)
  const [localUser, setLocalUser] = useLocalStorage('localUser')
  const [history, setHistory] = useState([])
  const [appStart, setAppStart] = useState(true)
  const [appStatus, setAppStatus] = useState('default')
  const [[timerMin, timerSec], setTimer] = useState([])
  const [[brTimerMin, brTimerSec], setBrTimer] = useState([])
  const [[endHrs, endMin], setEndTime] = useState([])
  const [startDate, setStartDate] = useState(new Date())
  const [brStartDate, setBrStartDate] = useState(new Date())
  const [isDurationLong, setIsDurationLong] = useState(false)
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    if (!localUser) {
      push('/login')
    } else {
      getHistory(localUser._id).then(data => {
        setHistory([...data])
        setChartData(createChartData([...data]))
      })
    }
  }, [localUser, push])

  return (
    error || (
      <Switch>
        {!appStart && (
          <Route path="/countdown">
            <CountdownScreen
              SHORT={SHORT}
              LONG={LONG}
              appStatus={appStatus}
              setAppStatus={setAppStatus}
              isDurationLong={isDurationLong}
              timerMin={timerMin}
              timerSec={timerSec}
              setTimer={setTimer}
              endHrs={endHrs}
              endMin={endMin}
              startDate={startDate}
              updateData={updateData}
              navigateStart={navigateStart}
              setBrTimer={setBrTimer}
              setBrStartDate={setBrStartDate}
            />
          </Route>
        )}
        ,
        {!appStart && (
          <Route path="/history">
            <HistoryScreen
              setAppStatus={setAppStatus}
              history={history}
              chartData={chartData}
              navigateStart={navigateStart}
            />
          </Route>
        )}
        <Route path="/login">
          <LoginScreen login={login} />
        </Route>
        <Route path="/*">
          <StartScreen
            SHORT={SHORT}
            LONG={LONG}
            appStatus={appStatus}
            setAppStatus={setAppStatus}
            isDurationLong={isDurationLong}
            setIsDurationLong={setIsDurationLong}
            setTimer={setTimer}
            setEndTime={setEndTime}
            setStartDate={setStartDate}
            navigateCountdown={navigateCountdown}
            navigateHistory={navigateHistory}
            brTimerMin={brTimerMin}
            brTimerSec={brTimerSec}
            setBrTimer={setBrTimer}
            brStartDate={brStartDate}
          />
        </Route>
      </Switch>
    )
  )

  function createUser() {
    const newUser = uuidv4()
    postUser(newUser).then(setLocalUser).catch(setError)
  }

  function login() {
    navigateStart()
    createUser()
  }

  function navigateStart() {
    push('/')
  }

  function navigateCountdown() {
    setAppStart(false)
    push('/countdown')
  }

  function navigateHistory() {
    setAppStart(false)
    push('/history')
  }

  function createChartData(history) {
    const goBackDays = 10
    const setupArray = []

    for (let i = 0; i < goBackDays; i++) {
      let today = new Date()
      let date = new Date(today.setDate(today.getDate() - 1 * i))
      let formattedDate = toShortDate(date)

      setupArray.push({
        date: formattedDate,
        duration: 0,
        weekday: getWeekDay(date),
        height: 0,
      })
    }

    const chartData = setupArray.reverse()
    chartData.map(targetEntry => {
      history.map(rawEntry => {
        if (toShortDate(new Date(rawEntry.start)) === targetEntry.date) {
          targetEntry.duration = targetEntry.duration + rawEntry.duration
        }
        return chartData
      })
      return chartData
    })
    let array = []
    chartData.forEach(element => array.push(element.duration))
    const maxValue = getMaxValue(array)

    chartData.forEach(
      el => (el.height = relativeShare(el.duration, 0, maxValue))
    )
    return chartData
  }

  function updateData() {
    const maxDuration = isDurationLong ? LONG.lengthMs : SHORT.lengthMs
    const duration = new Date().getTime() - startDate.getTime()

    const historyEntry = {
      start: startDate,
      end: new Date(),
      duration: Math.min(duration, maxDuration),
      user: localUser._id,
    }

    const fullHistory = [historyEntry, ...history]
    const updateChartData = createChartData(fullHistory)

    setHistory(fullHistory)
    postHistory(historyEntry)
    setChartData(updateChartData)
  }
}

export default App
