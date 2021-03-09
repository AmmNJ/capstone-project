import styled from 'styled-components/macro'
import Countdown from '../Countdown/Countdown'

function App() {
  return (
    <AppGrid>
      <Countdown startMinutes={0} startSeconds={5} />
    </AppGrid>
  )
}

export default App

const AppGrid = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
`
