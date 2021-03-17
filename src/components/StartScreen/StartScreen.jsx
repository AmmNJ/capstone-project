import styled from 'styled-components/macro'
import Header from '../Header/Header'
import { ReactComponent as GetThingsDoneSVG } from '../../assets/get-things-done.svg'

export default function StartScreen() {
  return (
    <StartScreenGrid>
      <Header>{'Let’s get things done'}</Header>
      <GetThingsDoneSVG />
      <StartTimerButton>Start Timer</StartTimerButton>
    </StartScreenGrid>
  )
}

const StartScreenGrid = styled.div`
  display: grid;
`

const StartTimerButton = styled.button`
  width: auto;
  height: 50px;
  background: linear-gradient(125deg, #a4e3cc #56dfd1);
`
