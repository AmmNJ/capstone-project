import DisplayTimer from './DisplayTimer'

export default {
  title: 'Components/DisplayTimer',
  components: DisplayTimer,
}

export const Timer = () => <DisplayTimer timerMin={25} timerSec={0} />
