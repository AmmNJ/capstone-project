import styled from 'styled-components/macro'
import Header from '../Header/Header'
import { ReactComponent as GetThingsDoneSVG } from '../../assets/get-things-done.svg'

export default function StartScreen({
  isActive,
  durationLong,
  handleStart,
  handleDurationShort,
  handleDurationLong,
}) {
  return (
    <StartScreenGrid>
      <HeaderGrid>
        <Header text="Let’s get things done" />
      </HeaderGrid>
      <IllustrationGrid>
        <GetThingsDoneSVG />
      </IllustrationGrid>
      <ConfigutationGrid>
        <CountdownDuration
          onClick={handleDurationShort}
          disabled={isActive}
          selected={!durationLong}
        >
          25:00
        </CountdownDuration>
        <CountdownDuration
          onClick={handleDurationLong}
          disabled={isActive}
          selected={durationLong}
        >
          50:00
        </CountdownDuration>
      </ConfigutationGrid>
      <StartGrid>
        <StartTimerButton onClick={handleStart}>Start Timer</StartTimerButton>
      </StartGrid>
    </StartScreenGrid>
  )
}

const StartScreenGrid = styled.main`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr auto;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  padding: 70px 50px 60px;
`

const HeaderGrid = styled.section`
  display: grid;
  align-items: start;
  justify-items: center;
  animation: slide-opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
`

const IllustrationGrid = styled.section`
  display: grid;
  align-content: start;
  justify-content: center;
  animation: slide-opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
`

const ConfigutationGrid = styled.section`
  display: grid;
  grid-template-columns: auto auto;
  gap: 10px;
  align-content: end;
  justify-content: center;
  animation: slide-opacity 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  padding: 0 0 40px;
`

const StartGrid = styled.section`
  animation: slide-opacity 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  align-content: end;
  justify-content: center;
`

const StartTimerButton = styled.button`
  font-size: 20px;
  color: white;
  background: linear-gradient(125deg, #a4e3cc, #56dfd1);
  height: 50px;
  width: 100%;
  border: none;
  border-radius: 8px;
  padding: 0;
`
const CountdownDuration = styled.button`
  color: ${props => (props.selected ? '#52DFD1' : '#585858')};
  border: none;
  background-color: transparent;
  font-size: 20px;
  width: fit-content;
  height: fit-content;
  transition: 0.2s;
`
