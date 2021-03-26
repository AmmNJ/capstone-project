import DisplayTimerEnd from './DisplayTimerEnd'

export default {
  title: 'Components/DisplayTimerEnd',
  components: DisplayTimerEnd,
}

export const Time = () => <DisplayTimerEnd endHrs={8} endMin={10} />
