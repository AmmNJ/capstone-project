import CountdownScreen from '../CountdownScreen/CountdownScreen'
import StartScreen from '../StartScreen/StartScreen'
import { Route, Switch, useHistory } from 'react-router-dom'

function App() {
  const { push } = useHistory()

  function onStart() {
    push('/countdown')
  }

  function onStop() {
    push('/')
  }

  return (
    <>
      <Switch>
        <Route exact path="/">
          <StartScreen onStart={onStart} />
        </Route>
      </Switch>
      <Switch>
        <Route exact path="/countdown">
          <CountdownScreen onStop={onStop} />
        </Route>
      </Switch>
    </>
  )
}

export default App
