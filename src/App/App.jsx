import CountdownScreen from '../pages/CountdownScreen'
import StartScreen from '../pages/StartScreen'
import HistoryScreen from '../pages/HistoryScreen'
import useLocalStorage from '../hooks/useLocalStorage'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Route, Switch, useHistory } from 'react-router-dom'
import { getMaxValue } from '../services/dataManipulation'
import { toShortDate, getWeekDay } from '../services/date'
import { relativeShare } from '../services/math'

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
  const [[timerMin, timerSec], setTimer] = useState([SHORT.min, 0])
  const [startDate, setStartDate] = useState(0)
  const [[endHrs, endMin], setEndTime] = useState([])
  const [isDurationLong, setIsDurationLong] = useState(false)
  const [historyData, setHistoryData] = useLocalStorage('historyData', [])
  const [chartData, setChartData] = useState(
    calcHeight(allocateData(historyData))
  )
  return (
    <>
      <Switch>
        {appStatus === 'active' && (
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
            />
          </Route>
        )}
        <Route path="/history">
          <HistoryScreen
            historyData={historyData}
            chartData={chartData}
            navigateStart={navigateStart}
          />
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
          />
        </Route>
      </Switch>
    </>
  )

  function navigateStart() {
    push('/')
  }

  function navigateCountdown() {
    push('/countdown')
  }

  function navigateHistory() {
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

  function allocateData(historyData) {
    const goBackDays = 10
    const previousTenDays = []

    for (let i = 0; i < goBackDays; i++) {
      let today = new Date()
      let date = new Date(today.setDate(today.getDate() - 1 * i))
      let formattedDate = toShortDate(date)

      previousTenDays.push({
        date: formattedDate,
        duration: 0,
        weekday: getWeekDay(date),
        height: 0,
      })
    }
    const targetData = previousTenDays.reverse()
    targetData.map(targetEntry => {
      historyData.map(rawEntry => {
        if (toShortDate(new Date(rawEntry.start)) === targetEntry.date) {
          targetEntry.duration = targetEntry.duration + rawEntry.duration
        }
        return targetData
      })
      return targetData
    })
    return targetData
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
    const updateChartData = calcHeight(allocateData(updatedHistoryData))
    setHistoryData(updatedHistoryData)
    setChartData(updateChartData)
  }
}

export default App
