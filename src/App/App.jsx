import CountdownScreen from '../pages/CountdownScreen'
import StartScreen from '../pages/StartScreen'
import HistoryScreen from '../pages/HistoryScreen'
import useLocalStorage from '../hooks/useLocalStorage'
import { useState } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { allocateData, calcHeight } from '../services/dataManipulation'

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
              isDurationLong={isDurationLong}
              updateData={updateData}
              navigateStart={navigateStart}
              startDate={startDate}
              endHrs={endHrs}
              endMin={endMin}
              timerMin={timerMin}
              timerSec={timerSec}
              setTimer={setTimer}
              setAppStatus={setAppStatus}
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
            isDurationLong={isDurationLong}
            setIsDurationLong={setIsDurationLong}
            appStatus={appStatus}
            setAppStatus={setAppStatus}
            navigateHistory={navigateHistory}
            navigateCountdown={navigateCountdown}
            updateData={updateData}
            setStartDate={setStartDate}
            setEndTime={setEndTime}
            setTimer={setTimer}
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
  }
}

export default App
