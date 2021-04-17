import CountdownScreen from '../pages/CountdownScreen'
import StartScreen from '../pages/StartScreen'
import HistoryScreen from '../pages/HistoryScreen'
import WelcomeScreen from '../pages/WelcomeScreen'
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
    min: 1,
    brMin: 1,
  }
  const LONG = {
    min: 50,
    brMin: 10,
  }

  const [error, setError] = useState(null)
  const [localUser, setLocalUser] = useLocalStorage('localUser')
  const [history, setHistory] = useState([])

  const [appStart, setAppStart] = useState(true)
  const [appStatus, setAppStatus] = useState('default')
  const [[timerMin, timerSec], setTimer] = useState([])
  const [[brTimerMin, brTimerSec], setBrTimer] = useState([])
  const [[endHrs, endMin], setEndTime] = useState([])
  const [startDate, setStartDate] = useState(0)
  const [isDurationLong, setIsDurationLong] = useState(false)
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    if (!localUser) {
      push('/welcome')
    } else {
      getHistory(localUser._id).then(data => {
        setHistory([...data])
        setChartData(calcHeight(createChartData(data)))
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
        <Route path="/welcome">
          <WelcomeScreen login={login} />
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
            updateData={updateData}
            navigateCountdown={navigateCountdown}
            navigateHistory={navigateHistory}
            brTimerMin={brTimerMin}
            brTimerSec={brTimerSec}
            setBrTimer={setBrTimer}
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

  function calcHeight(chartData) {
    let array = []
    chartData.forEach(element => array.push(element.duration))
    const maxValue = getMaxValue(array)

    chartData.forEach(
      el => (el.height = relativeShare(el.duration, 0, maxValue))
    )
    return chartData
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
    return chartData
  }

  function updateData() {
    const historyEntry = {
      start: startDate,
      end: new Date(),
      duration: new Date().getTime() - startDate.getTime(),
      user: localUser._id,
    }

    const fullHistory = [historyEntry, ...history]
    const updateChartData = calcHeight(createChartData(fullHistory))
    setHistory(fullHistory)
    postHistory(historyEntry)
    setChartData(updateChartData)
  }
}

export default App
