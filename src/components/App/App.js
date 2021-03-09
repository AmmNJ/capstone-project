import styled from 'styled-components/macro'
import Countdown from '../Countdown/Countdown'

function App() {
  return (
    <AppGrid>
      <Countdown startMinutes={25} startSeconds={0} />
    </AppGrid>
  )
}

export default App

const AppGrid = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
`
