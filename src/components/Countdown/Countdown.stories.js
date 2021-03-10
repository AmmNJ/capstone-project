import Countdown from './Countdown'

export default {
  title: 'Countdown',
  components: Countdown,
}

export const MainCountdown = () => (
  <Countdown startMinutes={25} startSeconds={0} />
)