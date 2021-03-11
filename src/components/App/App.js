import styled from 'styled-components/macro'
import Countdown from '../Countdown/Countdown'

function App() {
  return (
    <AppGrid>
      <Countdown />
    </AppGrid>
  )
}

export default App

const AppGrid = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
`
