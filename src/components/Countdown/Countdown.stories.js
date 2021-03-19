import Countdown from './Countdown'

export default {
  title: 'Components/Countdown',
  components: Countdown,
}

export const Timer = () => (
  <Countdown countdownMinutes={25} countdownSeconds={0} />
)
