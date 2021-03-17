import styled from 'styled-components/macro'
import Header from '../Header/Header'
import { ReactComponent as GetThingsDoneSVG } from '../../assets/get-things-done.svg'

export default function StartScreen({ onStart }) {
  return (
    <StartScreenGrid>
      <Header text="Let’s get things done" />
      <GetThingsDoneSVG />
      <StartTimerButton onClick={onStart}>Start Timer</StartTimerButton>
    </StartScreenGrid>
  )
}

const StartScreenGrid = styled.div`
  display: grid;
`

const StartTimerButton = styled.button`
  width: auto;
  height: 50px;
  background: linear-gradient(125deg, #a4e3cc, #56dfd1);
  border-radius: 8px;
  border: none;
  color: white;
  font-size: 20px;
  padding: 0;
`
