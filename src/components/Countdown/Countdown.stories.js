import Countdown from './Countdown'

export default {
  title: 'Countdown',
  components: Countdown,
}

export const Timer = () => <Countdown minutes={25} seconds={0} />
